import React, { useState, useEffect, useRef } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';

import Button from 'react-bootstrap/Button';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect Metamask';
const CONNECTED_TEXT = 'Connected';

// AVALANCHE CHAINS
/*
const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/']
}
*/
const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/']
}

const ACTIVE_CHAIN = AVALANCHE_TESTNET_PARAMS;

const isChain = (chainId) => (
  chainId &&
  chainId.toLowerCase() === ACTIVE_CHAIN.chainId.toLowerCase()
)

const ConnectMetamask = () => {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  window.ethereum.on('chainChanged', () => window.location.reload());
  window.ethereum.on('accountsChanged', () => window.location.reload());

  return (
    <>
      <div style={isDisabled ? { display: "none" } : {}}>
        <Button variant="primary" disabled={isDisabled} onClick={onClick}>
          {buttonText}
        </Button>
      </div>
      <div style={isDisabled ? {} : { display: "none" }}>
        <p>Welcome <strong>{accounts}</strong></p>
        <p className="text-danger" style={isChain(window.ethereum.chainId) ? { display: "none" } : {}}><small>To run this dApp you need to switch to the {ACTIVE_CHAIN.chainName} chain</small></p>
      </div>
    </>
  );
}

export default ConnectMetamask;