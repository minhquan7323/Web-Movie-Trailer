import React, { useEffect, useState } from 'react'
import { Grid, useDisclosure, HStack, Heading, VStack, Box, Menu, MenuButton, Button, MenuList, MenuItem, Skeleton } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import MovieModal from './MovieModal'
import { ChevronDownIcon } from '@chakra-ui/icons'
import MovieCard from './MovieCard'

const MovieGenre = () => {
    const location = useLocation()
    const { selectedGenre, moviesByGenre, genres } = location.state || {}
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState(null)
    const finalRef = React.useRef(null)
    const genreRef = React.useRef(null)
    const navigate = useNavigate()

    const filteredMovies = selectedGenre ? moviesByGenre[selectedGenre] : []

    const handleClickGenre = (genreName) => {
        navigate('/genre', { state: { selectedGenre: genreName, moviesByGenre, genres } })
    }

    const handleSelectMovie = (item) => {
        setSelectedItem(item)
        onOpen()
    }
    return (
        <Box pt='70px'>
            <Box p={5} display={'flex'} justifyContent={'right'} alignItems='end'>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Genre
                    </MenuButton>
                    <MenuList color={'black'} zIndex='1001'>
                        <Grid templateColumns={'repeat(4, 1fr)'} >
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} onClick={() => handleClickGenre(genre.name)}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Grid>
                    </MenuList>
                </Menu>
            </Box>

            {selectedGenre && (
                <>
                    <Skeleton isLoaded={selectedGenre} height="50px" width="200px" mb={4}>
                        <Heading size="xl" pl={2}>
                            {selectedGenre}
                        </Heading>
                    </Skeleton>

                    <VStack ref={genreRef} display="flex" alignItems="left" justifyContent="space-between" p="10px">
                        {filteredMovies.length > 0 ? (
                            <Grid
                                templateColumns={{
                                    base: "repeat(3, 1fr)",
                                    md: "repeat(4, 1fr)",
                                    lg: "repeat(6, 1fr)"
                                }}
                            >
                                {filteredMovies.map((item) => (
                                    item.poster_path && item.backdrop_path && (
                                        <HStack key={item.id} alignItems="center" justify="center" p={2}>
                                            <Skeleton isLoaded={item.poster_path} width="180px" height="270px">
                                                <MovieCard
                                                    src={`${import.meta.env.VITE_URL_IMG}${item.poster_path}`}
                                                    alt={item.title}
                                                    onClick={() => handleSelectMovie(item)}
                                                />
                                            </Skeleton>
                                        </HStack>
                                    )
                                ))}
                            </Grid>
                        ) : (
                            <Heading size="lg" display='flex' justifyContent='center' alignItems='center' h='70vh'>
                                No movies found
                            </Heading>
                        )}
                    </VStack>
                </>
            )}

            {selectedItem && (
                <MovieModal
                    isOpen={isOpen}
                    onClose={onClose}
                    selectedItem={selectedItem}
                    finalRef={finalRef}
                />
            )}
        </Box>
    )
}

export default MovieGenre