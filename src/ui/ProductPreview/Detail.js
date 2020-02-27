import styled from 'styled-components';

import media from '../../utils/media';

export default styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;

  ${media.tablet`
    flex: 1;
    align-self: center;
    align-items: center;
    padding: 1.5rem 1.5rem 1.5rem 0;
  `};
`;
