import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

const Wrapper = styled.div`
  text-align: center;
  padding: 1.5rem 0;
`

const Icon = styled(Octicon)`
  color: ${({theme}) => theme.orange};
  fill: ${({theme}) => theme.orange};
  transform: scale(2);
`

const Text = styled.p`
  margin-bottom: 0;
  color: ${({theme}) => theme.darkBlue};
`

export default () => (
  <Wrapper>
    <Icon name="plus" />
    <Text>
      Create a project<br /> to get started
    </Text>
  </Wrapper>
)
