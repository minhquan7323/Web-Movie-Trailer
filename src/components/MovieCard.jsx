import { Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MotionImage = motion(Image)

const MovieCard = ({ src, alt, onClick, width = '180px' }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <MotionImage
            cursor="pointer"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            objectFit="cover"
            w={width}
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
    )
}

export default MovieCard