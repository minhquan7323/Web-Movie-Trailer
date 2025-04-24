import {
    Box,
    CircularProgress,
    CircularProgressLabel,
    Image,
    Text,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

const MovieCard = ({ vote_average = 0, src, alt, onClick, width = '180px' }) => {
    const [isHovered, setIsHovered] = useState(false)
    const votePercent = Math.round((vote_average / 10) * 100)

    return (
        <Box
            position="relative"
            width={width}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            cursor="pointer"
            onClick={onClick}
        >
            <MotionImage
                objectFit="cover"
                w="100%"
                src={src}
                alt={alt}
                borderRadius="md"
                initial={{ scale: 1, rotate: 0 }}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotate: isHovered ? 2 : 0,
                    boxShadow: isHovered
                        ? '0 4px 10px rgba(0, 0, 0, 0.5)'
                        : '0 2px 5px rgba(0, 0, 0, 0.15)',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.3,
                }}
            />

            <AnimatePresence>
                {isHovered && (
                    <MotionBox
                        key="progress"
                        position="absolute"
                        top="5px"
                        right="5px"
                        transform="translate(-50%, -50%)"
                        initial={{ opacity: 0, scale: 0, y: -50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <CircularProgress
                            value={vote_average * 10}
                            color="teal"
                            size="50px"
                            bg="rgba(113, 128, 150, 0.8)"
                            borderRadius="full"
                        >
                            <CircularProgressLabel>
                                <Text fontWeight="bold" color='white'>{vote_average.toFixed(1)}</Text>
                            </CircularProgressLabel>
                        </CircularProgress>
                    </MotionBox>
                )}
            </AnimatePresence>
        </Box>
    )
}

export default MovieCard
