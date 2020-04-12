import axios from 'axios';

const apikey = '66f7d889';

const setFindedFilms = (payload) => ({
  type: 'SET_FINDED_FILMS',
  payload,
});

const setSearchQuery = (payload) => ({
  type: 'CHANGE_MAIN_SEARCH_QUERY',
  payload,
});

const setFindedFilmsAsync = (query) => (dispatch) => {
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&s=${query}`)
    .then(({ data: { Search } }) => {
      dispatch(setFindedFilms([...Search]));
    })
    .catch((error) => {
      dispatch(setFindedFilms([]));
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
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&i=${imdbId}`)
    .then((response) => {
      dispatch(setDetailFilmData(response.data));
      console.log('callback: ', response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  setFindedFilms,
  setSearchQuery,
  setFindedFilmsAsync,
  setDetailFilmId,
  setDetailFilmDataAsync,
};
