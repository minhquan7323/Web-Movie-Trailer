import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import App from '../App'
import MovieSearch from '../components/MovieSearch'
import FavoriteList from '../components/FavoriteList'
import MovieGenre from '../components/MovieGenre'
import PageNotFound from '../pages/PageNotFound'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='/favorite' element={<FavoriteList />} />
                <Route path='/genre' element={<MovieGenre />} />
                <Route path='/search' element={<MovieSearch />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
export default AppRoutes