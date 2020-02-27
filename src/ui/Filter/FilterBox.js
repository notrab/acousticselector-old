import styled from 'styled-components';

import media from '../../utils/media';

export default styled.div`
  position: relative;
  display: inline-block;
  flex: 1;
  width: 100%;
  border-bottom: 0.1rem solid ${({theme}) => theme.blue};

  ${media.tablet`
    border-bottom: 0;
  `};

  ${media.desktop`
    border-left: 0.1rem solid ${({theme}) => theme.blue};

    &:last-child {
      border-right: 0.1rem solid ${({theme}) => theme.blue};
    }
  `};

  > div:first-child span.octicon {
    display: none;

    ${media.tablet`
      display: block;
    `};
  }

  &:hover,
  &:focus {
    > div:first-child span.octicon {
      transform: rotate(180deg);
    }

    > div:last-child {
      display: block;
    }
  }
`;
