import React from 'react'
import './Comment.css'
import axios from 'axios'
import { useState } from 'react';
import { useParams } from "react-router-dom";

function Addcomment() {

  const { bookId} = useParams();
  let cid=localStorage.getItem("commentId")

    const [comment,setComment]=useState("")
    const [name,setname]=useState("")
    const [rate,setrate]=useState()
   



   function addcom(bookId,cId){
    
    let options = {}
    if(name)options.reviewedBy = name
    if(comment)options.review = comment
    if(rate)options.rating=rate


    if(cId){
      console.log(bookId,cId,options,"hii") 
      axios.put(`http://localhost:5000/books/${bookId}/review/${cId}`,options)
      .then((res) => {
        localStorage.removeItem("commentId")
        alert("your comment updated successfully")
         window.location.reload(false)
      }

      )
      .catch((err) => alert(err.response.data.message) )
    }
else 
{    axios.post(`http://localhost:5000/books/${bookId}/review`,options)
    .then((res)=> {
        alert("Thanks for your review")
         window.location.reload(false)
      }
   
    )
    .catch((err) => alert(err.response.data.message) )}
   }



  return (
    <div className='comment-input'>
      <div className='c-name'>
      <input type="text" placeholder='enter your name' className='comment-input-area inputGroup' value={name} onChange={(e) => setname(e.target.value)} />
      </div>
      <div className='c-name'>
      <input type="text" placeholder='rating (between 1-5)' className='comment-input-area inputGroup' value={rate} onChange={(e) => setrate(e.target.value)} />
      </div>      
      <div className='c-input' > 
        <input type="text" placeholder='enter your comment'  className='comment-input-area inputGroup' value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <div>
        <button className='add-butn btn'  onClick={()=>{addcom(bookId,cid)}}>{cid?"update comment":"Add comment"}</button>
        </div>
      
    </div>
  )
}

export default Addcomment