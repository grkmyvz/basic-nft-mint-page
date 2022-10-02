import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import ConnectMetamask from '../Metamask/ConnectMetamask';

function TopNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/mywallet">MyWallet</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <ConnectMetamask />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;