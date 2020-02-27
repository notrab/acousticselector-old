import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import Wrapper from './Wrapper';
import Toggle from './Toggle';
import List from './List';
import Padding from './Padding';

export default class Dropdown extends Component {
  state = {
    isOpen: this.props.open || false
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleDocumentClick);
  }

  handleToggleClick = e => {
    e.preventDefault();

    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  handleDocumentClick = e => {
    const container = findDOMNode(this);

    if (container.contains(e.target) && container !== e.target) {
      return;
    }

    this.setState(prevState => ({
      isOpen: false
    }));
  };

  render() {
    const {isOpen} = this.state;
    const {children, ...rest} = this.props;

    return (
      <Wrapper ref="container" tabIndex={0} {...rest}>
        <Toggle onClick={this.handleToggleClick}>
          {children[0]}
        </Toggle>

        <List open={isOpen}>
          <Padding>
            {children[1]}
          </Padding>
        </List>
      </Wrapper>
    );
  }
}
