// @flow

import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import FastClick from 'react-fastclick-alt'
import { compose, gql, graphql } from 'react-apollo'
import ReactGA from 'react-ga'

import Header from '../Header'
import Footer from '../Footer'
import Home from '../Home'
import NotFound from '../NotFound'
import ReportPage from '../ReportPage'
import ReportCreator from '../ReportCreator'
import ReportViewer from '../ReportViewer'
import ReportEditor from '../ReportEditor'
import Register from '../Register'
import ProjectsPage from '../ProjectsPage'
import ProjectPage from '../ProjectPage'
import Login from '../Login'
import AboutUsPage from '../AboutUsPage'
import TestMethodsPage from '../TestMethodsPage'
import DisclaimerPage from '../DisclaimerPage'
import GetHelpPage from '../GetHelpPage'
import ContactUsPage from '../ContactUsPage'

import 'sanitize.css'
import '../../utils/global'

ReactGA.initialize('UA-10960673-1')
ReactGA.pageview(window.location.pathname)

class App extends Component {
  constructor(props) {
    super(props)

    this.sendPageChange(props.location.pathname, props.location.search)
  }

  previousLocation: string = this.props.location

  componenentWillUpdate(nextProps) {
    const { location } = this.props

    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search
    ) {
      this.sendPageChange(
        nextProps.location.pathname,
        nextProps.location.search
      )
    }
  }

  sendPageChange(pathname, search = '') {
    const page = pathname + search

    ReactGA.set({ page })
    ReactGA.pageview(page)
  }

  logout = async () => {
    await window.localStorage.removeItem('auth0IdToken')
    this.props.meData.refetch()
  }

  render() {
    const { location, meData } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )
    // const isModal = true

    return (
      <FastClick>
        <Header data={meData} logout={this.logout} />

        <ReactCSSTransitionGroup
          transitionName="modal-slide-in"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          {isModal ? (
            <Route path="/reports/:id" component={ReportViewer} />
          ) : null}
          {isModal ? (
            <Route path="/admin/edit/:id" component={ReportEditor} />
          ) : null}
          {isModal ? (
            <Route path="/admin/new" component={ReportCreator} />
          ) : null}

          {isModal ? <Route path="/projects" component={ProjectsPage} /> : null}
        </ReactCSSTransitionGroup>

        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/reports/:id" component={ReportPage} />
          <Route path="/projects/:id" component={ProjectPage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/about-us" component={AboutUsPage} />
          <Route path="/about-acoustic-testing" component={TestMethodsPage} />
          <Route path="/disclaimer" component={DisclaimerPage} />
          <Route path="/help" component={GetHelpPage} />
          <Route path="/contact-us" component={ContactUsPage} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </FastClick>
    )
  }
}

const UserQuery = gql`
  query {
    user {
      id
      name
      admin
    }
  }
`

export default compose(
  graphql(UserQuery, {
    name: 'meData',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(App))
