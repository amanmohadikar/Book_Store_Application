import React from 'react'
import "../CSS/Navbar.css"


function Navbar() {
    let Id = localStorage.getItem("userId")
    function logout() {
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" id='navBox'>
                <div className="container-fluid">
                    <img id='logoImg' src='https://static.vecteezy.com/system/resources/thumbnails/004/297/596/small/education-logo-open-book-dictionary-textbook-or-notebook-with-sunrice-icon-modern-emblem-idea-concept-design-for-business-libraries-schools-universities-educational-courses-vector.jpg' alt='Loading' />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                            <a className="nav-link active" href="/bookList">Books</a>
                            <a className="nav-link active" href="/createBook">Create-Books</a>
                            <a className="nav-link active" href="/about" >About</a>
                            <a className="nav-link active" href="/resister" >{Id ? <></> : "Register"}</a>
                            <a className="nav-link active" href="/login" onClick={logout}>{Id ? "Logout" : <></>}</a>
                        </div>
                    </div>
                </div>
                <form class="d-flex" role="search">
                    <a href='/login' id='loginBtn' style={{ border: "none" }}>{Id ? <></> : "Login"}</a>
                </form>
            </nav>
        </>
    )
}

export default Navbar