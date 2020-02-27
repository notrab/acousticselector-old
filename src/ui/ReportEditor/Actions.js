import React from 'react';
import styled from 'styled-components';
import Octicon from 'react-octicon';

import media from '../../utils/media';
import Button from '../Button';

const ActionsBar = styled.div`
  background-color: ${({theme}) => theme.lightBlue};
  border-bottom: 0.1rem solid ${({theme}) => theme.blue};
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  width: 100%;

  ${media.tablet`
    background-color: transparent;
  `};
`;

export default () =>
  <ActionsBar>
    <Button withIcon>
      <Octicon name="heart" /> <span>Like</span>
    </Button>

    <Button withIcon>
      <Octicon name="cloud-download" /> <span>Download</span>
    </Button>
  </ActionsBar>;
