// @flow

import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Octicon from 'react-octicon';

import media from '../../utils/media';
import Tooltip from '../Tooltip';

const Heading = styled.h1`
  color: ${({theme}) => theme.orange};
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0 0 0.5rem;

  > a {
    color: ${({theme}) => theme.orange};
    text-decoration: none;
  }

  ${media.tablet`
    font-size: 2.4rem;
    margin-bottom: 1rem;
  `};
`;

const NoteTooltip = styled.span`
  margin-left: 0.5rem;
  display: none;
  vertical-align: text-bottom;

  ${media.tablet`
    display: inline-block;
  `} > span.octicon {
    color: ${({theme}) => theme.grey};
  }
`;

type Props = {
  id: string,
  title: string,
  notes: ?string
};

const Title = ({id, title, notes}: Props) => (
  <Heading>
    <Link
      key={id}
      to={{
        pathname: `/reports/${id}`,
        state: {modal: true}
      }}>
      {title}
      {notes && (
        <NoteTooltip>
          <Tooltip placement="top" overlay={notes}>
            <Octicon name="info" />
          </Tooltip>
        </NoteTooltip>
      )}
    </Link>
  </Heading>
);

export default Title;
