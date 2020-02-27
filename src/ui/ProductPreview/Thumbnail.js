import styled from 'styled-components';

import media from '../../utils/media';

export default styled.div`
  flex: 0;

  img {
    display: block;
    width: 100%;
  }

  ${media.tablet`
    padding: 1rem;

    img {
      width: 10rem;
    }
  `};
`;
