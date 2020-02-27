import styled from 'styled-components'

import media from '../../utils/media'

export default styled.button.attrs({
  'aria-label': 'Close'
})`
  background-color: ${({theme}) => theme.darkBlue};
  padding: 1rem 2rem;
  width: 100%;
  outline: 0;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;

  span:first-child {
    display: none;
  }

  span:last-child {
    text-transform: uppercase;
  }

  ${media.tablet`
    background-color: transparent;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: -61px;

    span:first-child {
      display: block;
    }

    span:last-child {
      display: none;
    }
  `};
`
