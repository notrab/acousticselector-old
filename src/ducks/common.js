// @flow

export const DISMISS_WELCOME = 'common/DISMISS_WELCOME'
export const DISMISS_NEW_PROJECT = 'common/DISMISS_NEW_PROJECT'
export const HIDE_LOGIN_TIP = 'common/HIDE_LOGIN_TIP'
export const HIDE_CLEAR_FILTER_TIP = 'common/HIDE_CLEAR_FILTER_TIP'

type State = {
  dismissedWelcome: ?boolean,
  dismissedNewProject: ?boolean,
  showClearFilterTip: ?boolean,
  showLoginTip: ?boolean
}

export const initialState = {
  dismissedWelcome: false,
  dismissedNewProject: false,
  showClearFilterTip: true,
  showLoginTip: true
}

export default (state: State = initialState, action: Object): State => {
  switch (action.type) {
    case DISMISS_WELCOME:
      return {
        ...state,
        dismissedWelcome: true
      }

    case DISMISS_NEW_PROJECT:
      return {
        ...state,
        dismissedNewProject: true
      }

    case HIDE_LOGIN_TIP:
      return {
        ...state,
        showLoginTip: false
      }

    case HIDE_CLEAR_FILTER_TIP:
      return {
        ...state,
        showClearFilterTip: false
      }

    default:
      return state
  }
}

export const dismissWelcome = () => ({
  type: DISMISS_WELCOME
})

export const dismissNewProject = () => ({
  type: DISMISS_NEW_PROJECT
})

export const hideLoginTip = () => ({
  type: HIDE_LOGIN_TIP
})

export const hideClearFilterTip = () => ({
  type: HIDE_CLEAR_FILTER_TIP
})
