import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import {monoFont} from '../../utils/fonts'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 3rem;

  &:first-child {
    border-right: 0.1rem solid ${({theme}) => theme.lightBlue};
  }
`

// const Input = styled.input`
//   border: 0;
//   width: 100%;
//   text-align: center;
//   color: ${({theme}) => theme.orange};
//   font-family: ${monoFont};
//   font-size: 2.4rem;
//   font-weight: 400;
//
//   ${'' /* &:hover,
//   &:focus {
//     background-color: ${({theme}) => theme.lightBlue};
//     outline: 0;
//   } */};
// `;

const Rating = styled.span`
  text-align: center;
  color: ${({theme}) => theme.orange};
  font-family: ${monoFont};
  font-size: 2.4rem;
  font-weight: 400;
`

const StepButton = styled.button`
  background-color: ${({theme}) => theme.blue};
  border-radius: 100%;
  border: 0;
  color: ${({theme}) => theme.darkBlue};
  cursor: pointer;
  text-align: center;
  font-weight: 400;
  line-height: 3rem;
  width: 3rem;
  height: 3rem;
  margin: 1rem 0;
  padding: 0;
  outline: 0;

  &:hover {
    background-color: ${({theme}) => theme.darkBlue};
    color: #fff;
  }

  &:disabled {
    background-color: ${({theme}) => theme.lightBlue};
    color: ${({theme}) => theme.darkBlue};
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Label = styled.span`
  color: ${({theme}) => theme.darkBlue};
  display: block;
  font-weight: 500;
  font-size: 1.3rem;
  text-transform: uppercase;
  transition: 0.25s ease-in-out;
`

export default ({
  dbrw_gte,
  dbrw_lte,
  incrementDbrwGte,
  decrementDbrwGte,
  incrementDbrwLte,
  decrementDbrwLte,
  setDbrwGte,
  setDbrwLte,
  lowestDbrw,
  highestDbrw
}) => (
  <Wrapper>
    <Column>
      <Label>Min</Label>

      <StepButton disabled={dbrw_gte >= highestDbrw} onClick={incrementDbrwGte}>
        <Octicon name="chevron-up" />
      </StepButton>
      <Rating>{dbrw_gte}</Rating>
      {/* <Input
        type="text"
        disabled
        min={lowestDbrw}
        max={highestDbrw}
        onChange={e => setDbrwGte(parseInt(e.target.value, 10))}
        value={dbrw_gte}
      /> */}
      <StepButton disabled={dbrw_gte <= lowestDbrw} onClick={decrementDbrwGte}>
        <Octicon name="chevron-down" />
      </StepButton>
    </Column>

    <Column>
      <Label>Max</Label>
      <StepButton disabled={dbrw_lte >= highestDbrw} onClick={incrementDbrwLte}>
        <Octicon name="chevron-up" />
      </StepButton>
      <Rating>{dbrw_lte}</Rating>
      {/* <Input
        type="text"
        disabled
        min={lowestDbrw}
        max={highestDbrw}
        onChange={e => setDbrwLte(parseInt(e.target.value, 10))}
        value={dbrw_lte}
      /> */}
      <StepButton disabled={dbrw_lte <= lowestDbrw} onClick={decrementDbrwLte}>
        <Octicon name="chevron-down" />
      </StepButton>
    </Column>
  </Wrapper>
)
