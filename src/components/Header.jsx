import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    useColorMode,
    Text,
  } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {

const {colorMode, toggleColorMode} = useColorMode()

return(<>
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} padding={"0.5rem"} py={"1rem"} alignItems={'center'} justifyContent={'space-between'}>
            <Box display={'inline-flex'}>
                <Text fontWeight={'bold'} fontSize={'x-large'}>White</Text>
                <Text fontWeight={'bold'} fontSize={'x-large'} color={'#5CB9FE'}>List</Text>
            </Box>
        
            <Flex gap={"1rem"}>
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                
                <ConnectButton />
             
            </Flex>
        </Flex>
    </Box>
  </>)

}

export default Header
