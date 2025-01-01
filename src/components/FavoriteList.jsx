import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalProvider'
import { Grid, Heading, HStack, Image, useDisclosure, VStack } from '@chakra-ui/react'
import MovieModal from './MovieModal'

const FavoriteList = () => {
    const { favoriteList } = useContext(GlobalContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState(null)
    const finalRef = React.useRef(null)

    return (
        <>
            <VStack display="flex" alignItems="left" justifyContent="space-between" p="70px 10px 10px 10px" zIndex="0">
                <Heading size="xl" pl={2}>
                    Favorite List
                </Heading>
                {favoriteList.length > 0 ? (
                    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                        {favoriteList.map((item) => (
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
        </>
    )
}

export default FavoriteList
