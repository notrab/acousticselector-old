import {injectGlobal} from 'styled-components'

import {bodyFont, headerFont} from './fonts'
import {orange, grey, lightBlue} from './colors'

// eslint-disable-next-line
injectGlobal`
  body {
    background-color: ${lightBlue};
    font-size: 1.6rem;
    line-height: 1.6;
    font-family: ${bodyFont};
    font-weight: 300;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    color: ${grey};
    -webkit-font-smoothing: subpixel-antialiased;

    &.has-modal {
      overflow: hidden;
    }
  }

  h1, h2, h3, h4 {
    font-family: ${headerFont}
  }

  a,
  button {
    color: ${orange};
    transition: color 75ms ease-in;
  }

  .modal-slide-in-enter {
    right: -500px;
  }

  .modal-slide-in-enter.modal-slide-in-enter-active {
    transition: all 400ms ease-in;
    right: 0;
    transition-timing-function: cubic-bezier(0.31, 0.89, 0.32, 1);
  }

  .modal-slide-in-leave {
    right: 0;
  }

  .modal-slide-in-leave.modal-slide-in-leave-active {
    right: -500px;
    transition: all 400ms ease-out;
  }

  .user-actions-fade-in-enter {
    opacity: 0;
  }

  .user-actions-fade-in-enter.user-actions-fade-in-enter-active {
    transition: all 400ms ease-in;
    opacity: 1;
  }

  .user-actions-fade-in-leave {
    opacity: 1;
  }

  .user-actions-fade-in-leave.user-actions-fade-in-leave-active {
    opacity: 0;
    transition: all 400ms ease-out;
  }

  .status-enter {
    transform: translateY(100%);
  }

  .status-enter.status-enter-active {
    transform: translateY(0%);
    transition: transform 400ms ease-in-out;
  }

  .status-leave {
    transform: translateY(100%);
  }
  
  .status-leave.status-leave-active {
    transform: translateY(100%);
    transition: transform 400ms ease-in-out;
  }
`
