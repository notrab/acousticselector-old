// @flow

import { RESET_FILTER } from './options'
export const INCREMENT_DBRW_GTE = 'filter/INCREMENT_DBRW_GTE'
export const DECREMENT_DBRW_GTE = 'filter/DECREMENT_DBRW_GTE'
export const INCREMENT_DBRW_LTE = 'filter/INCREMENT_DBRW_LTE'
export const DECREMENT_DBRW_LTE = 'filter/DECREMENT_DBRW_LTE'
export const SET_DBRW_GTE = 'filter/SET_DBRW_GTE'
export const SET_DBRW_LTE = 'filter/SET_DBRW_LTE'
export const ADD_THICKNESS_CHOICE = 'filter/ADD_THICKNESS_CHOICE'
export const REMOVE_THICKNESS_CHOICE = 'filter/REMOVE_THICKNESS_CHOICE'
export const ADD_DOOR_TYPE_CHOICE = 'filter/ADD_DOOR_TYPE_CHOICE'
export const REMOVE_DOOR_TYPE_CHOICE = 'filter/REMOVE_DOOR_TYPE_CHOICE'
export const ADD_MANUFACTURER_CHOICE = 'filter/ADD_MANUFACTURER_CHOICE'
export const REMOVE_MANUFACTURER_CHOICE = 'filter/REMOVE_MANUFACTURER_CHOICE'
export const TOGGLE_INCLUDE_ASSESSMENTS = 'filter/TOGGLE_INCLUDE_ASSESSMENTS'
export const SET_GLAZED_ONLY = 'filter/SET_GLAZED_ONLY'
export const SET_UNGLAZED_ONLY = 'filter/SET_UNGLAZED_ONLY'
export const CLEAR_FILTER = 'filter/CLEAR_FILTER'

type State = {
  isPublished: boolean,
  doorType_in: String[],
  thickness_in: String[],
  manufacturer_in: String[],
  includeAssessments: boolean,
  dbrw_gte: number,
  dbrw_lte: number,
  glazedOnly: boolean,
  unglazedOnly: boolean,
  dirty: boolean
}

export const initialState = {
  isPublished: true,
  doorType_in: [],
  thickness_in: [],
  manufacturer_in: [],
  includeAssessments: true,
  dbrw_gte: 27,
  dbrw_lte: 44,
  glazedOnly: false,
  unglazedOnly: false,
  dirty: false
}

export default (state: State = initialState, action: Object): State => {
  switch (action.type) {
    case INCREMENT_DBRW_GTE:
      return {
        ...state,
        dbrw_gte: state.dbrw_gte + 1,
        dirty: true
      }

    case DECREMENT_DBRW_GTE:
      return {
        ...state,
        dbrw_gte: state.dbrw_gte - 1,
        dirty: true
      }

    case INCREMENT_DBRW_LTE:
      return {
        ...state,
        dbrw_lte: state.dbrw_lte + 1,
        dirty: true
      }

    case DECREMENT_DBRW_LTE:
      return {
        ...state,
        dbrw_lte: state.dbrw_lte - 1,
        dirty: true
      }

    case SET_DBRW_GTE:
      return {
        ...state,
        dbrw_gte: action.payload.dbrw_gte,
        dirty: true
      }

    case SET_DBRW_LTE:
      return {
        ...state,
        dbrw_lte: action.payload.dbrw_lte,
        dirty: true
      }

    case ADD_THICKNESS_CHOICE:
      return {
        ...state,
        thickness_in: [...state.thickness_in, action.payload.thickness],
        dirty: true
      }

    case REMOVE_THICKNESS_CHOICE:
      return {
        ...state,
        thickness_in: state.thickness_in.filter(
          thickness => thickness !== action.payload.thickness
        ),
        dirty: true
      }

    case ADD_DOOR_TYPE_CHOICE:
      return {
        ...state,
        doorType_in: [...state.doorType_in, action.payload.doorType],
        dirty: true
      }

    case REMOVE_DOOR_TYPE_CHOICE:
      return {
        ...state,
        doorType_in: state.doorType_in.filter(
          doorType => doorType !== action.payload.doorType
        ),
        dirty: true
      }

    case ADD_MANUFACTURER_CHOICE:
      return {
        ...state,
        manufacturer_in: [
          ...state.manufacturer_in,
          action.payload.manufacturer
        ],
        dirty: true
      }

    case REMOVE_MANUFACTURER_CHOICE:
      return {
        ...state,
        manufacturer_in: state.manufacturer_in.filter(
          manufacturer => manufacturer !== action.payload.manufacturer
        ),
        dirty: true
      }

    case TOGGLE_INCLUDE_ASSESSMENTS:
      return {
        ...state,
        includeAssessments: !state.includeAssessments,
        dirty: true
      }

    case SET_GLAZED_ONLY:
      return {
        ...state,
        glazedOnly: !state.glazedOnly,
        dirty: true
      }

    case SET_UNGLAZED_ONLY:
      return {
        ...state,
        unglazedOnly: !state.unglazedOnly,
        dirty: true
      }

    case RESET_FILTER:
      return initialState

    case CLEAR_FILTER:
      return {
        ...state,
        [action.payload.filterType]: []
      }

    default:
      return state
  }
}

export const incrementDbrwGte = () => ({ type: INCREMENT_DBRW_GTE })

export const decrementDbrwGte = () => ({ type: DECREMENT_DBRW_GTE })

export const incrementDbrwLte = () => ({ type: INCREMENT_DBRW_LTE })

export const decrementDbrwLte = () => ({ type: DECREMENT_DBRW_LTE })

export const setDbrwGte = (dbrw_gte: number) => ({
  type: SET_DBRW_GTE,
  payload: {
    dbrw_gte
  }
})

export const setDbrwLte = (dbrw_lte: number) => ({
  type: SET_DBRW_LTE,
  payload: {
    dbrw_lte
  }
})

export const toggleIncludeAssessments = () => ({
  type: TOGGLE_INCLUDE_ASSESSMENTS
})

export const setGlazedOnly = () => ({ type: SET_GLAZED_ONLY })

export const setUnglazedOnly = () => ({ type: SET_UNGLAZED_ONLY })

export const setThicknessChoice = (thickness: String) => {
  return (dispatch: Function, getState: Function) => {
    const { filter: { thickness_in } } = getState()

    if (thickness_in.includes(thickness)) {
      dispatch({
        type: REMOVE_THICKNESS_CHOICE,
        payload: { thickness }
      })
    } else {
      dispatch({
        type: ADD_THICKNESS_CHOICE,
        payload: { thickness }
      })
    }
  }
}

export const setDoorTypeChoice = (doorType: String) => {
  return (dispatch: Function, getState: Function) => {
    const { filter: { doorType_in } } = getState()

    if (doorType_in.includes(doorType)) {
      dispatch({
        type: REMOVE_DOOR_TYPE_CHOICE,
        payload: { doorType }
      })
    } else {
      dispatch({
        type: ADD_DOOR_TYPE_CHOICE,
        payload: { doorType }
      })
    }
  }
}

export const setManufacturerChoice = (manufacturer: String) => {
  return (dispatch: Function, getState: Function) => {
    const { filter: { manufacturer_in } } = getState()

    if (manufacturer_in.includes(manufacturer)) {
      dispatch({
        type: REMOVE_MANUFACTURER_CHOICE,
        payload: { manufacturer }
      })
    } else {
      dispatch({
        type: ADD_MANUFACTURER_CHOICE,
        payload: { manufacturer }
      })
    }
  }
}

export const clearFilter = (filterType: String) => ({
  type: CLEAR_FILTER,
  payload: { filterType }
})
