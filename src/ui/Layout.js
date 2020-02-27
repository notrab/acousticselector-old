import styled, {css} from 'styled-components';

import media from '../utils/media';

export const Container = styled.div`
  max-width: 83rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 auto;

  ${p =>
    p.padded &&
    css`
    padding-top: 2.5rem;
    padding-bottom: 2rem;
  `};

  ${media.tablet`
    padding-left: 0;
    padding-right: 0;
  `};
`;

export const FluidContainer = styled(Container)`
  max-width: 123rem;
`;

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const FlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Layout = styled.div`display: flex;`;

export const Sidebar = styled.aside`
  background-color: #fff;
  border-right: 0.1rem solid ${({theme}) => theme.blue};
  padding: 2.5rem;
  flex: 0 0 300px;
  overflow: auto;
  padding-bottom: 6rem;
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow: auto;
`;
