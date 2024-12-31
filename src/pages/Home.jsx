import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [moviePopular, setMoviePopular] = useState([])
    const [movieTopRate, setMovieTopRate] = useState([])
    const [movieUpComing, setMovieUpComing] = useState([])
    const [movieNowPlaying, setMovieNowPlaying] = useState([])

    const url1 = 'https://api.themoviedb.org/3/movie/popular?language=en?page=1'
    const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=en?page=1'
    const url3 = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
    const url4 = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'

    useEffect(() => {
        const fetchMovie = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`
                }
            }
            const [res1, res2, res3, res4] = await Promise.all([
                fetch(url1, options),
                fetch(url2, options),
                fetch(url3, options),
                fetch(url4, options)
            ])
            const data1 = await res1.json()
            const data2 = await res2.json()
            const data3 = await res3.json()
            const data4 = await res4.json()

            setMoviePopular(data1.results)
            setMovieTopRate(data2.results)
            setMovieUpComing(data3.results)
            setMovieNowPlaying(data4.results)
        }
        fetchMovie()
    }, [])
    return (
        <>
            <Banner data={movieTopRate.slice(12, 20)} />
            <MovieList title={'Now Playing'} data={movieNowPlaying} />
            <MovieList title={'Popular'} data={moviePopular} />
            <MovieList title={'Top Rate'} data={movieTopRate} />
            <MovieList title={'Upcoming'} data={movieUpComing} />

        </>
    )
}

export default Home
