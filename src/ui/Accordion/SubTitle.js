import styled, {css} from 'styled-components';

export default styled.div`
  padding: 0 15px;

  ${props =>
    props.open &&
    css`
      border-bottom: 1px solid #e1e9ed;
  `};

  @media screen and (min-width: 1160px) {
    padding: 0 30px 0 30px;
  }
`;
