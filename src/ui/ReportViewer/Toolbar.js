import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const Container = styled.div`
  background-color: #f1f2f3;
  padding: 2rem 1.5rem;
  border-bottom: 0.1rem solid #ccc;
  position: relative;
`;

export default ({currentStep, handleClose}) =>
  <Container>
    <Button onClick={handleClose}>Close</Button>
  </Container>;
