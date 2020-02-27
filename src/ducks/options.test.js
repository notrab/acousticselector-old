import OptionsReducer, {initialState, setOrderBy, resetFilter, restoreFilter} from './options';

describe('OptionsReducer', () => {
  it('returns the initial state', () => {
    expect(OptionsReducer(undefined, {})).toEqual(initialState);
  });

  it('handles set order by action', () => {
    expect(OptionsReducer(undefined, setOrderBy('id_ASC'))).toEqual({
      ...initialState,
      orderBy: 'id_ASC'
    });
  });

  it('handles reset filter action', () => {
    expect(OptionsReducer(undefined, resetFilter())).toEqual(initialState);
  });

  it('handles restore filter action', () => {
    expect(
      OptionsReducer(
        undefined,
        restoreFilter({
          first: 123,
          skip: 5
        })
      )
    ).toEqual({
      ...initialState,
      first: 123,
      skip: 5
    });
  });
});
