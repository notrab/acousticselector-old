import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default styled(Link)`
  color: ${({theme}) => theme.darkBlue};
  text-decoration: none;
  margin-left: 3rem;

  &:hover {
    color: ${({theme}) => theme.orange};
  }
`
