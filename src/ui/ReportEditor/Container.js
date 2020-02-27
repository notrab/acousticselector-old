import styled from 'styled-components';

import media from '../../utils/media';

const Container = styled.div`
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  overflow-y: scroll;

  ${media.tablet`
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    border-left: 0.1rem solid ${({theme}) => theme.blue};
    position: fixed;
    width: 600px;
    left: auto;
  `};
`;

export default Container;
