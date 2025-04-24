import { Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import responsive from '../constants/responsive'

const GenreMenu = ({ genres, handleClickGenre }) => {
    return (
        <Box p={5} display={'flex'} justifyContent={'right'} alignItems='end'>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Genre
                </MenuButton>
                <MenuList color={'black'} zIndex='1001'>
                    <Grid
                        templateColumns={responsive.grid2to5}
                        gap={2}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} onClick={() => handleClickGenre(genre.name)}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Grid>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default GenreMenu