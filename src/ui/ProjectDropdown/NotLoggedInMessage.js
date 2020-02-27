import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import {Link} from 'react-router-dom'

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
    <Icon name="sign-in" />
    <Text>
      Once <Link to="/login">logged in</Link> you<br />can create or add to
      projects.
    </Text>
  </Wrapper>
)
