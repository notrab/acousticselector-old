import React from 'react';
import styled from 'styled-components';

import {monoFont} from '../../utils/fonts';
import media from '../../utils/media';

import Actions from './Actions';

const Wrapper = styled.div`
  align-items: center;
  align-content: center;
  display: flex;
  border-bottom: 1px solid ${({theme}) => theme.blue};
  position: relative;
  padding: 1.5rem 2rem;

  ${media.tablet`
    border-bottom-width: 0;
    justify-content: center;
    width: 15rem;
    position: static;
  `};
`;

const Number = styled.div`
  color: ${({theme}) => theme.grey};
  line-height: 1.2;
  flex: 1;
  display: flex;
  align-items: center;

  > strong {
    color: ${({theme}) => theme.orange};
    font-family: ${monoFont};
    font-size: 2.4rem;
    font-weight: 400;
    margin-right: 0.5rem;
  }

  ${media.tablet`
    display: block;
    text-align: center;
    margin: auto;

    > strong {
      display: block;
      font-size: 3.6rem;
      margin-right: 0;
    }
  `};
`;

const Rating = ({dbrw, id, file, isAssessment, userActionsVisible, user, likes}) => (
  <Wrapper>
    <Number>
      <strong>{dbrw}</strong>
      <span>dBRw</span>
    </Number>
    <Actions
      id={id}
      file={file}
      isAssessment={isAssessment}
      userActionsVisible={userActionsVisible}
      user={user}
      likes={likes}
    />
  </Wrapper>
);

export default Rating;
