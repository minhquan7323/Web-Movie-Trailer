import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Heading, HStack, Image, useDisclosure, VStack } from '@chakra-ui/react'
import MovieModal from './MovieModal'

const MovieSearch = () => {
    const location = useLocation()
    const { query } = location.state || {}
    const [movieSearch, setMovieSearch] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState(null)
    const finalRef = React.useRef(null)

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
        } catch (error) {
            console.error('Error fetching movies:', error)
        }
    }

    useEffect(() => {
        if (query) {
            handleSearch(query)
        }
    }, [query])

    return (
        <VStack display="flex" alignItems="left" justifyContent="space-between" p="70px 10px 10px 10px" zIndex="0">
            <Heading size="xl" pl={2}>
                Movie Search Results
            </Heading>
            {movieSearch.length > 0 ? (
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
                                <Image
                                    cursor="pointer"
                                    onClick={() => {
                                        setSelectedItem(item)
                                        onOpen()
                                    }}
                                    w="180px"
                                    src={`${import.meta.env.VITE_URL_IMG}${item.poster_path}`}
                                    alt={item.title}
                                    borderRadius="md"
                                    _hover={{
                                        transform: 'scale(1.05)'
                                    }}
                                    transition="transform 0.2s ease-in-out"
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
