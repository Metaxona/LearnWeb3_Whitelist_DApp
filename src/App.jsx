import { 
  ChakraProvider,
  Text,
  Heading,
  Flex,
  Button
} from '@chakra-ui/react'
import Header from "./components/Header";
import { readContract, writeContract } from "@wagmi/core"
import { useAccount } from 'wagmi';
import { wishlistContract } from './wishlist';
import { useEffect, useState } from 'react';

function App() {
  const { address, isConnected } = useAccount();
  const [ maxWhitelisted, setMaxWhitelisted ] = useState(0);
  const [ currentWhitelisted, setCurrentWhitelisted ] = useState(0);
  const [ isWhitelisted, setIsWhitelisted ] = useState(false);
  const [ transactionHash, setTransactionHash ] = useState(null);

  useEffect(()=>{

    async function getCountData(){
      const maxCount = await readContract({
        address: wishlistContract.conractAddress,
        abi: wishlistContract.abi,
        functionName: "maxWhitelistedAddresses"
      })

      const currentCount = await readContract({
        address: wishlistContract.conractAddress,
        abi: wishlistContract.abi,
        functionName: "numAddressesWhitelisted"
      })

      const amIWhitelisted = await readContract({
        address: wishlistContract.conractAddress,
        abi: wishlistContract.abi,
        functionName: "whitelistedAddresses",
        args: [address]
      })

      setMaxWhitelisted(maxCount)
      setCurrentWhitelisted(currentCount)
      setIsWhitelisted(amIWhitelisted)
    }

    if(isConnected) { getCountData() }

  }, [address, isWhitelisted, transactionHash])

  async function WhitelistMe(){
    const addToWhitelist = await writeContract({
      address: wishlistContract.conractAddress,
      abi: wishlistContract.abi,
      functionName: "addAddressToWhitelist",
    })

    setTransactionHash(addToWhitelist.hash)

  }

  return (
          <ChakraProvider>
            <Header />

            <Flex padding={"1rem"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
              <Heading>GET WHITELISTED NOW!</Heading>
              <Text>{currentWhitelisted}/{maxWhitelisted}</Text>
              {isWhitelisted ? <Text>🎉 Congratulations Your Are Now On The Whitelist! 🎉</Text> : ""}
              {isConnected ? <Button onClick={WhitelistMe} isDisabled={isWhitelisted}>{!isWhitelisted ? "Click To Get Whitelist" : "Already In The Whitelist"}</Button> : <Text>Please Connect First!</Text>}
              {transactionHash ? <Text>Tx Hash: {transactionHash}</Text> : ""}
            </Flex>

          </ChakraProvider>
          )
}

export default App
