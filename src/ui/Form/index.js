import styled, {css} from 'styled-components';

export const InputGroup = styled.div`
  margin-bottom: 1rem;

  ${props =>
    props.invalid &&
    css`
      input,
      .Select-control {
        border-color: red;
      }
    `};
`;

export const TextInput = styled.input.attrs({
  type: 'text'
})`
  background-color: #fff;
  border: 0.1rem solid ${({theme}) => theme.blue};
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;

  &:focus {
    outline: 0;
    border-color: ${({theme}) => theme.orange};
  }

  ${props => props.block && css`width: 100%;`};
`;

export const ErrorNotice = styled.span`color: red;`;
