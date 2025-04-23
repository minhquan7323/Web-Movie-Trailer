import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalProvider'
import { Box, Grid, Heading, HStack, Skeleton, useDisclosure, VStack } from '@chakra-ui/react'
import MovieModal from './MovieModal'
import MovieCard from './MovieCard'

const FavoriteList = () => {
    const { favoriteList } = useContext(GlobalContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState(null)
    const finalRef = React.useRef(null)

    const isLoading = favoriteList === null
    const handleSelectMovie = (item) => {
        setSelectedItem(item)
        onOpen()
    }
    return (
        <Box minH='100vh'>
            <VStack display="flex" alignItems="left" justifyContent="space-between" p="70px 10px 10px 10px" zIndex="0">
                <Heading size="xl" pl={2}>
                    Favorite List
                </Heading>

                {isLoading ? (
                    <Grid
                        templateColumns={{
                            base: "repeat(3, 1fr)",
                            md: "repeat(4, 1fr)",
                            lg: "repeat(6, 1fr)"
                        }}
                        gap={4}
                        mt={4}
                    >
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Skeleton key={index} height="270px" width="180px" borderRadius="md" />
                        ))}
                    </Grid>
                ) : favoriteList.length > 0 ? (
                    <Grid
                        templateColumns={{
                            base: "repeat(3, 1fr)",
                            md: "repeat(4, 1fr)",
                            lg: "repeat(6, 1fr)"
                        }}
                        gap={4}
                    >
                        {favoriteList.map((item) => (
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
                        No movies in the list
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
        </Box>
    )
}

export default FavoriteList