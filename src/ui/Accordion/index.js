import React from 'react';
import {compose, withState, withHandlers} from 'recompose';
import Octicon from 'react-octicon';

import Wrapper from './Wrapper';
import Title from './Title';
import SubTitle from './SubTitle';
import Body from './Body';

const Accordion = ({open, toggleVisibility, title, children}) =>
  <Wrapper open={open}>
    <Title onClick={toggleVisibility} open={open}>
      <span>
        {title}
      </span>
      {open ? <Octicon name="chevron-up" /> : <Octicon name="chevron-down" />}
    </Title>

    {!open && children.length > 1
      ? <SubTitle open={open}>
          {children[0]}
        </SubTitle>
      : null}

    {open &&
      <Body>
        {children.length > 1 ? children[1] : children}
      </Body>}
  </Wrapper>;

const enhance = compose(
  withState('open', 'toggleVisibility', false),
  withHandlers({
    toggleVisibility: props => event => props.toggleVisibility(!props.open)
  })
);

export default enhance(Accordion);
