const initialState = {
  mainPageSearch: '',
  mainPageFilms: [],
  detailFilmId: null,
  detailFilmInfo: {},
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
    default:
      return state;
  }
};

export { reducers };
