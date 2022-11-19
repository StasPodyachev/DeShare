import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';
import { isMobile } from 'react-device-detect';
import {
  coinbaseWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  connectorsForWallets,
  getDefaultWallets,
  darkTheme,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  AuthenticationStatus,
  Chain
} from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { TransactionManageProvider } from '../context/TransactionManageProvider';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

const wallaby: Chain = {
  id: 31415,
  name: 'Wallaby testnet',
  network: 'avalanche',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'tFIL',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: 'https://wallaby.node.glif.io/rpc/v0',
  },
  testnet: true,
};

const { provider, chains, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [wallaby]
      : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_REACT_APP_ALCHEMY_KEY }),
    publicProvider(),
  ]
)
const connectorsM = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({
        appName: 'deforex.com',
        chains
      })
    ],
  },
])
const { wallets } = getDefaultWallets({
  appName: 'Deforex.com',
  chains,
});
const connectors = connectorsForWallets([...wallets])
const clientM = createClient({
  autoConnect: true,
  connectors: connectorsM,
  provider,
  webSocketProvider
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function MyApp({Component,pageProps}: AppProps) {
  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);
  const [ authStatus,setAuthStatus] = useState<AuthenticationStatus>('loading')

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) {
        return;
      }
      fetchingStatusRef.current = true;

      try {
        const response = await fetch('/api/me');
        const json = await response.json();
        setAuthStatus(json.address ? 'authenticated' : 'unauthenticated');
      } catch (_error) {
        setAuthStatus('unauthenticated');
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    // 1. page loads
    fetchStatus();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', fetchStatus);
    return () => window.removeEventListener('focus', fetchStatus);
  }, []);
  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch('/api/nonce');
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce,
        });
      },

      getMessageBody: ({ message }) => {
        return message.prepareMessage();
      },

      verify: async ({ message, signature }) => {
        verifyingRef.current = true;

        try {
          const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, signature }),
          });

          const authenticated = Boolean(response.ok);

          if (authenticated) {
            setAuthStatus(authenticated ? 'authenticated' : 'unauthenticated');
          }

          return authenticated;
        } catch (error) {
          return false;
        } finally {
          verifyingRef.current = false;
        }
      },

      signOut: async () => {
        setAuthStatus('unauthenticated');
        await fetch('/api/logout');
      },
    });
  }, []);

  if (isMobile) {
    return (
      <WagmiConfig client={clientM}>
        <RainbowKitAuthenticationProvider
          adapter={authAdapter}
          status={authStatus}>
          <RainbowKitProvider
            // showRecentTransactions={true}
            modalSize="wide"
            theme={darkTheme({
              accentColor: '#7b3fe4',
              accentColorForeground: 'white',
              borderRadius: "medium",
              fontStack: 'rounded',
              overlayBlur: "none",
            })} chains={chains}>
              <TransactionManageProvider>
                <Component {...pageProps}/>
              </TransactionManageProvider>
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </WagmiConfig>
    )
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authAdapter}
        status={authStatus}>
        <RainbowKitProvider
          // showRecentTransactions={true}
          modalSize="wide"
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: "medium",
            fontStack: 'rounded',
            overlayBlur: "none",
          })} chains={chains}>
            <ChakraProvider theme={theme}>
              <TransactionManageProvider>
                <Component {...pageProps} />
              </TransactionManageProvider>
            </ChakraProvider>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  )
}