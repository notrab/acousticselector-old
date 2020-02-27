import styled from 'styled-components';
import Spinner from 'react-spinkit';

import media from '../../utils/media';

export default styled(Spinner)`
  display: block;
  margin: 1rem auto;
  text-align: center;

  ${media.tablet`
    margin-top: 2rem;
    margin-bottom: 2rem;
  `};

  &.sk-spinner {
    color: #E3623A;
  }
`;
