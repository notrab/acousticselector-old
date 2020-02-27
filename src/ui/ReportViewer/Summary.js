import React from 'react'
import styled from 'styled-components'

import media from '../../utils/media'

const Wrapper = styled.header`
  padding: 2.5rem 2rem;
  text-align: center;

  ${media.tablet`
    background-color: transparent;
  `};
`

const Title = styled.h1`
  color: ${({theme}) => theme.orange};
  display: inline-block;
  font-size: 2.4rem;
  font-weight: 400;
  margin: 0;

  ${media.tablet`
    font-size: 2.7rem;
    margin-bottom: 0;
  `};
`

const SubTitle = styled.p`
  color: ${({theme}) => theme.grey};
  margin: 1rem 0;
`

const Summary = ({dbrw, title, core, notes}) => (
  <Wrapper>
    <Title>
      {dbrw}dBRw {title}
    </Title>

    {notes && <SubTitle>{notes}</SubTitle>}

    <p>Manufacturer: {core.manufacturer.name}</p>
    <p>Thickness: {core.thickness}</p>
    {core.fireRating && <p>Fire Rating: {core.fireRating}</p>}
  </Wrapper>
)

export default Summary
