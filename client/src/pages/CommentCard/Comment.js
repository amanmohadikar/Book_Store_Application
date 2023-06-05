import React from "react";
import "./comment.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function Comment({ review }) {
  const { bookId } = useParams();

  function deletecomment(commentid,book) {
///books/${book}/review/${commentid}
    axios.delete(`http://localhost:5000/books/${book}/review/${commentid}`)
      .then((res) => {
        alert("your comment deleted successfully")
        window.location.reload(false)
      }

      )
      .catch((err) => alert(err.response.data.message) )
  }

  function Ucomment(a){
    console.log(a)
    localStorage.setItem("commentId", a)
    window.location.reload(false)
    alert("update your comment below")
  }


  return (
    <div className="comment-div">
      {review.map((element, x) => {
        return (
          <div className="sig-div">
            <div className="card_body">
              <div className="writey price">
                <div className="comment-user">
                  <img
                    className="comment-pic"
                    src="https://b.zmtcdn.com/web/assets/2267aec184e096c98c46a1565a5563661664945464.png?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A"
                    alt=""
                    
                  />
                  <h4 className="mt-2">{element.reviewedBy}</h4>
                </div>

                <div className="add-btn">
                  <span className="d">{element.reviewedAt.split("T")[0]}</span>
                  
                  <button className="btn btn-outline-success rate" type="submit">
                    <i className="fa-solid fa-trash " > {element.rating}</i>
                  </button>

                  <button className="btn btn-outline-success dle" type="submit">
                    <i className="fa-solid fa-trash " onClick={() => deletecomment(element._id,bookId)}>  Delete</i>
                  </button>
                  <button className="btn btn-outline-success dle" type="submit">
                    <i className="fa-solid fa-trash " onClick={() => Ucomment(element._id)}>Update</i>
                  </button>

                </div>
              </div>

              <div className="comment-user">
                <span className="p">comment:-{element.review}</span>
              </div>
            </div>

            <p className="line"></p>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;