import styled, {css} from 'styled-components'

import media from '../../utils/media'
import {bodyFont} from '../../utils/fonts'

export const ButtonGroup = styled.div`margin: 0.5rem 0;`

const Button = styled.button`
  background-color: #fff;
  border: 0.1rem solid ${({theme}) => theme.blue};
  border-radius: 0.4rem;
  box-shadow: 0 0.3rem 01rem rgba(0, 0, 0, 0.03);
  color: ${({theme}) => theme.darkBlue};
  font-family: ${bodyFont};
  font-size: 1.5rem;
  padding: 0.7rem 1rem;
  margin-left: 1rem;
  vertical-align: baseline;
  transition: color 75ms ease-in;

  &:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    color: ${({theme}) => theme.orange};
  }

  &:active,
  &:focus {
    outline: 0;
    border-color: ${({theme}) => theme.orange};
    color: ${({theme}) => theme.orange};
  }

  ${media.tablet`
    padding: 0.25rem 1rem;
    margin-left: 0.5rem;
  `};

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `};

  ${p =>
    p.big &&
    css`
      font-size: 1.6rem;
      padding: 1rem 1.5rem;

      ${media.tablet`
      font-size: 1.6rem;
      padding: 1rem 1.5rem;
      margin-left: 1rem;
    `};
    `};

  ${p =>
    p.block &&
    css`
      padding: 1rem 1.5rem;
      width: 100%;
      display: block;

      ${media.tablet`
        padding: 0.6rem 1.5rem;
        margin-left: 0;
      `};
    `};

  ${props =>
    props.withIcon &&
    css`
      span.octicon {
        color: inherit;
      }

      span:not(.octicon) {
        display: none;
      }

      ${media.tablet`
      span:not(.octicon) {
        display: inline-block;
        margin-left: 0.5rem;
      }
    `};
    `};

  ${props =>
    props.outline &&
    css`
      background-color: transparent;
      border: 0;
      padding: 0 0.5rem !important;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    `};

  ${props => props.center && css`margin: auto;`};

  ${props =>
    props.mobileOnly &&
    css`
      ${media.tablet`
      display: none;
    `};
    `};
`

export default Button

export const PrimaryButton = styled(Button)`
  color: ${({theme}) => theme.orange};
  font-weight: bold;
`
