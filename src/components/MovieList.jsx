import { Box, Heading, HStack, Skeleton, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MovieModal from './MovieModal'
import MovieCard from './MovieCard'
import { motion } from 'framer-motion'
import responsive from '../constants/responsive'

const MovieList = ({ title, data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState(null)
    const finalRef = React.useRef(null)
    const MotionBox = motion(Box)

    const handleSelectMovie = (item) => {
        setSelectedItem(item)
        onOpen()
    }

    const isLoading = data.length === 0

    return (
        <MotionBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            p="10px"
            zIndex="0"
            initial={{ y: 100 }}
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
        >    <Heading size="lg" paddingLeft="10px">
                {title}
            </Heading>
            <Box overflow="hidden" width="100%">
                <Carousel
                    responsive={responsive.carouselList}
                    infinite
                    arrows
                    centerMode={false}
                    partialVisible
                    draggable={false}
                >
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <HStack key={index} alignItems="center" justify="center" p={2}>
                                <Skeleton height="270px" width="180px" borderRadius="md" />
                            </HStack>
                        ))
                        : data.map((item) =>
                            item.poster_path && item.backdrop_path && (
                                <HStack key={item.id} alignItems="center" justify="center" p={2} py={5}>
                                    <MovieCard
                                        src={`${import.meta.env.VITE_URL_IMG}${item.poster_path}`}
                                        alt={item.title}
                                        onClick={() => handleSelectMovie(item)}
                                    />
                                </HStack>
                            )
                        )}
                </Carousel>
            </Box>

            {selectedItem && (
                <MovieModal
                    isOpen={isOpen}
                    onClose={onClose}
                    selectedItem={selectedItem}
                    finalRef={finalRef}
                />
            )}
        </MotionBox>
    )
}

export default MovieList
