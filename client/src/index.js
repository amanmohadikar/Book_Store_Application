import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Resister from "./pages/Resister";
import About from "./pages/About";
import BookList from "./pages/BookList";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import Detailes from "./pages/Detailes";
import BookUpdate from "./pages/BookDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="resister" element={<Resister />} />
        <Route path="about" element={<About />} />
        <Route path="bookList" element={<BookList />} />

        <Route path="bookDetails" element={<Detailes />}>
          <Route path=":bookId" element={<Detailes />} />
        </Route>

        <Route path="bookUpdate" element={<BookUpdate />}>
          <Route path=":bookId" element={<BookUpdate />} />
        </Route>

        <Route path="Update" element={<UpdateBook />}>
          <Route path=":bookId" element={<UpdateBook />} />
        </Route>


        <Route path="createBook" element={<CreateBook />} />
        <Route path="updateBook" element={<UpdateBook />}>
          <Route path=":bookId" element={<UpdateBook />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);