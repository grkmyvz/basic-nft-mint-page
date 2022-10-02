import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { ethers } from "ethers";

import erc721abi from "../../contractABI/NFTABI.json";

const CONTRACT_ADDRESS = "0x350D6F72F095B20cc25aD6FAc7908cAF7ba2C617";

const TokenInfo = () => {

    const [contractInfo, setContractInfo] = useState({
        address: "-",
        tokenName: "-",
        tokenSymbol: "-",
    });

    const getTokenInfo = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const erc721 = new ethers.Contract(CONTRACT_ADDRESS, erc721abi, provider);

        const tokenName = await erc721.name();
        const tokenSymbol = await erc721.symbol();

        setContractInfo({
            address: CONTRACT_ADDRESS,
            tokenName,
            tokenSymbol,
        });
    };

    getTokenInfo();

    return (
        <Container className="mt-3 text-center">
            <Row>
                <Col lg="3">
                    <h5>
                        Token Name <Badge bg="secondary">{contractInfo.tokenName}</Badge>
                    </h5>
                </Col>
                <Col lg="3">
                    <h5>
                        Token Symbol <Badge bg="secondary">{contractInfo.tokenSymbol}</Badge>
                    </h5>
                </Col>
                <Col lg="6">
                    <h5>
                        Addresss <Badge bg="secondary">{contractInfo.address}</Badge>
                    </h5>
                </Col>
            </Row>
        </Container>
    )
}

export default TokenInfo;