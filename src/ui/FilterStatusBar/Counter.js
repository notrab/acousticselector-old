import styled from 'styled-components'

export default styled.span`
  color: ${({theme}) => theme.darkBlue};
  margin-left: 1.5rem;

  > span {
    font-weight: 400;
    color: ${({theme}) => theme.orange};
  }
`
