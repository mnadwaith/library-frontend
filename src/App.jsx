import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from "./component/index"
import LogIn from "./component/auth/logIn"
import Home from './component/home/home'
import Author from "./component/author/author"
import ProtectedRoutes from "./component/auth/protected"
import Book from "./component/book/book"
import User from "./component/user/user"
import Review from "./component/review/review"
import Analytics from "./component/analytics/analytics"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route index element={<LogIn />} />
                        <Route index path="/login" element={<LogIn />} />
                        <Route path="/dashboard" element={<ProtectedRoutes><Home /></ProtectedRoutes>} >
                            <Route index element={<Analytics />} />
                            <Route path="author" element={<Author />} />
                            <Route path="book" element={<Book />} />
                            <Route path="user" element={<User />} />
                            <Route path="review" element={<Review />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App