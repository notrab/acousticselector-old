// @flow

export const RESET_FILTER = 'options/RESET_FILTER'
export const SET_ORDER_BY = 'options/SET_ORDER_BY'
export const SAVE_FILTER = 'options/SAVE_FILTER'
export const RESTORE_FILTER = 'options/RESTORE_FILTER'

type State = {
  first: number,
  orderBy: String
}

export const initialState = {
  first: 25,
  orderBy: 'dbrw_DESC'
}

export default (state: State = initialState, action: Object): State => {
  switch (action.type) {
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload.orderBy
      }

    case RESTORE_FILTER:
      return {
        ...state,
        ...action.payload.state
      }

    case RESET_FILTER:
      return initialState

    default:
      return state
  }
}

export const resetFilter = () => ({ type: RESET_FILTER })

export const setOrderBy = (orderBy: String) => ({
  type: SET_ORDER_BY,
  payload: {
    orderBy
  }
})

export const restoreFilter = (state: Object) => ({
  type: RESTORE_FILTER,
  payload: {
    state
  }
})
