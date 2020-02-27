import styled, {css} from 'styled-components'

import media from '../../utils/media'
import Logo from '../Header/circle-logo.svg'

export default styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid ${({theme}) => theme.blue};
  padding: 2.5rem;

  ${media.tablet`
    padding: 5rem;
  `};

  p {
    color: ${({theme}) => theme.darkBlue};
    margin: 1rem 0 3rem;
  }

  ul {
    color: ${({theme}) => theme.darkBlue};
    margin: 1.5rem 0 1.5rem 6rem;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 3rem;
      position: relative;

      &::before {
        position: absolute;
        left: -4rem;
        top: 50%;
        margin-top: -1rem;
        content: '';
        width: 2rem;
        height: 2rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url(${Logo});
        background-position: left;
      }
    }
  }

  ${props => props.center && css`text-align: center;`};
`
