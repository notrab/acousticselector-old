import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
// import {gql, graphql} from 'react-apollo';
// import {compose} from 'redux';
// import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import media from '../../utils/media'
import {Container} from '../Layout'
import {PrimaryButton, ButtonGroup} from '../Button'

const SlimContainer = styled(Container)`
  max-width: 90%;

  ${media.tablet`
    max-width: 55%;
  `};
`

const DismissButton = styled.span`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.3rem;

  ${media.tablet`
    top: 2.5rem;
    right: 2.5rem
  `};

  span {
    color: rgba(255, 255, 255, 0.85);
  }

  &:hover span {
    color: #fff;
  }
`

const Wrapper = styled.header`
  margin-bottom: 2rem;
  position: relative;
`

const Box = styled.article`
  background-image: linear-gradient(175deg, ${({theme}) => theme.darkBlue}, ${({theme}) => theme.orange});
  background-size: 105%;
  background-position: 50% 100%;
  background-repeat: no-repeat;
  border-radius: 0.4rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  text-align: center;

  ${media.tablet`
    padding-top: 5rem;
    padding-bottom: 5rem;
    background-position: 50% 90%;
  `};
`

const Title = styled.h1`
  color: #fff;
  font-size: 2.2rem;
  font-weight: 500;
  margin: 0 0 1rem;

  ${media.tablet`
    font-size: 3.2rem;
  `};
`

const Text = styled.p`margin: 0 0 3rem; color: rgba(255, 255, 255, 0.85);`

export default ({loggedIn, handleDismiss}) => (
  <Wrapper role="banner">
    <Box>
      <DismissButton onClick={handleDismiss}>
        <Octicon name="x" />
      </DismissButton>
      <SlimContainer>
        <Title>Acoustic Selector</Title>
        <Text>
          Find the perfect door and seal combination to match your acoustic
          requirements.
        </Text>

        <Text>
          Norseal has carried out over 400 sound attenutating tests with a
          variety of door types and seal configurations.
        </Text>
        <ButtonGroup>
          <Link to="/about-us">
            <PrimaryButton big>Read more</PrimaryButton>
          </Link>

          {/* <Button big>Take a tour</Button> */}
        </ButtonGroup>
      </SlimContainer>
    </Box>
  </Wrapper>
)
