const mongoose = require("mongoose");
const bookModel = require("../model/bookModel");
const reviewModel = require("../model/reviewModel");
const userModel = require("../model/userModel")
const objectId = mongoose.isValidObjectId
const validator = require('../validator/validator')
const dateFormat = /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/


//--------------------------|| CREATE BOOKS ||--------------------------------

const createBook = async function (req, res) {
    try {
        let data = req.body
        let { title, excerpt, ISBN, category, subcategory, releasedAt } = data;
        if (!validator.requiredInput(data)) return res.status(400).send({ status: false, message: 'Input is required' })


        data.userId = data.userId
        if (!mongoose.Types.ObjectId.isValid(data.userId)) return res.status(403).send({ status: false, message: "Please Provide Valid userId" })

        let user = await userModel.findById(data.userId)
        if (!user) { return res.status(404).send({ satus: false, msg: "user is not present in database" }) }

        if (!validator.validInput(title)) return res.status(400).send({ status: false, message: "Title is not present or valid" })
        if (!validator.validString(title)) return res.status(400).send({ status: false, message: "title is not valid" })

        let isTitlePresent = await bookModel.findOne({ title: title })
        if (isTitlePresent) return res.status(400).send({ status: false, message: "Title already exists" })

        if (!excerpt) return res.status(400).send({ status: false, message: "excerpt is not present" })

        if (!validator.validInput(ISBN)) return res.status(400).send({ status: false, message: "ISBN is not present or valid" })
        if (!validator.validISBN(ISBN)) return res.status(400).send({ status: false, message: "ISBN is not valid" })

        let isISBNPresent = await bookModel.findOne({ ISBN: ISBN })
        if (isISBNPresent) return res.status(400).send({ status: false, message: "ISBN is already exist" })

        if (!validator.validInput(category)) return res.status(400).send({ status: false, message: "category is not present or valid" })
        if (!validator.validString(category)) return res.status(400).send({ status: false, message: "category is not valid" })

        if (!validator.validInput(subcategory)) return res.status(400).send({ status: false, message: "subcategory is not present or valid" })
        if (!validator.validString(subcategory)) return res.status(400).send({ status: false, message: "subcategory is not valid" })

        if (!releasedAt) return res.status(400).send({ status: false, message: "releasedAt is not present" })
        if (!releasedAt.match(dateFormat)) return res.status(400).send({ status: false, message: "Invalid format of date :- YYYY-MM-DD" })

        let newData = await bookModel.create(data)
        return res.status(201).send({ status: true, message: 'Success', data: newData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------|| GET BOOKS BY QUERY ||--------------------------------

const getBooks = async function (req, res) {
    try {

        let requestQuery = req.query
        let {title,excerpt, releasedAt,ISBN, subcategory, category, userId } = requestQuery
        if (!validator.requiredInput(requestQuery)) {
            let bookDetails = await bookModel.find({ isDeleted: false }).sort({ title: 1 }).collation({ locale: "en" }).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, _id: 1 })
            if (!bookDetails.length > 0) {
                return res.status(404).send({ status: false, message: "no book found" })
            }
            return res.status(200).send({ status: true, message: 'Books list', data: bookDetails })
        }
        let obj = { isDeleted: false }
        if (subcategory) {
            obj.subcategory = subcategory
        }
        if (title) {
            obj.title = title
        }
        if (excerpt) {
            obj.excerpt = excerpt
        }
        if (ISBN) {
            obj.ISBN = ISBN
        }
        if (releasedAt) {
            obj.releasedAt = releasedAt
        }
        if (category) {
            obj.category = category
        }


        if (userId) {
            if (!objectId(userId)) {
                return res.status(400).send({ status: false, message: "UserId is invalid" })
            }
            obj.userId = userId
        }
        let getBooksDetails = await bookModel.find(obj).sort({ title: 1 }).collation({ locale: "en" }).select({  userId: 1, category: 1,  reviews: 1, _id: 1 })

        if (getBooksDetails.length === 0) {
            return res.status(404).send({ status: false, message: 'no book found' })
        } else {
            return res.status(200).send({ status: true, message: 'Books list', data: getBooksDetails })
        }


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------|| GET BOOKS BY PARAM ||--------------------------------

const getBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (bookId) {
            if (!objectId(bookId)) {
                return res.status(400).send({ status: false, message: "BookId is invalid" })
            }
            let savedData = await bookModel.findOne({ _id: bookId, isDeleted: false }).select({ ISBN: 0, deletedAt: 0, __v: 0 })
            if (!savedData) {
                return res.status(404).send({ status: false, message: 'No books found' })
            }

            let reviewData = await reviewModel.find({ bookId: savedData._id, isDeleted: false }).select({ createdAt: 0, updatedAt: 0, deletedAt: 0, __v: 0 })

            let obj = JSON.parse(JSON.stringify(savedData))
            obj.reviewsData = reviewData
            return res.status(200).send({ status: true, message: 'Books list', data: obj })
        } else {
            return res.status(400).send({ status: false, message: "BookId is required" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------|| UPDATE BOOKS ||--------------------------------

const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId

        let updatedata = req.body;
        if (!validator.requiredInput(updatedata)) return res.status(400).send({ status: false, message: 'Enter input for updation' })

        let { title, excerpt, ISBN, releasedAt } = updatedata;

        if (releasedAt) {
            if (!releasedAt.match(dateFormat)) {
                return res.status(400).send({ status: false, message: "Invalid format of date :- YYYY-MM-DD" })
            }
        }
        if (title) {
            if (!validator.validInput(title)) return res.status(400).send({ status: false, message: 'Title must be a string' })
            if (!validator.validString(title)) return res.status(400).send({ status: false, message: 'Title is invalid' })
        }
        let checkTitle = await bookModel.findOne({ title: title })
        if (checkTitle) {
            return res.status(400).send({ status: false, message: "title must be unique" })
        }

        if (ISBN) {
            if (!validator.validInput(ISBN)) return res.status(400).send({ status: false, message: 'ISBN is not present' })
            if (!validator.validISBN(ISBN)) return res.status(400).send({ status: false, message: 'ISBN is invalid' })
        }
        let checkISBN = await bookModel.findOne({ ISBN: ISBN })
        if (checkISBN) {
            return res.status(400).send({ status: false, message: "ISBN must be unique" })
        }

        let bookupdate = await bookModel.findByIdAndUpdate({ _id: bookId },
            { $set: { title: title, excerpt: excerpt, ISBN: ISBN, releasedAt: releasedAt } },
            { new: true }).select({ deletedAt: 0, __v: 0 });

        return res.status(200).send({ status: true, message: 'Success', data: bookupdate });


    } catch (error) {
        return res.status(500).send(error.message)
    }

}

//--------------------------|| DELETE BOOKS ||--------------------------------





const deleteBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId

        await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: { isDeleted: true } })
        return res.status(200).send({ status: true, message: "successfully deleted" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}








module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBooksById = getBooksById
module.exports.updateBook = updateBook
module.exports.deleteBookById = deleteBookById