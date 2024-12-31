import { Box, Button, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 568 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 568, min: 0 },
        items: 1,
    }
}

const Banner = ({ data }) => {
    console.log(data);

    return (
        <>
            <Carousel
                responsive={responsive}
                infinite
                arrows={false}
                centerMode={false}
                partialVisible
                autoPlay={true}
                draggable={false}
                autoPlaySpeed={3000}
                showDots={true}
            >
                {data.length > 0 && data.map((item, index) => (
                    <HStack
                        key={index}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        px={5}
                        h="100%"
                        position="relative"
                        bgImage={`url(${import.meta.env.VITE_URL_IMG}${item.backdrop_path})`}
                        bgSize="cover"
                        bgPosition="center"
                    >
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            bg="rgba(0, 0, 0, 0.5)"
                            zIndex="0"
                        />
                        <VStack spacing={6} align="flex-start" w={{ base: '100%', md: '50%' }} py={40} zIndex="2">
                            <Heading size={{ base: 'sm', sm: 'lg' }}>
                                {item.title}
                            </Heading>
                            <Text fontSize='14px' color='whiteAlpha.900'>{item.overview}</Text>
                            <HStack spacing={4}>
                                <Button px={7}>
                                    <i className="fa-solid fa-play"></i>
                                    <Text display={{ base: 'none', sm: 'flex' }} marginLeft={2}>
                                        Play
                                    </Text>
                                </Button>
                                <Button colorScheme="blackAlpha" px={7}>
                                    <i className="fa-solid fa-circle-info"></i>
                                    <Text display={{ base: 'none', sm: 'flex' }} marginLeft={2}>
                                        More information
                                    </Text>
                                </Button>
                            </HStack>
                        </VStack>
                        <Box display={{ base: 'none', md: 'flex' }}>
                            <Image
                                zIndex="2"
                                src={`${import.meta.env.VITE_URL_IMG}${item.backdrop_path}`}
                                alt={item.title}
                            />
                        </Box>
                    </HStack>
                ))}
            </Carousel>
        </>
    )
}

export default Banner
