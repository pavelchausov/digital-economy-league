import axios from 'axios';

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

const setTotalFilmsCount = (payload) => ({
  type: 'CHANGE_TOTAL_FILMS_COUNT',
  payload,
});

const setMainPageSearchResults = (
  dispatch,
  {
    films,
    pageNumber,
    totalPages,
    totalFilms,
  },
) => {
  dispatch(setFindedFilms([...films]));
  dispatch(setSearchPageNumber(pageNumber));
  dispatch(setSearchTotalPages(totalPages));
  dispatch(setTotalFilmsCount(totalFilms));
};

const emptySearchResult = {
  films: [],
  pageNumber: 1,
  totalPages: 1,
  totalFilms: 0,
};

const setFindedFilmsAsync = (query, page = 1) => (dispatch) => {
  const trimQuery = query.trim();
  if (trimQuery.length < 3) {
    setMainPageSearchResults(dispatch, emptySearchResult);
    return;
  }
  dispatch(setMainPageLoadingStatus(true));
  // console.log('main search started: ' + trimQuery);
  axios
    .get(`https://www.omdbapi.com/?apikey=${apikey}&s=${trimQuery}&page=${page}`)
    .then((res) => {
      const { data } = res;
      const { Search, Response, totalResults } = data;
      if (Response === 'True') {
        setMainPageSearchResults(dispatch, {
          films: [...Search],
          pageNumber: page,
          totalPages: Math.ceil(totalResults / 10),
          totalFilms: totalResults,
        });
      } else {
        setMainPageSearchResults(dispatch, emptySearchResult);
      }
      dispatch(setMainPageLoadingStatus(false));
    })
    .catch((error) => {
      setMainPageSearchResults(dispatch, emptySearchResult);
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
    .get(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbId}`)
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
    .get(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}`)
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
