const initialState = {
  mainPageSearch: '',
  mainPageFilms: [],
  detailFilmId: null,
  detailFilmInfo: {},
  autocompleteSearchQuery: '',
  autocompleteSearchResult: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MAIN_SEARCH_QUERY': {
      const { payload } = action;
      return {
        ...state,
        mainPageSearch: payload,
      };
    }
    case 'SET_FINDED_FILMS': {
      const { payload } = action;
      return {
        ...state,
        mainPageFilms: [...payload],
      };
    }
    case 'SET_DETAIL_FILM_ID': {
      const { payload } = action;
      return {
        ...state,
        detailFilmId: payload,
      };
    }
    case 'SET_DETAIL_FILM_DATA': {
      const { payload } = action;
      return {
        ...state,
        detailFilmInfo: { ...payload },
      };
    }
    case 'SET_AUTOCOMPLETE_SEARCH_QUERY': {
      const { payload } = action;
      return {
        ...state,
        autocompleteSearchQuery: payload,
      };
    }
    case 'SET_AUTOCOMPLETE_SEARCH_RESULT': {
      const { payload } = action;
      return {
        ...state,
        autocompleteSearchResult: [...payload],
      };
    }
    default:
      return state;
  }
};

export { reducers };
