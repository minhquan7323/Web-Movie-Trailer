import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Input, List, ListItem, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <>
            <Box
                display='flex'
                position='fixed'
                justifyContent='space-between'
                alignItems='center'
                bg="#1a202c"
                w='100%'
                p='5px 10px'
                shadow={'0 0 10px 1px rgba(0, 0, 0, 0.2)'}
            >

                <Box display="flex" alignItems="center">
                    <Text>
                        <Button variant='ghost' display={{ base: 'flex', sm: 'none' }} onClick={onOpen} m='7px'>
                            <HamburgerIcon boxSize={6} color='teal' />
                        </Button>
                        <Link to="/">
                            <Text display={{ base: 'none', sm: 'flex' }} fontSize='4xl' color='teal' fontWeight='bold' textTransform='uppercase' px={4}>
                                Movie
                            </Text>
                        </Link>
                    </Text>
                    <Link to="/about">
                        <Text _hover={{ textDecoration: "none" }} display={{ base: 'none', sm: 'flex' }} px={4} >
                            About
                        </Text>
                    </Link>
                    <Link to="/contact">
                        <Text _hover={{ textDecoration: "none" }} display={{ base: 'none', sm: 'flex' }} px={4} >
                            Contact
                        </Text>
                    </Link>
                </Box>


                <Box display="flex" alignItems="center">
                    <Input
                        placeholder='Search'
                        mr={2}
                        color='white'
                    />
                    <Button colorScheme='teal' size='md'>
                        <i className="fas fa-magnifying-glass"></i>
                    </Button>
                </Box>
            </Box>

            <Drawer onClose={onClose} isOpen={isOpen} size='full'>
                <DrawerOverlay />
                <DrawerContent bg="#1a202c">
                    <DrawerCloseButton color='teal' />
                    <DrawerHeader>
                        <Link to="/">
                            <Text fontSize='4xl' color='teal' fontWeight='bold' textTransform='uppercase' px={4} onClick={onClose}>
                                Movie
                            </Text>
                        </Link>
                    </DrawerHeader>

                    <Divider borderColor="teal" />

                    <DrawerBody>
                        <Box display="flex" alignItems="center" py={10}>
                            <Input
                                placeholder='Search'
                                mr={2}
                                color='white'
                            />
                            <Button colorScheme='teal' size='md' onClick={onClose}>
                                <i className="fas fa-magnifying-glass"></i>
                            </Button>
                        </Box>

                        <Divider borderColor="teal" />

                        <VStack as="ul" spacing={4} color="white" align="start" w="full" p={10}>
                            <List spacing={4} styleType="disc">
                                <ListItem>
                                    <Link to="/about" onClick={onClose}>
                                        <Text _hover={{ textDecoration: "none" }} px={4} >
                                            About
                                        </Text>
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to="/contact" onClick={onClose}>
                                        <Text _hover={{ textDecoration: "none" }} px={4} >
                                            Contact
                                        </Text>
                                    </Link>
                                </ListItem>
                            </List>
                        </VStack>

                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header
