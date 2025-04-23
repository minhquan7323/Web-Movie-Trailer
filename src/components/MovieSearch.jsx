import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Heading, HStack, Text, useDisclosure, VStack, Skeleton } from '@chakra-ui/react'
import MovieModal from './MovieModal'
import MovieCard from './MovieCard'

const MovieSearch = () => {
    const location = useLocation()
    const { query } = location.state || {}
    const [movieSearch, setMovieSearch] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState(null)
    const finalRef = React.useRef(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleSearch = async (query) => {
        const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        try {
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`,
                },
            }
            const res = await axios.get(urlSearch, options)
            setMovieSearch(res.data.results)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching movies:', error)
            setIsLoading(false)
        }
    }

    const handleSelectMovie = (item) => {
        setSelectedItem(item)
        onOpen()
    }

    useEffect(() => {
        if (query) {
            setIsLoading(true)
            handleSearch(query)
        }
    }, [query])

    return (
        <VStack display="flex" alignItems="left" justifyContent="space-between" p="70px 10px 10px 10px" zIndex="0">
            <Heading size="xl" pl={2}>
                Search results with "<Text as="span" color="teal">{query}</Text>"
            </Heading>
            {isLoading ? (
                <Grid
                    templateColumns={{
                        base: "repeat(3, 1fr)",
                        md: "repeat(4, 1fr)",
                        lg: "repeat(6, 1fr)"
                    }}
                    gap={6}
                >
                    {[...Array(12)].map((_, index) => (
                        <HStack key={index} alignItems="center" justify="center" p={2}>
                            <Skeleton height="300px" width="180px" borderRadius="md" />
                        </HStack>
                    ))}
                </Grid>
            ) : movieSearch.length > 0 ? (
                <Grid
                    templateColumns={{
                        base: "repeat(3, 1fr)",
                        md: "repeat(4, 1fr)",
                        lg: "repeat(6, 1fr)"
                    }}
                >
                    {movieSearch.map((item) => (
                        item.poster_path && item.backdrop_path && (
                            <HStack key={item.id} alignItems="center" justify="center" p={2}>
                                <MovieCard
                                    src={`${import.meta.env.VITE_URL_IMG}${item.poster_path}`}
                                    alt={item.title}
                                    onClick={() => handleSelectMovie(item)}
                                />
                            </HStack>
                        )
                    ))}
                </Grid>
            ) : (
                <Heading size="lg" display='flex' justifyContent='center' alignItems='center' h='70vh'>
                    No movies found
                </Heading>
            )}
            {selectedItem && (
                <MovieModal
                    isOpen={isOpen}
                    onClose={onClose}
                    selectedItem={selectedItem}
                    finalRef={finalRef}
                />
            )}
        </VStack>
    )
}

export default MovieSearch
