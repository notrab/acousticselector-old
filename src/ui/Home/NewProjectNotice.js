import React, {Component} from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import media from '../../utils/media'
import {Container} from '../Layout'
import NewProjectForm from '../NewProjectForm'

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
    color: ${({theme}) => theme.grey};
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
  background-color: white;
  border: 0.2rem solid ${({theme}) => theme.blue};
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
  color: ${({theme}) => theme.darkBlue};
  font-size: 2.2rem;
  font-weight: 500;
  margin: 0 0 1rem;

  ${media.tablet`
    font-size: 3.2rem;
  `};
`

const Text = styled.p`margin: 0 0 3rem;`

export default class extends Component {
  state = {
    projectCreated: false,
    name: ''
  }

  afterSubmit = (_, name) =>
    this.setState(prevState => ({
      ...prevState,
      projectCreated: true,
      name
    }))

  render() {
    const {projectCreated, name} = this.state
    const {handleDismiss} = this.props

    const title = !projectCreated
      ? 'Create your first project'
      : `'${name}' created 🎉`
    const subTitle = !projectCreated
      ? 'Easily bundle reports into named projects'
      : `Select '${name}' from the 'Add to project' dropdown to save this report. You can create and save as many projects as you like.`
    return (
      <Wrapper role="banner">
        <Box>
          <DismissButton onClick={handleDismiss}>
            <Octicon name="x" />
          </DismissButton>
          <SlimContainer>
            <Title>{title}</Title>
            <Text>{subTitle}</Text>

            {!projectCreated && (
              <NewProjectForm
                userId={this.props.userId}
                afterSubmit={this.afterSubmit}
              />
            )}
          </SlimContainer>
        </Box>
      </Wrapper>
    )
  }
}
