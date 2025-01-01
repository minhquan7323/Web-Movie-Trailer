import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [moviePopular, setMoviePopular] = useState([])
    const [movieTopRate, setMovieTopRate] = useState([])
    const [movieUpComing, setMovieUpComing] = useState([])
    const [movieNowPlaying, setMovieNowPlaying] = useState([])

    useEffect(() => {
        const urlPopular = 'https://api.themoviedb.org/3/movie/popular?language=en?page=5'
        const urlTopRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en?page=8'
        const urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2'
        const urlUpcoming = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=8'
        const fetchMovie = async () => {
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`
                }
            }
            const res1 = await axios.get(urlPopular, options)
            const res2 = await axios.get(urlTopRated, options)
            const res3 = await axios.get(urlNowPlaying, options)
            const res4 = await axios.get(urlUpcoming, options)

            setMoviePopular(res1.data.results)
            setMovieTopRate(res2.data.results)
            setMovieUpComing(res3.data.results)
            setMovieNowPlaying(res4.data.results)
        }
        fetchMovie()
    }, [])

    return (
        <>
            <Banner data={moviePopular.slice(12, 20)} />
            <MovieList title={'Popular'} data={moviePopular} />
            <MovieList title={'Top Rate'} data={movieTopRate} />
            <MovieList title={'Now Playing'} data={movieNowPlaying} />
            <MovieList title={'Upcoming'} data={movieUpComing} />
        </>
    )
}

export default Home
