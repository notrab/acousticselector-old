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

const LoginButton = Button.extend`
  margin-left: 0;
  width: 100%;

  ${media.tablet`
    margin-left: 0;
  `};
`

const ErrorMessage = styled.p`
  color: ${({theme}) => theme.darkBlue};
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem 0;
`

class Login extends React.Component {
  state = {
    email: '',
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
        <Title>Login</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={this.loginUser}>
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

          {this.state.email &&
            this.state.password && (
              <LoginButton type="submit">Login</LoginButton>
            )}
        </form>
      </Wrapper>
    )
  }

  loginUser = async e => {
    e.preventDefault()

    try {
      const user = await this.props.loginUser({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })

      window.localStorage.setItem('auth0IdToken', user.data.login.token)

      this.props.data.refetch()
      window.location.reload()
      this.props.history.replace('/')
    } catch (e) {
      console.error(e)
      this.setState({
        error: 'Email or password incorrect.'
      })
    }
  }
}

const loginUser = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  graphql(loginUser, {name: 'loginUser'}),
  graphql(userQuery, {options: {fetchPolicy: 'network-only'}})
)(withRouter(Login))
