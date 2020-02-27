// @flow

import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import {Link} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import media from '../../utils/media'
import Button from '../Button'
// import LikeButton from '../LikeButton';
import AddToProjectButton from '../ProjectDropdown'
import Tooltip from '../Tooltip'

type Props = {
  userActionsVisible: ?boolean,
  id: string,
  url: string,
  isAssessment: boolean,
  file?: {
    url: string
  },
  user: {
    admin: boolean,
    projects: [],
    likes: []
  },
  _likesMeta: {
    count: number
  }
}

const Wrapper = styled.div`
  ${media.tablet`
    position: absolute;
    bottom: 2.5rem;
    right: 2.5rem;
  `};
`

const UserActions = styled.div`
  display: inline-block;

  ${media.tablet`
    display: ${props => (props.visible ? 'inline-block' : 'none')};
  `};
`

const Actions = ({
  userActionsVisible,
  id,
  file,
  isAssessment,
  user,
  likes
}: Props) => {
  const loggedIn = !!user
  const adminUser = !!(loggedIn && user.admin)
  const downloadTooltip = isAssessment
    ? 'Assessment illustration'
    : 'Test report PDF'
  const urlToReport = `https://acousticselector.com/reports/${id}`
  const copyToClipboardText = 'Copy link to report'

  return (
    <Wrapper>
      <ReactCSSTransitionGroup
        transitionName="user-actions-fade-in"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}>
        <UserActions visible={userActionsVisible}>
          {adminUser && (
            <Link
              key="adminEditBtn"
              to={{
                pathname: `/admin/edit/${id}`,
                state: {modal: true}
              }}>
              <Button withIcon>
                <Octicon name="pencil" />
              </Button>
            </Link>
          )}

          <Tooltip placement="top" overlay={copyToClipboardText}>
            <CopyToClipboard text={urlToReport}>
              <Button withIcon>
                <Octicon name="link" />
              </Button>
            </CopyToClipboard>
          </Tooltip>

          {id && (
            <Link
              key={id}
              to={{
                pathname: `/reports/${id}`,
                state: {modal: true}
              }}>
              <Button withIcon mobileOnly>
                <Octicon name="eye" /> <span>Details</span>
              </Button>
            </Link>
          )}

          {/* {loggedIn && <LikeButton reportId={id} user={user} likes={likes} />} */}
        </UserActions>
      </ReactCSSTransitionGroup>

      <AddToProjectButton reportId={id} />

      {file &&
        file.url && (
          <Tooltip placement="top" overlay={downloadTooltip}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              <Button withIcon>
                <Octicon name="cloud-download" /> <span>Download</span>
              </Button>
            </a>
          </Tooltip>
        )}
    </Wrapper>
  )
}

export default Actions
