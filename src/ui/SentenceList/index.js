import React from 'react';
import styled from 'styled-components';

import media from '../../utils/media';
import {toSentence} from '../../utils/helpers';

export const Dl = styled.dl`margin: 0 0 1.5rem;`;

const Row = styled.span`display: block;`;

const Dt = styled.dt`
  color: ${({theme}) => theme.darkBlue};
  margin: 0;

  ${media.tablet`
    display: inline-block;
  `};
`;

const Dd = styled.dd`
  color: ${({theme}) => theme.grey};
  margin-left: 0;

  ${media.tablet`
    display: inline-block;
    margin-left: 0.5rem;
  `};
`;

const SentenceList = ({title, items}) => {
  const ddItems = items.map(i => {
    if (!i['product']) return null;

    return i['product']['name'];
  });

  return (
    <Row>
      <Dt>
        {title}
      </Dt>
      <Dd>
        {toSentence(ddItems)}
      </Dd>
    </Row>
  );
};

export default SentenceList;
