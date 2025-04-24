import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, ButtonGroup, Divider, Grid, Heading, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalOverlay, Stack, Text, Tooltip, Skeleton, SkeletonText, ModalContent } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalProvider'
import MovieCard from './MovieCard'
import responsive from '../constants/responsive'

const MotionModalContent = motion(Box)
const MotionButton = motion(Button)

const MovieModal = ({ isOpen, onClose, selectedItem: initialSelectedItem, finalRef }) => {
    const [trailerKey, setTrailerKey] = useState('')
    const [movieSimilar, setMovieSimilar] = useState([])
    const [currentSelectedItem, setCurrentSelectedItem] = useState(initialSelectedItem)
    const [videoPlaying, setVideoPlaying] = useState(false)
    const [isLoadingTrailer, setIsLoadingTrailer] = useState(true)
    const [isLoadingSimilar, setIsLoadingSimilar] = useState(true)

    const {
        addMovieToFavoriteList,
        removeMovieFromFavoriteList,
        favoriteList
    } = useContext(GlobalContext)

    const storeFavoriteMovie = favoriteList.find(o => o.id === currentSelectedItem?.id)
    const favoriteListDisabled = !!storeFavoriteMovie

    useEffect(() => {
        if (isOpen) setVideoPlaying(false)
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
            setIsLoadingTrailer(true)
            setIsLoadingSimilar(true)
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
        } finally {
            setIsLoadingTrailer(false)
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
        } finally {
            setIsLoadingSimilar(false)
        }
    }

    const handleClick = () => {
        if (finalRef.current) {
            finalRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleSelectMovie = (item) => {
        setCurrentSelectedItem(item)
        setVideoPlaying(false)
        fetchSimilarMovies(item.id)
        handleClick()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" motionPreset="none">
            <ModalOverlay />
            <MotionModalContent
                as={ModalContent}
                bgColor="#1a202c"
                borderRadius="md"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <ModalCloseButton color="white" />
                <ModalBody ref={finalRef} p={0}>
                    {isLoadingTrailer ? (
                        <Skeleton height="350px" width="100%" borderTopRadius="lg" />
                    ) : videoPlaying && trailerKey ? (
                        <Box overflow="hidden" borderTopRadius="lg" w="100%" h="0" pb="56.25%" position="relative">
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
                            src={`${import.meta.env.VITE_URL_IMG}${currentSelectedItem?.backdrop_path}`}
                            alt={currentSelectedItem?.title}
                            w="100%"
                            borderTopRadius="lg"
                        />
                    )}

                    <Stack p={5} spacing={4}>
                        <HStack justifyContent="space-between">
                            <ButtonGroup spacing={2}>
                                {!isLoadingTrailer && trailerKey.length > 0 && (
                                    <Tooltip label="Play" placement="top">
                                        <Button
                                            variant="solid"
                                            colorScheme="teal"
                                            borderRadius="50%"
                                            w="40px"
                                            onClick={() => setVideoPlaying(true)}
                                        >
                                            <i className="fa-solid fa-play" style={{ fontSize: '1.5rem' }}></i>
                                        </Button>
                                    </Tooltip>
                                )}
                                {favoriteListDisabled ? (
                                    <Tooltip label="Remove from Favorite" placement="top">
                                        <MotionButton
                                            variant="solid"
                                            colorScheme="teal"
                                            borderRadius="50%"
                                            w="40px"
                                            onClick={() => removeMovieFromFavoriteList(currentSelectedItem.id)}
                                            whileTap={{ scale: 1.2 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                        >
                                            <i className="fas fa-heart" style={{ fontSize: '1.5rem' }}></i>
                                        </MotionButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip label="Add to Favorite" placement="top">
                                        <MotionButton
                                            variant="outline"
                                            colorScheme="teal"
                                            borderRadius="50%"
                                            w="40px"
                                            onClick={() => addMovieToFavoriteList(currentSelectedItem)}
                                            whileTap={{ scale: 1.2 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                        >
                                            <i className="far fa-heart" style={{ fontSize: '1.5rem' }}></i>
                                        </MotionButton>
                                    </Tooltip>
                                )}
                            </ButtonGroup>
                            {videoPlaying && (
                                <Button variant="outline" colorScheme="teal" onClick={onClose}>
                                    Close
                                </Button>
                            )}
                        </HStack>

                        <Divider />
                        <Heading size="md" color="white">{currentSelectedItem?.title}</Heading>
                        <Text color="whiteAlpha.800">{currentSelectedItem?.overview}</Text>

                        {isLoadingSimilar ? (
                            <>
                                <Divider />
                                <SkeletonText mt="4" noOfLines={1} width="150px" />
                                <Grid templateColumns={responsive.grid23} gap={4}>
                                    {Array.from({ length: 18 }).map((_, index) => (
                                        <Skeleton key={index} height="250px" borderRadius="md" />
                                    ))}
                                </Grid>
                            </>
                        ) : movieSimilar.length > 0 && (
                            <>
                                <Divider />
                                <Heading size="sm" color="white">Similar Movies</Heading>
                                <Grid templateColumns={responsive.grid23} gap={4}>
                                    {movieSimilar.map((item) => item.poster_path && item.backdrop_path && (
                                        <Box key={item.id}>
                                            <MovieCard
                                                vote_average={item.vote_average}
                                                src={`${import.meta.env.VITE_URL_IMG}${item.poster_path}`}
                                                alt={item.title}
                                                width="100%"
                                                onClick={() => handleSelectMovie(item)}
                                            />
                                        </Box>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Stack>
                </ModalBody>
            </MotionModalContent>
        </Modal>
    )
}

export default MovieModal