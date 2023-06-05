import axios from 'axios'
import React, { useState } from 'react'
import "../CSS/Resister.css"
import Navbar from '../Componenets/Navbar'
import Footer from '../Componenets/foot/Footer'
import { useNavigate } from 'react-router-dom'

function Resister() {

    const navigate = useNavigate()

    const [input, setInput] = useState({
        name: "", phone: "", email: "", password: "", address: "",
    })

    function handleChange(e) {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const sendRequest = async () => {

        const res = await axios.post("http://localhost:5000/register", {
            name: input.name,
            title: input.title,
            phone: input.phone,
            email: input.email,
            password: input.password,
            address: input.address
        })
            .catch((err) => console.log(err))

        const data = await res.data
        console.log(data)
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        alert("Regester Successfully")
        sendRequest()
            .then(() => navigate("/"))
    }
    return (
        <div id='bigBox'>
            <Navbar />

            <div className="userResister">
                <div id="userResister">
                    <h1>Register</h1>
                </div>
                <form onSubmit={handleSubmit}>

                    <div>
                        <span>Title</span>
                        <input name='title' type={"text"} className='inputs' placeholder='Write your title' required value={input.title} onChange={handleChange} />
                    </div>
                    <div className="resister-form">
                        <span>Full Name</span>
                        <input name='name' type={"text"} className='inputs' placeholder='Write your name' required value={input.name} onChange={handleChange} />
                    </div>
                    <div className="resister-form">
                        <span>Phone</span>
                        <input name='phone' type={"number"} className='inputs' placeholder='Write your mobile number' required value={input.phone} onChange={handleChange} />
                    </div>
                    <div className="resister-form">
                        <span>Email</span>
                        <input name='email' type={"email"} className='inputs' placeholder='Write your email' required value={input.email} onChange={handleChange} />
                    </div>
                    <div className="resister-form">
                        <span>Password</span>
                        <input name='password' type={"password"} className='inputs' placeholder='Write your Password' required value={input.password} onChange={handleChange} />
                    </div>

                    <div className="resister-form">
                        <span>Address</span>
                        <input name='address' type={"text"} className='inputs' placeholder='Write your Address' required value={input.address} onChange={handleChange} />
                    </div>

                    <button type="submit" id='btn' className="btn btn-primary">Create Account</button>
                    <a id='logins' href='/login'>Login</a>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Resister