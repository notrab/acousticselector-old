import React from 'react';
import styled from 'styled-components';

import media from '../../utils/media';
import {fadeIn} from '../animations';

const Wrapper = styled.div`
  animation: ${fadeIn} 0.15s ease-in-out;
  background-color: #fff;
  border: 0.1rem solid ${({theme}) => theme.blue};
  border-radius: 0.4rem;
  margin-bottom: 1rem;

  ${media.tablet`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `};
`;

const Rating = styled.div`
  background-color: ${({theme}) => theme.lightOrange};
  border-radius: 0.4rem;
  height: 3.4rem;
  width: 10rem;
  margin: 1.5rem 2rem;

  ${media.tablet`
    width: 6rem;
    height: 6rem;
    margin: 4.5rem;
  `};
`;

const Heading = styled.div`
  background-color: ${({theme}) => theme.lightOrange};
  border-radius: 0.4rem;
  height: 2rem;
  width: 22rem;

  ${media.tablet`
    width: 30rem;
  `};
`;

const Details = styled.div`
  padding: 2rem;
  border-top: 1px solid ${({theme}) => theme.blue};

  ${media.tablet`
    flex-grow: 1;
    padding: 0;
    border-top-width: 0;
  `};
`;

const Text = styled.div`
  background-color: ${({theme}) => theme.blue};
  border-radius: 0.4rem;
  height: 1.25rem;
  width: 70%;
  margin-top: 1rem;

  ${media.tablet`
    width: 24rem;
  `};
`;

const LoadingCard = () =>
  <Wrapper>
    <Rating />
    <Details>
      <Heading />
      <Text />
      <Text />
      <Text />
    </Details>
  </Wrapper>;

export default LoadingCard;
