import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import media from '../../utils/media'
import OptionList from './OptionList'
import FilterBox from './FilterBox'

const ToggleItem = styled.div`
  align-items: center;
  display: flex;
  padding: 1.5rem;
  background-color: #fff;
  position: relative;
  z-index: 105;
`

const Label = styled.span`flex: 1;`

const LabelInner = styled.span`
  color: ${({theme}) => theme.darkBlue};
  display: block;
  font-weight: 500;
  font-size: 1.3rem;
  text-transform: uppercase;
  transition: 0.25s ease-in-out;
`

const Placeholder = styled.span`
  background-color: ${({theme}) => theme.blue};
  border-radius: 0.4rem;
  height: 1.25rem;
  width: 3.5rem;
  display: inline-block;
`

const DefaultState = styled.span`
  margin-top: 0.5rem;

  ${media.tablet`
    display: none;
  `};

  ${media.desktop`
    display: block;
  `};
`

const Filter = ({
  loading,
  label,
  defaultState,
  open,
  toggleVisibility,
  children,
  ...rest
}) => (
  <FilterBox
    onClick={toggleVisibility}
    onMouseEnter={toggleVisibility}
    onMouseLeave={toggleVisibility}>
    <ToggleItem>
      <Label>
        <LabelInner open={open}>{label}</LabelInner>
        <DefaultState>{!loading && (defaultState || 'Any')}</DefaultState>
        {loading && <Placeholder />}
      </Label>

      {!loading && (
        <span>
          <Octicon name="chevron-up" />
        </span>
      )}
    </ToggleItem>

    <OptionList {...rest} open={open}>
      {children}
    </OptionList>
  </FilterBox>
)

const enhance = compose(
  withState('open', 'toggleVisibility', false),
  withHandlers({
    toggleVisibility: props => event => props.toggleVisibility(!props.open)
  })
)

export default enhance(Filter)
