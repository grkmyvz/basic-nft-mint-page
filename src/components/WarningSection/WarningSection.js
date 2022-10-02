import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const WarningSection = () => {
  return (
    <Container className="mt-3">
      <Alert variant="warning">
      This app is made by creator to learn solidity and reactjs. It does not accept any responsibility in case of damage to your assets as a result of faulty code or vulnerabilities. <strong>We recommend using this app with a different wallet.</strong>
      </Alert>
    </Container>
  )
}

export default WarningSection;