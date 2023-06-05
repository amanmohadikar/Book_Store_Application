import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../CSS/Book.css"
import Navbar from "../Componenets/Navbar";
import Comment from './CommentCard/Comment'
import AddComnt from "../AddComment/Addcomment"

function Detailes() {
  const { bookId } = useParams();
  let token = localStorage.getItem("token")

  const [Book, setBook] = useState({});
  const [review, setreview] = useState([]);
  const [user, setuser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${bookId}`, { headers: { "x-api-key": token } })
      .then((responce) => {
        setBook(responce.data.data);
        setreview(responce.data.data.reviewsData);
        setuser(responce.data.data.userId)
        
      })
      .catch((err) => alert(err.response.data.message));
  }, []);
  return (
    <>
    <Navbar />
    <div className="big-div">
       
      <div className="book-div">
        <img className="book-img" src="https://thumbs.dreamstime.com/b/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg" alt="" />


        <div className="element">
          <p className="tag">title--</p><p className="val">{Book.title}</p>
        </div>


        <div className="element">
          <p className="tag">category--</p><p className="val">{Book.category}</p>
        </div>

        <div className="element">
          <p className="tag">excerpt--</p><p className="val"> {Book.excerpt}</p>
        </div>
      </div>
      <div className="cmt-div">
        <Comment review={review}/>
        <AddComnt />
      </div>
      
    </div>

    </>
  );
}

export default Detailes;