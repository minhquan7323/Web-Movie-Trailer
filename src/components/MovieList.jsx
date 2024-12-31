import { Box, Button, ButtonGroup, Divider, Heading, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 7,
        partialVisibilityGutter: 40

    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1024, min: 568 },
        items: 2,
        partialVisibilityGutter: 30

    },
    mobile: {
        breakpoint: { max: 568, min: 0 },
        items: 1,
        partialVisibilityGutter: 20
    }
}

const opts = {
    width: '100%',
    playerVars: {
        autoplay: 1,
    },
}

const MovieList = ({ title, data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const [selectedItem, setSelectedItem] = useState('')
    const [trailerKey, setTrailerKey] = useState('')
    const [videoPlaying, setVideoPlaying] = useState(false)

    const handleTrailer = async (id) => {
        setVideoPlaying(false)
        setTrailerKey('')
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`
                }
            }
            const movieKey = await fetch(url, options)
            const data = await movieKey.json()
            setTrailerKey(data.results[0].key)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <VStack display="flex" alignItems="left" justifyContent="space-between" p="10px">
            <Heading size="lg" paddingLeft='10px'>
                {title}
            </Heading>

            <Carousel responsive={responsive} infinite arrows centerMode={false} partialVisible draggable={false}>
                {data.length > 0 &&
                    data.map((item) => (
                        <HStack key={item.id} alignItems="center" justify="center" p={2} >
                            <Image
                                cursor="pointer"
                                objectFit="cover"
                                onClick={() => {
                                    setSelectedItem(item)
                                    onOpen()
                                    handleTrailer(item.id)
                                }}
                                src={`${import.meta.env.VITE_URL_IMG}${item.backdrop_path}`}
                                alt={item.title}
                                borderRadius="md"
                                _hover={{
                                    transform: "scale(1.05)",
                                }}
                                transition="transform 0.2s ease-in-out"
                            />
                        </HStack>
                    ))}
            </Carousel>

            {selectedItem && (
                <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered size='xl'>
                    <ModalOverlay />
                    <ModalContent bgColor="#1a202c">
                        <ModalCloseButton
                            border="2px solid white"
                            borderRadius="full"
                            color="white"
                            _hover={{
                                backgroundColor: 'transparent',
                                borderColor: 'teal',
                                color: 'teal'
                            }}
                        />
                        <ModalBody p={0} borderRadius="5px">
                            {videoPlaying ? (
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
                                    src={`${import.meta.env.VITE_URL_IMG}${selectedItem.backdrop_path}`}
                                    alt={selectedItem.title}
                                    borderTopRadius="lg"
                                    w='100%'
                                />
                            )}
                            <Stack p={5} spacing="3">
                                <Heading size="md" color="white" paddingBottom={2}>
                                    {selectedItem.title}
                                </Heading>
                                <Divider />
                                <HStack paddingTop={2} justifyContent='space-between'>
                                    <Box>
                                        <ButtonGroup spacing={2}>
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
                                            <Tooltip label="Add to Favorite" placement="top">
                                                <Button variant="outline" colorScheme="teal" borderRadius="50%" w="40px">
                                                    <i className="fa-solid fa-plus" style={{ fontSize: '1.5rem' }}></i>
                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </Box>
                                    <Box>
                                        <Button variant='outline' colorScheme='teal' onClick={onClose}>Close</Button>
                                    </Box>
                                </HStack>
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </VStack>
    )
}

export default MovieList