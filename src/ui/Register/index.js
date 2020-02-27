import React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {compose, graphql, gql} from 'react-apollo'
import styled from 'styled-components'
import media from '../../utils/media'
import Button from '../Button'
import {TextInput} from '../Form'
import LoadingSpinner from '../LoadingSpinner'

const Wrapper = styled.div`
  border-radius: 0.4rem;
  background-color: #fff;
  border: 0.1rem solid ${({theme}) => theme.blue};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin: 3rem 1.5rem;
  padding: 1.5rem;

  ${media.tablet`
    width: 40rem;
    margin: 6rem auto;
    padding: 3rem;
  `};
`

const ErrorMessage = styled.p`
  color: ${({theme}) => theme.darkBlue};
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem 0;
`

const Title = styled.h1`
  color: ${({theme}) => theme.orange};
  font-size: 2.2rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
  margin-bottom: 3rem;

  ${media.tablet`
    font-size: 3.2rem;
  `};
`

const RegisterButton = Button.extend`
  margin-left: 0;
  width: 100%;

  ${media.tablet`
    margin-left: 0;
  `};
`

class CreateUser extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    error: ''
  }

  render() {
    const {error} = this.state
    const {data: {loading, user}} = this.props

    if (loading) {
      return <LoadingSpinner />
    }

    if (user) {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      )
    }

    return (
      <Wrapper>
        <Title>Sign up</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={this.createUser}>
          <TextInput
            block
            defaultValue={this.state.name}
            placeholder="Name"
            onChange={e => this.setState({name: e.target.value})}
          />

          <TextInput
            block
            defaultValue={this.state.email}
            placeholder="Email"
            onChange={e => this.setState({email: e.target.value})}
          />

          <TextInput
            type="password"
            block
            defaultValue={this.state.password}
            placeholder="Password"
            onChange={e => this.setState({password: e.target.value})}
          />

          {this.state.name &&
            this.state.email &&
            this.state.password && (
              <RegisterButton type="submit">Register</RegisterButton>
            )}
        </form>
      </Wrapper>
    )
  }

  createUser = async e => {
    e.preventDefault()

    try {
      const user = await this.props.createUser({
        variables: {
          email: this.state.email,
          name: this.state.name,
          password: this.state.password
        }
      })

      window.localStorage.setItem('auth0IdToken', user.data.register.token)

      this.props.data.refetch()
      window.location.reload()
      this.props.history.replace('/')
    } catch (e) {
      console.error(e)
      this.setState({
        error: 'Please provide all the fields above to register'
      })
    }
  }
}

const createUser = gql`
  mutation register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default compose(
  graphql(createUser, {name: 'createUser'}),
  graphql(userQuery, {options: {fetchPolicy: 'network-only'}})
)(withRouter(CreateUser))
