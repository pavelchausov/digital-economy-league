/* eslint-disable no-undef */
import {
  reducers,
  uiStateReducers,
  initialState,
  initialUiState,
} from './index';

test('reducers', () => {
  expect(reducers(initialState, {
    type: 'CHANGE_MAIN_SEARCH_QUERY',
    payload: 'asd',
  })).toEqual({
    ...initialState,
    mainSearchQuery: 'asd',
  });

  expect(reducers(initialState, {
    type: 'SET_DETAIL_FILM_ID',
    payload: '123avd',
  })).toEqual({
    ...initialState,
    detailFilmId: '123avd',
  });

  expect(reducers(initialState, {
    type: 'SET_DETAIL_FILM_DATA',
    payload: {
      Title: 'some title',
      Year: '1978',
    },
  })).toEqual({
    ...initialState,
    detailFilmInfo: {
      Title: 'some title',
      Year: '1978',
    },
  });

  expect(reducers(initialState, {
    type: 'SET_AUTOCOMPLETE_SEARCH_QUERY',
    payload: 'star',
  })).toEqual({
    ...initialState,
    autocompleteSearchQuery: 'star',
  });
  expect(reducers(initialState, {
    type: 'SET_AUTOCOMPLETE_SEARCH_RESULT',
    payload: [
      { title: 'Star Wars', year: 1977 },
      { title: 'Star Trek', year: 1980 },
    ],
  })).toEqual({
    ...initialState,
    autocompleteSearchResult: [
      { title: 'Star Wars', year: 1977 },
      { title: 'Star Trek', year: 1980 },
    ],
  });
  expect(reducers(initialState, {
    type: 'SET_SEARCH_PAGE_NUMBER',
    payload: 423,
  })).toEqual({
    ...initialState,
    mainSearchPageNumber: 423,
  });
  expect(reducers(initialState, {
    type: 'SET_SEARCH_TOTAL_PAGES',
    payload: 555,
  })).toEqual({
    ...initialState,
    mainSearchTotalPages: 555,
  });
  expect(reducers(initialState, {
    type: 'CHANGE_TOTAL_FILMS_COUNT',
    payload: 666,
  })).toEqual({
    ...initialState,
    totalFilmsCount: 666,
  });
});

test('ui state reducers', () => {
  expect(uiStateReducers(initialUiState, {
    type: 'SET_MAIN_PAGE_LOADING',
    payload: 123,
  })).toEqual({
    ...initialUiState,
    isMainPageLoadingData: 123,
  });
  expect(uiStateReducers(initialUiState, {
    type: 'SET_DETAIL_PAGE_LOADING',
    payload: 123,
  })).toEqual({
    ...initialUiState,
    isDetailPageLoadingData: 123,
  });
});
