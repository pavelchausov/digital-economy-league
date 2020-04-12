/* eslint-disable no-undef */
import { reducers } from './index';

test('reducers', () => {
  expect(reducers(undefined, {
    type: 'CHANGE_MAIN_SEARCH_QUERY',
    payload: 'asd',
  })).toEqual({
    mainPageFilms: [],
    detailFilmId: null,
    mainPageSearch: 'asd',
    detailFilmInfo: {},
  });

  expect(reducers(undefined, {
    type: 'SET_DETAIL_FILM_ID',
    payload: '123avd',
  })).toEqual({
    mainPageFilms: [],
    mainPageSearch: '',
    detailFilmId: '123avd',
    detailFilmInfo: {},
  });

  expect(reducers(undefined, {
    type: 'SET_DETAIL_FILM_DATA',
    payload: {
      Title: 'some title',
      Year: '1978',
    },
  })).toEqual({
    mainPageFilms: [],
    mainPageSearch: '',
    detailFilmId: null,
    detailFilmInfo: {
      Title: 'some title',
      Year: '1978',
    },
  });
});
