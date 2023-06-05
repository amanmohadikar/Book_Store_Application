const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: objectId,
        required: true,
        ref: 'book'
    },
    reviewedBy: {
        type: String,
        trim: true,
        default: 'Guest'
    },
    reviewedAt: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },

    review: {
        type: String,
        trim: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = new mongoose.model('review', reviewSchema)