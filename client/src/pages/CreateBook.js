import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../Componenets/Navbar'
import "../CSS/Resister.css"
import { useNavigate } from 'react-router-dom'

function CreateBook() {
  const navigate = useNavigate()


  const [inputs, setInputs] = useState({
    title: "", excerpt: "", ISBN: "", category: "", subcategory: "", bookcover: "", releasedAt: "",
  })


  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async () => {
    let token = localStorage.getItem("token")

    const res = await axios.post("http://localhost:5000/books", {
      title: inputs.title,
      excerpt: inputs.excerpt,
      ISBN: inputs.ISBN,
      category: inputs.category,
      subcategory: inputs.subcategory,
      releasedAt: inputs.releasedAt,
      userId: localStorage.getItem("userId")
    }, { headers: { 'x-api-key': token } })
      .then((res) => res.data)
      .catch((err) => alert(err.message))
    // const resData = await res.data
    // return resData
  }

  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/"))
  }

  return (
    <>
      <div id='bigBoxBD'>
        <Navbar />
        <div id="container">
          <form onSubmit={handleSubmit}>
            <div >Title: <input className='imputCB' name='title' type="text" value={inputs.title} onChange={handleChange} /></div>
            <div>excerpt: <input className='imputCB' name='excerpt' type="text" value={inputs.excerpt} onChange={handleChange} /></div>
            <div>ISBN: <input className='imputCB' name='ISBN' type="number" value={inputs.ISBN} onChange={handleChange} /></div>
            <div>category: <input className='imputCB' name='category' type="text" value={inputs.category} onChange={handleChange} /></div>
            <div>subcategory: <input className='imputCB' name='subcategory' type="text" value={inputs.subcategory} onChange={handleChange} /></div>
            <div>ReleasedAt: <input className='imputCB' name='releasedAt' type="text" value={inputs.releasedAt} onChange={handleChange} /></div>

            <button id='btn22' className="btn btn-primary" type='submit' >Create Book</button>
          </form>
        </div>

      </div>

    </>
  )
}

export default CreateBook