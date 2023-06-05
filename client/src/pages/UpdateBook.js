import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, {useState } from 'react'
import "../CSS/BookDetails.css"
import Navbar from '../Componenets/Navbar'


function UpdateBook() {
    const [title, setTitle] = useState("")
    const [excerpt, setExcerpt] = useState("")
    const [ISBN, setISBN] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")


    const { bookId } = useParams();
  
  
    const createBook = (a) =>{
  
        const bookData = {};
    
        let token = localStorage.getItem("token")
        bookData.userId = localStorage.getItem("userId")
  
        if(title.length>0)bookData.title = title
        if(excerpt.length>0)bookData.excerpt = excerpt
        if(ISBN.length>0)bookData.ISBN = ISBN
        if(category.length>0)bookData.category = category
        if(subcategory.length>0)bookData.subcategory = subcategory
  
        axios.put(`http://localhost:5000/books/${a}`, bookData, { headers: { "x-api-key": token } }).then((responece)=>{
            
        alert("Book updated successfully")

        window.location.replace("/bookList")
        
    
    })
        .catch((err)=>alert(err.message))
    }
  
    return (
      <div id='bigBoxBD'>
        <Navbar/>
        <div id="containerrr">
          <div>
            <h2>Update</h2>
            <div>Title: <input className='imputCB' type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/></div>
            <div>excerpt: <input className='imputCB' type="text" value={excerpt} onChange={(e)=>setExcerpt(e.target.value)}/></div>
            <div>ISBN: <input className='imputCB' type="number" value={ISBN} onChange={(e)=>setISBN(e.target.value)}/></div>
            <div>category: <input className='imputCB' type="text" value={category} onChange={(e)=>setCategory(e.target.value)}/></div>
            <div>subcategory: <input className='imputCB' type="text" value={subcategory} onChange={(e)=>setSubcategory(e.target.value)}/></div>
            <button id='btn22' className="btn btn-primary" type='submit' onClick={()=>createBook(bookId)} >update Book</button>
          </div>
        </div>

      </div>
    )
}

export default UpdateBook