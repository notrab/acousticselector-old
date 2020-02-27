import React, {Component} from 'react';
import styled, {css} from 'styled-components';

const Row = styled.li`
  align-items: center;
  color: ${({active, theme}) => (active ? theme.orange : theme.grey)};
  display: flex;
  padding: 0.5rem 1.5rem;
  justify-content: space-between;

  &:hover {
    background-color: ${({theme}) => theme.lightBlue};
    color: ${({theme}) => theme.darkBlue};
    cursor: pointer;
  }

  .react-toggle {
    margin-right: 0.5rem;
  }

  ${props =>
    props.active &&
    css`
      &:after {
        /*Add another block-level blank space*/
        content: '';
        display: block;

        /*Make it a small rectangle so the border will create an L-shape*/
        width: 6px;
        height: 12px;

        /*Add a white border on the bottom and left, creating that 'L' */
        border: solid ${({theme: {orange}}) => orange};
        border-width: 0 2px 2px 0;

        /*Rotate the L 45 degrees to turn it into a checkmark*/
        transform: rotate(45deg);
      }
    `};
`;

export const ActionFooter = styled.div`padding: 0.5rem 1.5rem;`;

export default class FilterRow extends Component {
  render() {
    const {handleClick, children, ...rest} = this.props;

    return (
      <Row onClick={handleClick} {...rest}>
        {children}
      </Row>
    );
  }
}
