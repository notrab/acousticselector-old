import React from 'react';
import styled, {css, keyframes} from 'styled-components';

import media from '../../utils/media';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Wrapper = styled.div`
  background-color: #fff;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 1.5rem 0;
  z-index: 100;
  animation: ${fadeInDown} 0.25s ease-in-out;
  ${'' /* display: ${props => (props.open ? 'block' : 'none')}; */};

  ${media.tablet`
    display: none;
    box-shadow: 0 1px 15px 0 rgba(48, 51, 55, 0.25);
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    border-right: 0;
    border-top: 0;
    position: absolute;
  `};

  h4 {
    color: ${({theme}) => theme.darkBlue};
    font-weight: 500;
    font-size: 1.3rem;
    margin: 0.5rem 1.5rem;
    text-transform: uppercase;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  button {
    margin-left: 0;
  }

  ${props => props.padded && css`padding: 1.5rem;`};
`;

export default ({children, open}) => <Wrapper open={open}>{children}</Wrapper>;
