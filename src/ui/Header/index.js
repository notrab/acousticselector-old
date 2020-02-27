import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Wrapper from './wrapper'
import Logo from './logo'
import UserArea from './user-area'
import UserDropdown from './user-dropdown'
import {FluidContainer, FlexContainer} from '../Layout'
import Tether from '../Tether'
import {hideLoginTip} from '../../ducks/common'
import UserLink from './UserLink'

const Header = ({
  data: {user, loading},
  logout,
  hideLoginTip,
  showLoginTip
}) => (
  <Wrapper role="navigation">
    <FluidContainer>
      <FlexContainer>
        <Logo
          to={{
            pathname: '/',
            state: {modal: false}
          }}
        />

        <UserArea>
          {loading ? (
            ''
          ) : user ? (
            <UserDropdown user={user} logout={logout} />
          ) : (
            <Tether
              offsetY="30"
              side="top"
              horizontal="right"
              dismissAction={hideLoginTip}
              title="Register or login"
              description="Assign reports to projects and more by signing up."
              visible={showLoginTip}>
              <div>
                <UserLink to="/register">Register</UserLink>
                <UserLink to="/login">Login</UserLink>
              </div>
            </Tether>
          )}
        </UserArea>
      </FlexContainer>
    </FluidContainer>
  </Wrapper>
)

const mapStateToProps = ({common: {showLoginTip}}) => ({
  showLoginTip
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideLoginTip
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Header)
