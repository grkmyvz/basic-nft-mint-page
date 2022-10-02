import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { ethers } from "ethers";

import erc721abi from "../../contractABI/NFTABI.json";

import axios from 'axios';

const CONTRACT_ADDRESS = "0x350D6F72F095B20cc25aD6FAc7908cAF7ba2C617";
const MORALIS_KEY = "YOUR-MORALIS-KEY";


const MyNFTs = () => {

    const [balanceInfo, setBalanceInfo] = useState({
        address: "-",
        balance: "-"
    });

    const [nftIds, setNftId] = useState({
        nftId: [],
    });

    const getMyBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const erc721 = new ethers.Contract(CONTRACT_ADDRESS, erc721abi, provider);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const balance = await erc721.balanceOf(signerAddress);

        setBalanceInfo({
            address: signerAddress,
            balance: String(balance)
        });
    };

    const getMyNFTs = async () => {
        setNftId({
            nftId: [],
        })
        const options = {
            method: 'GET',
            url: 'https://deep-index.moralis.io/api/v2/' + balanceInfo.address + '/nft',
            params: {
                chain: '0xa869',
                format: 'decimal',
                token_addresses: CONTRACT_ADDRESS
            },
            headers: {
                accept: 'application/json',
                'X-API-Key': MORALIS_KEY
            }
        };

        axios
            .request(options)
            .then(function (response) {
                let nftsData = response.data;
                for (let i = 0; i < nftsData["result"].length; i++) {
                    let tokenId = nftsData["result"][i]["token_id"];
                    setNftId(
                        nftIds => ({
                            nftId: [...nftIds.nftId, tokenId],
                        })
                    );
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const transferNFT = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const erc721 = new ethers.Contract(CONTRACT_ADDRESS, erc721abi, signer);
        console.log(data.get("recipient") + " - " + data.get("nftId"));
        await erc721.transferFrom(signerAddress, data.get("recipient"), data.get("nftId"));
    };

    if (balanceInfo.balance === "-") {
        getMyBalance();
    }

    return (
        <Container className="mt-3 text-center">
            <Row>
                <Col>
                    <h5>
                        MyAddress <Badge bg="secondary">{balanceInfo.address}</Badge>
                    </h5>
                </Col>
                <Col>
                    <h5>
                        Balance <Badge bg="secondary">{balanceInfo.balance}</Badge> <Button variant="primary" onClick={() => getMyNFTs()}>Show My NFTs</Button>
                    </h5>
                </Col>
            </Row>
            <hr />
            <Row className="justify-content-md-center mt-3">
                {
                    nftIds.nftId.map((nft, index) => (
                        <Col md="auto" key={index}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://via.placeholder.com/300" />
                                <Card.Body>
                                    <Card.Title>Token ID # {nft}</Card.Title>
                                    <Form onSubmit={transferNFT}>
                                        <Row>
                                            <Col sm="2">
                                                <Form.Check inline name="nftId" type="checkbox" value={nft} />
                                            </Col>
                                            <Col sm="10">
                                                <Form.Control name="recipient" type="text" placeholder="Recipient" size="sm" />
                                            </Col>
                                        </Row>
                                        <Button className="mt-3" type="submit" variant="primary">Transfer NFT</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
                <h4 style={balanceInfo.balance === 0 ? {} : { display: "none" }}>You don't have an nft.</h4>
            </Row>
        </Container>
    )
}

export default MyNFTs;