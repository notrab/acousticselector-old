import styled from 'styled-components'

export default styled.div`
  background-color: #fff;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.05);
  border-top: 0.1rem solid ${({theme}) => theme.blue};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 0;
  ${'' /* transition: 0.25s ease-in-out; */};
`
