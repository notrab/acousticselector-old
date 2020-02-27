import styled from 'styled-components';

import media from '../../utils/media';

export default styled.header`
  background-color: #fff;
  border-bottom: 0.1rem solid ${({theme}) => theme.blue};
  padding: 1rem 0;
  color: ${({theme}) => theme.darkBlue};
  flex: 1;
  max-height: 8.6rem;
  position: relative;
  z-index: 150;

  ${media.tablet`
    padding-top: 2rem;
    padding-bottom: 2rem;
  `};
`;
