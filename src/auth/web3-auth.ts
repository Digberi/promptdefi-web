// Web3Auth Libraries
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Chain } from 'wagmi';

import logoUrl from '@/assets/logo.svg';
import { APP_NAME } from '@/config/constants';

const {
  VITE_WEB3AUTH_CLIENT_ID: clientId,
  VITE_WEB3AUTH_CLIENT_VERIFIER_NAME: verifier,
  VITE_AUTH0_CLIENT_ID: auth0ClientId
} = import.meta.env;

const WEB3_NETWORK = 'testnet';

export const Web3AuthConnectorInstance = (chains: Chain[]) => {
  // Create Web3Auth Instance
  const name = APP_NAME;

  const web3AuthInstance = new Web3Auth({
    clientId,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x' + chains[0].id.toString(16),
      rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol
    },
    sessionTime: 86400 * 7,
    web3AuthNetwork: WEB3_NETWORK,
    uiConfig: {
      appName: name,
      theme: 'auto',
      defaultLanguage: 'en',
      appLogo: logoUrl, // Your App Logo Here
      modalZIndex: '2147483647'
    }
  });

  // Add openlogin adapter for customisations
  const openloginAdapterInstance = new OpenloginAdapter({
    adapterSettings: {
      network: WEB3_NETWORK,
      uxMode: 'popup',
      whiteLabel: {
        name,
        logoLight: logoUrl,
        logoDark: logoUrl,
        defaultLanguage: 'en',
        dark: true // whether to enable dark mode. defaultValue: false
      },
      loginConfig: {
        jwt: {
          verifier,
          typeOfLogin: 'jwt',
          clientId: auth0ClientId
        }
      }
    }
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  return new Web3AuthConnector({
    chains: chains,
    options: {
      web3AuthInstance
    }
  });
};
