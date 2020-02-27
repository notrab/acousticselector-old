import styled from 'styled-components';

export default styled.span`
  color: ${props => (props.active ? '#303337' : '#a1abb3')};
  margin-bottom: 1px;
  padding: 4px 10px;
  display: block;

  &:hover {
    background-color: rgba(235, 100, 39, 0.1);
    color: #e3623a;
    border-radius: 0.4rem;
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
