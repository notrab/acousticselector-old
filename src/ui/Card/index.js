// @flow

import React from 'react'
import {compose, withState, withHandlers} from 'recompose'

import Wrapper from './Wrapper'
import Rating from './Rating'
import Details from './Details'

type fireRating = 'FD30' | 'FD60' | 'FD90'

export type Props = {
  id: string,
  dbrw: number,
  notes: ?string,
  file: ?{
    url: ?string
  },
  core: {
    id: string,
    name: string,
    thickness: string,
    fireRating: fireRating,
    manufacturer: {
      id: string,
      name: string
    }
  },
  doorType: string,
  isAssessment: boolean,
  testId: number,
  glass: ?string,
  focused: boolean,
  user: {},
  showAdditionalActions: () => void,
  hideAdditionalActions: () => void,
  likes: {
    count: number
  }
}

const ReportCard = ({
  focused,
  showAdditionalActions,
  hideAdditionalActions,
  dbrw,
  user,
  file,
  likes,
  ...props
}: Props) => (
  <Wrapper
    onMouseEnter={showAdditionalActions}
    onMouseLeave={hideAdditionalActions}>
    <Rating
      userActionsVisible={focused}
      id={props.id}
      file={file}
      isAssessment={props.isAssessment}
      dbrw={dbrw}
      user={user}
      likes={likes}
    />
    <Details {...props} testIdVisible={focused} />
  </Wrapper>
)

const enhance = compose(
  withState('focused', 'setFocus', false),
  withHandlers({
    showAdditionalActions: props => event => props.setFocus(true),
    hideAdditionalActions: props => event => props.setFocus(false)
  })
)

export default enhance(ReportCard)
