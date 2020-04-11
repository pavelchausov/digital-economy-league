/* eslint-disable no-undef */
import { reducers } from './index';

test('reducers', () => {
  expect(reducers(undefined, {
    type: 'CHANGE_MAIN_SEARCH_QUERY',
    payload: {
      query: 'asd',
    },
  })).toEqual({
    mainPageSearch: 'asd',
  });
});
