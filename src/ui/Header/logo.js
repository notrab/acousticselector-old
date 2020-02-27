import styled from 'styled-components';
import {Link} from 'react-router-dom';

import FullLogo from './logo.svg';

export default styled(Link)`
  background-image: url(${FullLogo});
  background-size: 135px 45px;
  width: 135px;
  height: 45px;
`;
