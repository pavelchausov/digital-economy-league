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
    autocompleteSearchQuery: '',
    autocompleteSearchResult: [],
  });

  expect(reducers(undefined, {
    type: 'SET_DETAIL_FILM_ID',
    payload: '123avd',
  })).toEqual({
    mainPageFilms: [],
    mainPageSearch: '',
    detailFilmId: '123avd',
    detailFilmInfo: {},
    autocompleteSearchQuery: '',
    autocompleteSearchResult: [],
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
    autocompleteSearchQuery: '',
    autocompleteSearchResult: [],
  });

  expect(reducers(undefined, {
    type: 'SET_AUTOCOMPLETE_SEARCH_QUERY',
    payload: 'star',
  })).toEqual({
    mainPageFilms: [],
    mainPageSearch: '',
    detailFilmId: null,
    detailFilmInfo: {},
    autocompleteSearchQuery: 'star',
    autocompleteSearchResult: [],
  });
  expect(reducers(undefined, {
    type: 'SET_AUTOCOMPLETE_SEARCH_RESULT',
    payload: [
      { title: 'Star Wars', year: 1977 },
      { title: 'Star Trek', year: 1980 },
    ],
  })).toEqual({
    mainPageFilms: [],
    mainPageSearch: '',
    detailFilmId: null,
    detailFilmInfo: {},
    autocompleteSearchQuery: '',
    autocompleteSearchResult: [
      { title: 'Star Wars', year: 1977 },
      { title: 'Star Trek', year: 1980 },
    ],
  });
});
