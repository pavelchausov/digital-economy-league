import axios from 'axios';
import { debounce } from 'underscore';

const apikey = '66f7d889';

const setMainPageLoadingStatus = (payload) => ({
  type: 'SET_MAIN_PAGE_LOADING',
  payload,
});

const setDetailPageLoadingStatus = (payload) => ({
  type: 'SET_DETAIL_PAGE_LOADING',
  payload,
});

const setFindedFilms = (payload) => ({
  type: 'SET_FINDED_FILMS',
  payload,
});

const setSearchQuery = (payload) => ({
  type: 'CHANGE_MAIN_SEARCH_QUERY',
  payload: payload.trim(),
});

const setSearchPageNumber = (payload) => ({
  type: 'SET_SEARCH_PAGE_NUMBER',
  payload,
});
const setSearchTotalPages = (payload) => ({
  type: 'SET_SEARCH_TOTAL_PAGES',
  payload,
});

const setFindedFilmsAsync = (query, page = 1) => (dispatch) => {
  const trimQuery = query.trim();
  if (trimQuery.length < 3) {
    dispatch(setFindedFilms([]));
    dispatch(setSearchPageNumber(1));
    dispatch(setSearchTotalPages(1));
    return;
  }
  dispatch(setMainPageLoadingStatus(true));
  // console.log('main search started: ' + trimQuery);
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&s=${trimQuery}&page=${page}`)
    .then((res) => {
      const { data } = res;
      const { Search, Response, totalResults } = data;
      if (Response === 'True') {
        dispatch(setFindedFilms([...Search]));
        dispatch(setSearchPageNumber(page));
        dispatch(setSearchTotalPages(Math.ceil(totalResults / 10)));
      } else {
        dispatch(setFindedFilms([]));
        dispatch(setSearchPageNumber(1));
        dispatch(setSearchTotalPages(1));
      }
      dispatch(setMainPageLoadingStatus(false));
    })
    .catch((error) => {
      dispatch(setFindedFilms([]));
      dispatch(setSearchPageNumber(1));
      dispatch(setSearchTotalPages(1));
      console.log(error);
    });
};

const setDetailFilmId = (payload) => ({
  type: 'SET_DETAIL_FILM_ID',
  payload,
});

const setDetailFilmData = (payload) => ({
  type: 'SET_DETAIL_FILM_DATA',
  payload,
});

const setDetailFilmDataAsync = (imdbId) => (dispatch) => {
  dispatch(setDetailPageLoadingStatus(true));
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&i=${imdbId}`)
    .then(({ data }) => {
      dispatch(setDetailFilmData({
        ...data,
      }));
      dispatch(setDetailPageLoadingStatus(false));
    })
    .catch((error) => {
      console.log(error);
    });
};

const setAutocompleteSearchQuery = (payload) => ({
  type: 'SET_AUTOCOMPLETE_SEARCH_QUERY',
  payload,
});

const setAutocompleteSearchResult = (payload) => ({
  type: 'SET_AUTOCOMPLETE_SEARCH_RESULT',
  payload,
});

const setAutocompleteSearchResultAsync = (query) => (dispatch) => {
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&s=${query}`)
    .then(({ data }) => {
      const { Search, Response } = data;
      if (Response === 'True') {
        dispatch(setAutocompleteSearchResult([...Search]));
      } else {
        dispatch(setAutocompleteSearchResult([]));
      }
    })
    .catch((error) => {
      dispatch(setAutocompleteSearchResult([]));
      console.log(error);
    });
};

export {
  setFindedFilms,
  setSearchQuery,
  setFindedFilmsAsync,
  setDetailFilmId,
  setDetailFilmDataAsync,
  setAutocompleteSearchQuery,
  setAutocompleteSearchResult,
  setAutocompleteSearchResultAsync,
};
