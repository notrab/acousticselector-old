// @flow

import React from 'react'
import styled from 'styled-components'

import media from '../../utils/media'

import Title from './Title'
import Badge, {BadgeRow} from '../Badge'
import SealConfiguration from './SealConfiguration'
import Tooltip from '../Tooltip'

const Wrapper = styled.div`
  align-self: center;
  flex: 1;
  padding: 2rem;
  width: 100%;

  ${media.tablet`
    padding: 2.5rem 2.5rem 2.5rem 0;
  `};
`

const Details = props => {
  const title = `${props.core.thickness} ${props.core.manufacturer.name} ${props
    .core.name || ''}`

  return (
    <Wrapper>
      <Title id={props.id} title={title} notes={props.notes} />

      <SealConfiguration
        headables={props.headables}
        meetingables={props.meetingables}
        thresholdables={props.thresholdables}
        letterplateables={props.letterplateables}
        glass={props.glass}
      />

      <BadgeRow>
        {/* <Tooltip placement="top" overlay="Core fire rating">
          <Badge pill>
            {props.core.fireRating}
          </Badge>
        </Tooltip> */}

        <Tooltip placement="top" overlay="Doorset type">
          <Badge pill>{props.doorType}</Badge>
        </Tooltip>

        {props.isAssessment && (
          <Badge pill dashed>
            Assessed only
          </Badge>
        )}

        {props.testIdVisible &&
          props.testId && (
            <Badge pill empty>
              ID: #{props.testId}
            </Badge>
          )}
      </BadgeRow>
    </Wrapper>
  )
}

export default Details
