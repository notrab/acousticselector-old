import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
// import {placeholder} from 'polished';

import media from '../../utils/media'
import {Container} from '../Layout'
// import Logo from '../Header/circle-logo.svg';
import NorsealLogo from './norseal-logo.svg'

const Row = styled.div`
  ${media.tablet`
    display: flex;
    justify-content: space-between;
  `};
`

const Col = styled.div`
  margin-bottom: 3rem;

  &:last-child {
    flex: 1;
    margin-bottom: 0;
  }

  ${media.tablet`
    width: 25%;
    margin-bottom: 0;
  `};
`

const Wrapper = styled.div`
  border-top: 0.1rem solid ${({theme}) => theme.blue};
  padding: 3rem 0 9rem;
  text-align: center;

  a {
    text-decoration: none;
    color: ${({theme}) => theme.grey};

    &:hover {
      color: ${({theme}) => theme.darkBlue};
    }
  }
`

const List = styled.ul`
  margin: 0 0 3rem;
  padding: 0;
  list-style: none;
`

const Heading = styled.h3`
  color: ${({theme}) => theme.darkBlue};
  display: block;
  font-size: 1.7rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 1rem;
`

const Item = styled.li`
  margin: 0 0 0.5rem;

  > a {
    color: ${({theme}) => theme.grey};
    text-decoration: none;

    &:hover {
      color: ${({theme}) => theme.darkBlue};
    }
  }
`

const Footer = () => (
  <footer>
    <Container>
      <Wrapper>
        <Row>
          <Col>
            <Heading>More</Heading>
            <List>
              <Item>
                <Link to="/about-us">About us</Link>
              </Item>
              <Item>
                <Link to="/disclaimer">Disclaimer</Link>
              </Item>
              <Item>
                <Link to="/help">Get help</Link>
              </Item>
              {/* <Item>
                <Link to="/contact-us">Contact us</Link>
              </Item> */}
            </List>

            <a
              href="https://norseal.co.uk"
              target="_blank"
              rel="noopener noreferrer">
              <img src={NorsealLogo} width="202" alt="Norseal Ltd" />
            </a>
          </Col>
        </Row>
      </Wrapper>
    </Container>
  </footer>
)

export default Footer
