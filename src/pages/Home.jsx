import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { img } from 'framer-motion/client'

const Home = () => {
    const [moviePopular, setMoviePopular] = useState([])
    const [movieTopRate, setMovieTopRate] = useState([])
    const [movieUpComing, setMovieUpComing] = useState([])
    const [movieNowPlaying, setMovieNowPlaying] = useState([])
    const [genres, setGenres] = useState([])
    const [moviesByGenre, setMoviesByGenre] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovies = async () => {
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`,
                },
            }
            try {
                const [genreRes, popularRes, topRatedRes, nowPlayingRes, upcomingRes] = await Promise.all([
                    axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', options),
                    axios.get('https://api.themoviedb.org/3/movie/popular?language=en&page=5', options),
                    axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en&page=8', options),
                    axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2', options),
                    axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=8', options),
                ])

                setGenres(genreRes.data.genres)
                setMoviePopular(popularRes.data.results)
                setMovieTopRate(topRatedRes.data.results)
                setMovieNowPlaying(nowPlayingRes.data.results)
                setMovieUpComing(upcomingRes.data.results)

                const genreMovies = {}
                await Promise.all(
                    genreRes.data.genres.map(async (genre) => {
                        const genreMoviesRes = await axios.get(
                            `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en&page=1`,
                            options
                        )
                        genreMovies[genre.name] = genreMoviesRes.data.results
                    })
                )
                setMoviesByGenre(genreMovies)
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }

        fetchMovies()
    }, [])

    const handleClickGenre = (genreName) => {
        navigate('/genre', { state: { selectedGenre: genreName, moviesByGenre, genres } })
    }

    return (
        <>
            <Banner data={moviePopular.slice(12, 20)} />
            <Box p={5} display="flex" justifyContent="right" alignItems="end">
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Genre
                    </MenuButton>
                    <MenuList color="black" zIndex="1001">
                        <Grid templateColumns="repeat(4, 1fr)">
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} onClick={() => handleClickGenre(genre.name)}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Grid>
                    </MenuList>
                </Menu>
            </Box>

            <MovieList title="Popular" data={moviePopular} />
            <MovieList title="Now Playing" data={movieNowPlaying} />
            {genres.slice(5, 9).map((genre) => (
                <MovieList key={genre.id} title={genre.name} data={moviesByGenre[genre.name] || []} />
            ))}
            <MovieList title="Top Rate" data={movieTopRate} />
            <MovieList title="Upcoming" data={movieUpComing} />
        </>
    )
}

export default Home
