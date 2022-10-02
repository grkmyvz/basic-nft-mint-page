import React from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Footer() {
    return (
        <Navbar className="mt-5" bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {"<3"} Avalanche
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Footer;