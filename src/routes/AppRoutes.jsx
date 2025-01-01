import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import App from '../App'
import MovieSearch from '../components/MovieSearch'
import FavoriteList from '../components/FavoriteList'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='/favorite' element={<FavoriteList />} />
                <Route path='/search' element={<MovieSearch />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes