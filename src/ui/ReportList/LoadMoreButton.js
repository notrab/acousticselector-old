import React from 'react';
import styled from 'styled-components';

import media from '../../utils/media';
import Button from '../Button';

const LoadButton = Button.extend`
  margin-left: 0;
  width: 100%;

  ${media.tablet`
    width: auto;
  `};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadMoreButton = ({loading, onClick}) =>
  <Wrapper>
    <LoadButton onClick={onClick}>Show more reports</LoadButton>
  </Wrapper>;

export default LoadMoreButton;
