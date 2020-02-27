import styled from 'styled-components';

export default styled.a`
  color: ${({theme}) => theme.grey};
  font-weight: 500;
  margin: 0;
  display: block;
  line-height: 1.5;
  text-decoration: none;

  &:hover {
    color: ${({theme}) => theme.orange};
  }
`;
