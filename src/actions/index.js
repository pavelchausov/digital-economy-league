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

const setSearchQueryAsync = (query) => (dispatch) => {
  axios
    .get(`http://www.omdbapi.com/?apikey=${apikey}&s=${query}`)
    .then(({ data: { Search } }) => {
      dispatch(setFindedFilms(Search));
    })
    .catch((error) => {
      console.log(error);
    });
};
export { setFindedFilms, setSearchQuery, setSearchQueryAsync };
