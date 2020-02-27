import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Container} from '../Layout'
import Button from '../Button'
import Wrapper from './Wrapper'
import Counter from './Counter'
import {resetFilter} from '../../ducks/options'
import {hideClearFilterTip} from '../../ducks/common'

import Tether from '../Tether'

const FilterStatusBar = ({
  resetFilter,
  showClearFilterTip,
  hideClearFilterTip,
  count
}) => (
  <Wrapper>
    <Container>
      <Tether
        offsetY="-50"
        dismissAction={hideClearFilterTip}
        title="Start again"
        description="Easily clear the filter with one click"
        visible={showClearFilterTip}>
        <Button onClick={resetFilter}>Clear filter</Button>
      </Tether>

      <Counter>
        <span>{count}</span> matching reports
      </Counter>
    </Container>
  </Wrapper>
)

const mapStateToProps = ({common: {showClearFilterTip}}) => ({
  showClearFilterTip
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetFilter,
      hideClearFilterTip
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(FilterStatusBar)
