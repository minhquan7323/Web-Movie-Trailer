import React, { useEffect, useState } from 'react'
import { Grid, useDisclosure, HStack, Image, Heading, VStack, Box, Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import MovieModal from './MovieModal'
import { ChevronDownIcon } from '@chakra-ui/icons'

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
                    <Heading size="xl" pl={2}>
                        {selectedGenre} Movies
                    </Heading>
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