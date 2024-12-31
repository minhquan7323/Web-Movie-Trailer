import { Heading, HStack, Image, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MovieModal from './MovieModal'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 7,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 568 },
        items: 4,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 568, min: 0 },
        items: 2,
        partialVisibilityGutter: 30
    }
}

const MovieList = ({ title, data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState(null)
    const finalRef = React.useRef(null)

    const handleSelectMovie = (item) => {
        setSelectedItem(item)
        onOpen()
    }

    return (
        <VStack display="flex" alignItems="left" justifyContent="space-between" p="10px" zIndex="0">
            <Heading size="lg" paddingLeft="10px">
                {title}
            </Heading>
            <Carousel responsive={responsive} infinite arrows centerMode={false} partialVisible draggable={false}>
                {data.length > 0 &&
                    data.map((item) => (
                        <HStack key={item.id} alignItems="center" justify="center" p={2}>
                            <Image
                                cursor="pointer"
                                objectFit="cover"
                                onClick={() => handleSelectMovie(item)}
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
                    ))}
            </Carousel>

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

export default MovieList
