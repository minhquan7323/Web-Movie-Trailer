import React from 'react'
import { Routes, Route } from "react-router-dom"
import Contact from "../pages/Contact"
import About from "../pages/About"
import Home from "../pages/Home"
import App from '../App'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes