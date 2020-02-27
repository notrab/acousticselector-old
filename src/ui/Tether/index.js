import React, {Component} from 'react';
import TetherComponent from 'react-tether';
import styled, {css} from 'styled-components';
import Octicon from 'react-octicon';

const Tooltip = styled.div`
  background-color: ${({theme}) => theme.orange};
  color: #fff;
  padding: 1.5rem;
  width: 30rem;
  border-radius: 0.4rem;

  &::before {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    content: ' ';
    position: absolute;
  }

  ${p =>
    p.top &&
    css`
      &::before {
        margin-bottom: 0;
        border-bottom: 10px solid ${({theme}) => theme.orange};
        top: -10px;
      }
    `};

  ${p =>
    p.right &&
    css`
      &::before {
        right: 10px;
      }
    `};

  ${p =>
    p.bottom &&
    css`
      &::before {
        margin-bottom: 0;
        border-top: 10px solid ${({theme}) => theme.orange};
        bottom: -10px;
      }
    `};

  h4 {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 400;
    margin: 0 0 0.5rem;
  }

  p {
    color: #fff;
    font-size: 1.5rem;
    margin: 0;
  }
`;

const DismissButton = styled.span`
  cursor: pointer;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.3rem;

  span {
    color: rgba(255, 255, 255, 0.75);
  }

  &:hover span {
    color: #fff;
  }
`;

class Tether extends Component {
  static defaultProps = {
    offsetX: 0,
    offsetY: 0,
    width: 30,
    side: 'bottom',
    horizontal: 'left',
    visible: false
  };

  render() {
    const bottom = this.props.side === 'bottom';
    const left = this.props.horizontal === 'left';

    const {title, description, dismissAction, visible} = this.props;

    return (
      <TetherComponent
        style={{zIndex: 1000}}
        targetOffset={`${this.props.offsetY}px ${this.props.offsetX}px`}
        attachment={`${bottom ? 'bottom' : 'top'} ${this.props.horizontal}`}
        targetAttachment={`${bottom ? 'bottom' : 'top'} ${this.props.horizontal}`}>
        {this.props.children}

        {visible && (
          <Tooltip bottom={bottom} top={!bottom} left={left} right={!left}>
            {dismissAction && (
              <DismissButton onClick={dismissAction}>
                <Octicon name="x" />
              </DismissButton>
            )}
            {title && <h4>{title}</h4>}
            {description && <p>{description}</p>}
          </Tooltip>
        )}
      </TetherComponent>
    );
  }
}

export default Tether;
