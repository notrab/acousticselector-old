import styled from 'styled-components';

import media from '../../utils/media';

export default styled.div`
  margin-bottom: 1.5rem;
  background: white;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.blue};
  padding-right: 5px;
  position: relative;
  min-height: 30px;
  padding: 1.5rem;
  text-align: center;

  ${media.tablet`
    display: flex;
    width: 100%;
    margin-bottom: 1.5rem;
    min-height: 75px;
    padding: 0 1.5rem 0 0;
    text-align: left;
  `};

  a {
    color: ${props => props.theme.darkBlue};
  }

  p {
    margin: 0;
    color: ${props => props.theme.grey};
  }
`;
