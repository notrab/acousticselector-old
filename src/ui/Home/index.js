import React from 'react'
import {gql, graphql} from 'react-apollo'
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StickyContainer, Sticky} from 'react-sticky'
import {Helmet} from 'react-helmet'

import {Container} from '../Layout'
import WelcomeNotice from './WelcomeNotice'
import NewProjectNotice from './NewProjectNotice'
import Filter from '../Filter'
import ReportList from '../ReportList'
import {dismissWelcome, dismissNewProject} from '../../ducks/common'

const title = 'Acoustic Selector by Norseal'
const description =
  "A comprehensive search tool for Norseal's extensive database of acoustic test data."
const url = 'https://acousticselector.com'

const Home = ({
  data: {user, loading},
  showWelcomeNotice,
  dismissWelcome,
  showNewProjectNotice,
  dismissNewProject
}) => (
  <StickyContainer>
    <div>
      <Helmet>
        <title>
          Acoustic Test Reports | Acoustic Seal Configurations | Acoustic Seals
        </title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Helmet>

      <Sticky topOffset={0}>{props => <Filter {...props} />}</Sticky>

      <Container padded>
        {showWelcomeNotice && (
          <WelcomeNotice loggedIn={!!user} handleDismiss={dismissWelcome} />
        )}

        {user &&
          user._projectsMeta &&
          user._projectsMeta.count === 0 &&
          showNewProjectNotice && (
            <NewProjectNotice
              userId={user.id}
              handleDismiss={dismissNewProject}
            />
          )}

        <ReportList currentUserId={user && user.id} />
      </Container>
    </div>
  </StickyContainer>
)

const mapQueryToProps = gql`
  query {
    user {
      id
      #name
      #admin
      _projectsMeta {
        count
      }
    }
  }
`

const mapStateToProps = ({
  common: {dismissedWelcome, dismissedNewProject},
  filter: {dirty}
}) => ({
  showWelcomeNotice: !dismissedWelcome,
  showNewProjectNotice: !dismissedNewProject
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dismissWelcome,
      dismissNewProject
    },
    dispatch
  )

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mapQueryToProps, {
    options: {
      fetchPolicy: 'network-only'
    }
  })
)(Home)
