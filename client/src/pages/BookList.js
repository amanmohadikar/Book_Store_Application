import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Componenets/Navbar'
import "../CSS/bookList.css"
import Footer from '../Componenets/foot/Footer'


function BookList() {
    const [books, SetBooks] = useState([])
    
    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://localhost:5000/books", { headers: { "x-api-key": token } }).then((responce) => 
      
        { 
            SetBooks(responce.data.data)
            console.log(responce.data.data.length)
         })
            
            .catch((err) => alert(err.message))
    }, [])


    function Details(id) {
        window.location.replace(`http://localhost:5000/books/${id}`)
      }



    return (
        <div id='bookListBigBox'>
            <>
                <Navbar />
                <div id="allList">
                    {books && books.map((x, i) => {
                        return (<div className="itemBox" key={i}>

                            <img id='books' src={(x.bookCover) ? `${x.bookCover}` : "https://st2.depositphotos.com/1105977/5461/i/600/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg"} alt='error' />
                            <span>Title : {x.title}</span>
                            <span>Reviews : {x.reviews}</span>
                            <div className='bt-div'>
                            <a href={`bookUpdate/${x._id}`}><button id='btn1'  onClick={() => Details(x._id)}>More</button></a>
                            <a href={`bookDetails/${x._id}`}><button id='btn2'>Detailes</button></a>
                            </div>
                        </div>)
                    })}
                </div>
            </>
            <Footer />
        </div>
    )
}

export default BookList

