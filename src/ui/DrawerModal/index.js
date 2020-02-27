import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Octicon from 'react-octicon';

import Overlay from './Overlay';
import Container from './Container';
import CloseButton from './CloseButton';

export default class extends Component {
  componentDidMount() {
    document.body.addEventListener('click', this.handleDocumentClick);
    document.body.className = 'has-modal';
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleDocumentClick);
    document.body.className = '';
  }

  handleDocumentClick = async e => {
    const container = findDOMNode(this);

    if (container.contains(e.target) && container !== e.target) {
      return;
    }

    await this.props.onClose();
  };

  render() {
    return (
      <Overlay ref="container" tabIndex={0}>
        <Container>
          <CloseButton onClick={() => this.props.onClose()}>
            <Octicon mega name="x" />
            <span>Close</span>
          </CloseButton>

          {this.props.children}
        </Container>
      </Overlay>
    );
  }
}
