import React from 'react';
import styled from 'styled-components';

import media from '../../utils/media';

const Wrapper = styled.header`
  background-color: ${({theme}) => theme.lightBlue};
  padding: 2.5rem 2rem;

  ${media.tablet`
    background-color: transparent;
  `};
`;

const Title = styled.h1`
  color: ${({theme}) => theme.orange};
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0 0 0.5rem;

  ${media.tablet`
    font-size: 2.7rem;
    margin-bottom: 1rem;
  `};
`;

const Summary = ({core}) =>
  <Wrapper>
    <Title>
      {core.thickness} {core.manufacturer.name}
    </Title>
    <p>Test ID: 123</p>
  </Wrapper>;

export default Summary;
