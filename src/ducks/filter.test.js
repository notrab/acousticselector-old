import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FilterReducer, {
  INCREMENT_DBRW_GTE,
  DECREMENT_DBRW_GTE,
  INCREMENT_DBRW_LTE,
  DECREMENT_DBRW_LTE,
  SET_DBRW_GTE,
  SET_DBRW_LTE,
  ADD_THICKNESS_CHOICE,
  REMOVE_THICKNESS_CHOICE,
  ADD_DOOR_TYPE_CHOICE,
  REMOVE_DOOR_TYPE_CHOICE,
  ADD_MANUFACTURER_CHOICE,
  REMOVE_MANUFACTURER_CHOICE,
  TOGGLE_INCLUDE_ASSESSMENTS,
  SET_GLAZED_ONLY,
  SET_UNGLAZED_ONLY,
  CLEAR_FILTER,
  initialState,
  incrementDbrwGte,
  decrementDbrwGte,
  incrementDbrwLte,
  decrementDbrwLte,
  setDbrwGte,
  setDbrwLte,
  setThicknessChoice,
  setDoorTypeChoice,
  setManufacturerChoice,
  toggleIncludeAssessments,
  setGlazedOnly,
  setUnglazedOnly,
  clearFilter
} from './filter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('FilterReducer', () => {
  it('returns the initial state', () => {
    expect(FilterReducer(undefined, {})).toEqual(initialState);
  });

  it('it dispatches the increment dbrw gte action', () => {
    const expectedActions = [
      {
        type: INCREMENT_DBRW_GTE
      }
    ];

    const store = mockStore();

    store.dispatch(incrementDbrwGte());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches the decrement dbrw gte action', () => {
    const expectedActions = [
      {
        type: DECREMENT_DBRW_GTE
      }
    ];

    const store = mockStore();

    store.dispatch(decrementDbrwGte());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it increments the DBRW GTE value', () => {
    expect(FilterReducer({...initialState, dbrw_gte: 1}, incrementDbrwGte())).toEqual({
      ...initialState,
      dbrw_gte: 2,
      dirty: true
    });
  });

  it('it decrements the DBRW GTE value', () => {
    expect(FilterReducer({...initialState, dbrw_gte: 1}, decrementDbrwGte())).toEqual({
      ...initialState,
      dbrw_gte: 0,
      dirty: true
    });
  });

  it('it dispatches the increment dbrw lte action', () => {
    const expectedActions = [
      {
        type: INCREMENT_DBRW_LTE
      }
    ];

    const store = mockStore();

    store.dispatch(incrementDbrwLte());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches the decrement dbrw lte action', () => {
    const expectedActions = [
      {
        type: DECREMENT_DBRW_LTE
      }
    ];

    const store = mockStore();

    store.dispatch(decrementDbrwLte());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it increments the DBRW LTE value', () => {
    expect(FilterReducer({...initialState, dbrw_lte: 1}, incrementDbrwLte())).toEqual({
      ...initialState,
      dbrw_lte: 2,
      dirty: true
    });
  });

  it('it decrements the DBRW LTE value', () => {
    expect(FilterReducer({...initialState, dbrw_lte: 1}, decrementDbrwLte())).toEqual({
      ...initialState,
      dbrw_lte: 0,
      dirty: true
    });
  });

  it('it dispatches add thickness choice', () => {
    const expectedActions = [
      {
        type: ADD_THICKNESS_CHOICE,
        payload: {thickness: '44mm'}
      }
    ];

    const store = mockStore({filter: {thickness_in: []}});

    store.dispatch(setThicknessChoice('44mm'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches remove thickness choice', () => {
    const expectedActions = [
      {
        type: REMOVE_THICKNESS_CHOICE,
        payload: {thickness: '44mm'}
      }
    ];

    const store = mockStore({filter: {thickness_in: ['44mm', '55mm']}});

    store.dispatch(setThicknessChoice('44mm'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches add door type choice', () => {
    const expectedActions = [
      {
        type: ADD_DOOR_TYPE_CHOICE,
        payload: {doorType: 'Single'}
      }
    ];

    const store = mockStore({filter: {doorType_in: []}});

    store.dispatch(setDoorTypeChoice('Single'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches remove door type choice', () => {
    const expectedActions = [
      {
        type: REMOVE_DOOR_TYPE_CHOICE,
        payload: {doorType: 'Double'}
      }
    ];

    const store = mockStore({filter: {doorType_in: ['Single', 'Double']}});

    store.dispatch(setDoorTypeChoice('Double'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches add manufacturer choice', () => {
    const expectedActions = [
      {
        type: ADD_MANUFACTURER_CHOICE,
        payload: {manufacturer: 'Moralt'}
      }
    ];

    const store = mockStore({filter: {manufacturer_in: []}});

    store.dispatch(setManufacturerChoice('Moralt'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches remove manufacturer choice', () => {
    const expectedActions = [
      {
        type: REMOVE_MANUFACTURER_CHOICE,
        payload: {manufacturer: 'Blankfort'}
      }
    ];

    const store = mockStore({
      filter: {manufacturer_in: ['Blankfort', 'Strebord']}
    });

    store.dispatch(setManufacturerChoice('Blankfort'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it dispatches toggle include assessments action', () => {
    const expectedActions = [
      {
        type: TOGGLE_INCLUDE_ASSESSMENTS
      }
    ];

    const store = mockStore();

    store.dispatch(toggleIncludeAssessments());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it toggles include assessments', () => {
    expect(FilterReducer(undefined, toggleIncludeAssessments())).toEqual({
      ...initialState,
      includeAssessments: false,
      dirty: true
    });
  });

  it('it dispatches glazed only action', () => {
    const expectedActions = [
      {
        type: SET_GLAZED_ONLY
      }
    ];

    const store = mockStore();

    store.dispatch(setGlazedOnly());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it sets glazed only', () => {
    expect(FilterReducer({...initialState, glazedOnly: false}, setGlazedOnly())).toEqual({
      ...initialState,
      glazedOnly: true,
      unglazedOnly: false,
      dirty: true
    });
  });

  it('it dispatches unglazed only action', () => {
    const expectedActions = [
      {
        type: SET_UNGLAZED_ONLY
      }
    ];

    const store = mockStore();

    store.dispatch(setUnglazedOnly());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('it sets unglazed only', () => {
    expect(FilterReducer(undefined, setUnglazedOnly())).toEqual({
      ...initialState,
      glazedOnly: false,
      unglazedOnly: true,
      dirty: true
    });
  });

  it('it clears filter array by type', () => {
    expect(
      FilterReducer(
        {...initialState, manufacturer_in: ['Blankfort', 'Strebord', 'Halspan']},
        clearFilter('manufacturer_in')
      )
    ).toEqual({
      ...initialState,
      manufacturer_in: []
    });
  });
});
