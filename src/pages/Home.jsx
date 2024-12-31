import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [moviePopular, setMoviePopular] = useState([])
    const [movieTopRate, setMovieTopRate] = useState([])
    const [movieUpComing, setMovieUpComing] = useState([])
    const [movieNowPlaying, setMovieNowPlaying] = useState([])

    const url1 = 'https://api.themoviedb.org/3/movie/popular?language=en?page=5'
    const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=en?page=8'
    const url3 = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
    const url4 = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=8'

    useEffect(() => {
        const fetchMovie = async () => {
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`
                }
            }
            const res1 = await axios.get(url1, options)
            const res2 = await axios.get(url2, options)
            const res3 = await axios.get(url3, options)
            const res4 = await axios.get(url4, options)

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
