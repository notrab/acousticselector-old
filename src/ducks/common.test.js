import configureMockStore from 'redux-mock-store';
import CommonReducer, {DISMISS_WELCOME, initialState, dismissWelcome, hideLoginTip, hideClearFilterTip} from './common';

const mockStore = configureMockStore();

describe('CommonFilter', () => {
  it('returns the initial state', () => {
    expect(CommonReducer(undefined, {})).toEqual(initialState);
  });

  it('it dispatches the dismiss welcome action', () => {
    expect(CommonReducer({...initialState}, dismissWelcome())).toEqual({
      ...initialState,
      dismissedWelcome: true
    });
  });

  it('it dispatches the hide login tip action', () => {
    expect(CommonReducer({...initialState}, hideLoginTip())).toEqual({
      ...initialState,
      showLoginTip: false
    });
  });

  it('it dispatches the hide clear filter tip action', () => {
    expect(CommonReducer({...initialState}, hideClearFilterTip())).toEqual({
      ...initialState,
      showClearFilterTip: false
    });
  });
});
