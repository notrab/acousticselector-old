import React, {Component} from 'react';
import styled from 'styled-components';

import media from '../../utils/media';

const Opener = styled.div`
  background-color: ${({theme}) => theme.darkBlue};
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;

  ${media.tablet`
    display: none;
  `};
`;

const Collapsed = styled.div`
  display: ${({open}) => (open ? 'block' : 'none')};
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 4.5rem;

  ${media.tablet`
    display: block;
    padding-bottom: 0;
    height: auto;
    overflow-y: visible;
  `};
`;

export default class extends Component {
  state = {
    open: false
  };

  render() {
    const {open} = this.state;
    const {children} = this.props;

    // Refactor to use recompose

    return (
      <div>
        <Opener onClick={() => this.setState({open: !this.state.open})}>
          {open ? 'Hide filter' : 'Update filter'}
        </Opener>
        <Collapsed open={open}>{children}</Collapsed>
      </div>
    );
  }
}
