import styled, {css} from 'styled-components'

import media from '../../utils/media'

export const BadgeRow = styled.div`
  display: block;

  ${media.tablet`
    margin-top: 1rem;
  `};
`

export default styled.span`
  background-color: ${({theme}) => theme.blue};
  border: 0.2rem solid transparent;
  color: ${({theme}) => theme.darkBlue};
  display: inline-block;
  padding: 0.1rem 1.5rem;
  margin-right: 0.5rem;

  ${p =>
    p.pill &&
    css`
      padding-left: 1rem;
      padding-right: 1rem;
      border-radius: 0.4rem;
    `};

  ${p =>
    p.outline &&
    css`
      background-color: transparent;
      border: 0.2rem solid ${({theme}) => theme.blue};
    `};

  ${p =>
    p.empty &&
    css`
      background-color: transparent;
      border: 0;
      color: ${({theme}) => theme.grey};
    `};

  ${p =>
    p.dashed &&
    css`
      background-color: transparent;
      border: 0.2rem dashed ${({theme}) => theme.blue};
    `};
`
