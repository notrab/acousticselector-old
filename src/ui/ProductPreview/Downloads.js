import styled from 'styled-components';

import media from '../../utils/media';

export default styled.div`
  display: none;

  ${media.tablet`
    flex: 1;
    align-self: center;
    text-align: right;
    display: block;
  `};
`;
