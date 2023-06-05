import React, { useState } from 'react'
import "../CSS/Login.css"
import axios from "axios"
import Navbar from '../Componenets/Navbar'
import Footer from '../Componenets/foot/Footer'
import { useNavigate } from 'react-router-dom'


function Login() {
    const navigate = useNavigate()

    const [input, setInput] = useState({
        email: "", password: "",
    })

    const loginFunction = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/login",
            { email: input.email, password: input.password }
        )
            .then((response) => {
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userId", response.data.id) 
                alert("Successfully Login")
                navigate("/")
            })
            .catch((err) => alert(err.message))
    }

    function handleChange(e) {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <>
            <div className='mainbody'>
                <Navbar />

                <div className="body">

                    <div className="headingLogin">
                        <h2 id="login">LOGIN</h2>
                    </div>

                    <div className="loginBox">

                        <form onSubmit={loginFunction}>

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                <input name='email' type={"email"} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required value={input.email} onChange={handleChange} placeholder="Write your email" />
                            </div>

                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input name='password' type={"password"} className="form-control" id="exampleInputPassword1" required value={input.password} onChange={handleChange} placeholder="Write your password" />
                            </div>

                            <button type="submit" id='btn22' className="btn btn-primary">Login</button>

                        </form>
                    </div>
                </div>

                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Login