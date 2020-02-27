import styled from 'styled-components';

import {FluidContainer, FlexContainer} from '../Layout';
import media from '../../utils/media';

export default styled.div`
  background-color: #fff;
  margin-bottom: 1rem;
  position: relative;
  z-index: 149;

  ${media.tablet`
    border-bottom: 0.1rem solid ${({theme}) => theme.blue};
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.05);
  `};
`;

export const Fluid = styled(FluidContainer)`
  padding-left: 0;
  padding-right: 0;
`;

export const InsideContainer = styled(FlexContainer)`
  flex-direction: column;
  ${'' /* border-right: 0.1rem solid ${({theme}) => theme.blue}; */}

  ${media.tablet`
    flex-direction: row;
  `};
`;

export const Filters = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
  `};
`;

export const Tools = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    width: 25%;
    flex-direction: row;
  `};
`;
