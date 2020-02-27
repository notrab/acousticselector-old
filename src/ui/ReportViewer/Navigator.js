import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  border-top: 0.1rem solid #ccc;
  width: 100%;
`;

const Inner = styled.div`padding: 1.5rem 2rem;`;

export default ({currentStep, goForward, goBack}) =>
  <Container>
    <Inner>
      <Button onClick={goBack}>Back</Button>
      <Button onClick={goForward}>Next</Button>
    </Inner>
  </Container>;
