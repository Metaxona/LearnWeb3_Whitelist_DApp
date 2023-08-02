import { configureChains, createConfig, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, connectorsForWallets  } from '@rainbow-me/rainbowkit' 
import {
    injectedWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
    metaMaskWallet,
    braveWallet,
} from '@rainbow-me/rainbowkit/wallets';


export const { chains, publicClient } = configureChains(
  [sepolia],
  [
    publicProvider()
  ]
);

// const { connectors } = getDefaultWallets({
//   appName: 'WhitelistApp',
//   projectId: '22225c0ec0bd49fd41fe5f480961c9aa',
//   chains
// });

const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ projectId: "metamask" ,chains }),
    ],
    },
    {
        groupName: "Others",
        wallets: [
            braveWallet({chains}),
            trustWallet({chains}),
            walletConnectWallet({ projectId: '22225c0ec0bd49fd41fe5f480961c9aa' , chains }),
            // rainbowWallet({projectId, chains}),
        ]
    }
  ]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})