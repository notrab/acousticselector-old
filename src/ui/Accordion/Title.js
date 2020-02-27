import styled from 'styled-components';

export default styled.div`
  padding: ${({open}) => (open ? '1.5rem 2rem' : '1.5rem 2rem')};
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #303337;

  span:not(.octicon) {
    flex: 1;
  }

  > svg {
    &:hover {
      color: inherit;
    }
  }

  &:hover {
    color: #e3623a;
  }

  @media screen and (min-width: 1160px) {
    padding: 2rem;
  }
`;
