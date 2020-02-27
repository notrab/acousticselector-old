import styled from 'styled-components';

import media from '../../utils/media';
import {fadeIn} from '../animations';

export default styled.article`
  animation: ${fadeIn} 0.15s ease-in-out;
  background-color: #fff;
  border: 0.1rem solid ${({theme}) => theme.blue};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${media.tablet`
    flex-direction: row;
    margin-bottom: 1.5rem;
    position: relative;
  `};
`;
