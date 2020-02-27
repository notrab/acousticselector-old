import styled, {keyframes} from 'styled-components'

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

export default styled.div`
  background: #fff;
  border: 1px solid #e1e9ed;
  box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  min-width: 100px;
  margin: 10px 0 0 -80px;
  position: absolute;
  right: 0;
  display: none;
  animation: ${fadeInDown} 0.15s ease-in-out;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 200;

  &:before {
    position: absolute;
    right: 15px;
    top: -10px;
    width: 0;
    height: 0;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #e1e9ed;
    z-index: 15;
  }

  &:after {
    position: absolute;
    right: 15px;
    top: -9px;
    width: 0;
    height: 0;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    z-index: 16;
  }

  a {
    text-decoration: none;
  }
`
