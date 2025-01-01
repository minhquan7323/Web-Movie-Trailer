import React, { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Divider, Grid, Heading, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, Tooltip } from '@chakra-ui/react'
import axios from 'axios'

const MovieModal = ({ isOpen, onClose, selectedItem: initialSelectedItem, finalRef }) => {
    const [trailerKey, setTrailerKey] = useState('')
    const [movieSimilar, setMovieSimilar] = useState([])
    const [currentSelectedItem, setCurrentSelectedItem] = useState(initialSelectedItem)
    const [videoPlaying, setVideoPlaying] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setVideoPlaying(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (initialSelectedItem) {
            setCurrentSelectedItem(initialSelectedItem)
            setTrailerKey('')
            setVideoPlaying(false)
        }
    }, [initialSelectedItem])

    useEffect(() => {
        if (currentSelectedItem) {
            fetchTrailer(currentSelectedItem.id)
            fetchSimilarMovies(currentSelectedItem.id)
        }
    }, [currentSelectedItem])

    const fetchTrailer = async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`
                }
            }
            const response = await axios.get(url, options)
            if (response.data.results && response.data.results.length > 0) {
                setTrailerKey(response.data.results[0].key)
            } else {
                setTrailerKey('')
            }
        } catch (error) {
            console.error('Error fetching trailer:', error)
        }
    }

    const fetchSimilarMovies = async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`
                }
            }
            const response = await axios.get(url, options)
            setMovieSimilar(response.data.results)
        } catch (error) {
            console.error('Error fetching similar movies:', error)
        }
    }

    const handleClick = () => {
        if (finalRef.current) {
            finalRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" useInPortal={false} sx={{ zIndex: 3000 }}>
            <ModalOverlay />
            <ModalContent bgColor="#1a202c">
                <ModalCloseButton color="white" />
                <ModalBody ref={finalRef} p={0} borderRadius="5px">
                    {videoPlaying && trailerKey ? (
                        <Box
                            overflow="hidden"
                            borderTopRadius="lg"
                            w="100%"
                            h="0"
                            pb="56.25%"
                            position="relative"
                        >
                            <Box
                                as="iframe"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                allowFullScreen
                                position="absolute"
                                top="0"
                                left="0"
                                width="100%"
                                height="100%"
                                border="0"
                            />
                        </Box>
                    ) : (
                        <Image
                            src={`${import.meta.env.VITE_URL_IMG}${currentSelectedItem.backdrop_path}`}
                            alt={currentSelectedItem.title}
                            w="100%"
                            borderTopRadius="lg"
                        />
                    )}
                    <Stack p={5} spacing={4}>
                        <HStack justifyContent="space-between">
                            <Box>
                                <ButtonGroup spacing={2}>
                                    {trailerKey.length > 0 && (
                                        <Tooltip label="Play" placement="top">
                                            <Button
                                                variant="solid"
                                                colorScheme="teal"
                                                borderRadius="50%"
                                                w="40px"
                                                onClick={() => {
                                                    setVideoPlaying(true)
                                                }}
                                            >
                                                <i className="fa-solid fa-play" style={{ fontSize: '1.5rem' }}></i>
                                            </Button>
                                        </Tooltip>
                                    )}
                                    <Tooltip label="Add to Favorite" placement="top">
                                        <Button variant="outline" colorScheme="teal" borderRadius="50%" w="40px">
                                            <i className="fa-solid fa-plus" style={{ fontSize: '1.5rem' }}></i>
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </Box>
                            <Box>
                                <Button variant="outline" colorScheme="teal" onClick={onClose}>
                                    Close
                                </Button>
                            </Box>
                        </HStack>
                        <Divider />
                        <Heading size="md" color="white">{currentSelectedItem.title}</Heading>
                        <Text color="whiteAlpha.800">{currentSelectedItem.overview}</Text>
                        {movieSimilar.length > 0 && (
                            <>
                                <Divider />
                                <Heading size="sm" color="white">Similar Movies</Heading>
                                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                                    {movieSimilar.map((item) => (
                                        item.poster_path && item.backdrop_path && (
                                            <Image
                                                key={item.id}
                                                cursor="pointer"
                                                objectFit="cover"
                                                onClick={() => {
                                                    setCurrentSelectedItem(item)
                                                    setVideoPlaying(false)
                                                    fetchSimilarMovies(item.id)
                                                    handleClick()
                                                }}
                                                w="100%"
                                                src={`${import.meta.env.VITE_URL_IMG}${item.poster_path}`}
                                                alt={item.title}
                                                borderRadius="md"
                                                _hover={{
                                                    transform: 'scale(1.05)'
                                                }}
                                                transition="transform 0.2s ease-in-out"
                                            />
                                        )
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MovieModal