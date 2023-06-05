import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../CSS/BookDetails.css"
import Navbar from '../Componenets/Navbar'
import { useNavigate } from 'react-router-dom';

function BookDetails() {
  const [value, setValue] = useState({})
  const navigate = useNavigate()

  const { bookId } = useParams();

  let token = localStorage.getItem("token")
  useEffect(() => {
    axios.get(`http://localhost:5000/books/${bookId}`).then((responce) => {
      setValue(responce.data.data)
    })

      .catch((err) => alert(err.message))
  }, [])

  const deleteFun = async () => {
    const res = await axios.put(`http://localhost:5000/book/${bookId}`, { isDeleted: value.isDeleted }, { headers: { "x-api-key": token } }, { headers: { authorization: "token" } })
      .then((res) => res.data)
      .catch((err) => alert(err.message))

  }


  const handleDelete = () => {
    deleteFun()
      .then(() => navigate("/"))
  }


  return (
    <div id='bigBoxBD'>
      <Navbar />
      <div id="container">
        <img className='imputCB' src={(value.bookCover) ? value.bookCover : "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"} style={{ width: "10vh", height: "10vh" }} />

        <div>
          <a href={`/Update/${bookId}`}><button className="btn btn-primary btn22">Update Book</button></a>
          <button className="btn btn-primary btn22" onClick={handleDelete} >Delete Book</button>
        </div>
      </div>

    </div>
  )
}

export default BookDetails

