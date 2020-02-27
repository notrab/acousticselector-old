import React from 'react';
import styled from 'styled-components';

import Spinner from 'react-spinkit';

const Container = styled.div`
  background-color: #fff;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  overflow-y: hidden;
  display: flex;
`;

const Message = styled.div`
  margin: auto;
  text-align: center;

  > p {
    color: ${({theme}) => theme.grey};
  }
`;

const Icon = styled(Spinner)`
  margin-bottom: 2rem;

  &.sk-spinner {
    color: #E3623A;
  }
`;

const Loading = () =>
  <Container>
    <Message>
      <Icon fadeIn="quarter" name="line-scale" />
    </Message>
  </Container>;

export default Loading;
