import styled from 'styled-components';

import media from '../../utils/media';

export default styled.div`
  margin-bottom: 3rem;
  text-align: center;

  h1 {
    color: ${({theme}) => theme.orange};
    font-size: 2.2rem;
    font-weight: 500;
    margin: 0;

    ${media.tablet`
      font-size: 3.2rem;
    `};
  }
`;
