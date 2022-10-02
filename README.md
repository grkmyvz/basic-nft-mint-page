# basic-nft-mint-page

First, copy the project to a folder on your computer.
Open the folder with a code editor, come to the terminal screen and automatically install the packages by saying "npm install".
The next step is to edit the necessary places in the file.
Open the NFTABI.json file located in the src/contractABI folder. Delete its contents completely and paste the ABI of the contract that you will use yourself.
Then open the MintSection.js file located in the src/components/MintSection folder. Paste your nft contract address in the "CONTRACT_ADDRESS" section in this file.
Then open the TokenInfo.js file in the src/components/MyWallet folder and paste your nft contract address in the "CONTRACT_ADDRESS" section.
Then open the MyNFTS.js folder located in the src/components/MyWallet folder. In this section, write your nft contract address in the "CONTRACT_ADDRESS" field. In the "MORALIS_KEY" part, paste the key you will get from the https://moralis.io/ platform.
Metamask settings are set for AVALANCHE FUJI TESTNET. If you want to change this, enter the ConnectMetamask.js file in the src/components/Metamask folder and remove the "/*" and "*/" signs at the beginning and end of the "const AVALANCHE_MAINNET_PARAMS" section. Then set AVALANCHE_MAINNET_PARAMS as ACTIVE_CHAIN.

Now you can run your project. Run your project by typing "npm start".


Not: If you encounter a problem, do not hesitate to contact me.
