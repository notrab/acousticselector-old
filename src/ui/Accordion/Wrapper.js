import styled, {css} from 'styled-components';

export default styled.div`
  border-bottom: 0.1rem solid ${({theme}) => theme.blue};

  ${p =>
    p.open &&
    css`
    background-color: ${({theme}) => theme.lightBlue};
    border-bottom: 0.1rem solid ${({theme}) => theme.blue};
    padding-top: 0;
    padding-bottom: 1rem;
  `};
`;
