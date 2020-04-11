const initialState = {
  mainPageSearch: '',
  mainPageFilms: [],
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
        mainPageFilms: payload,
      };
    }
    default:
      return state;
  }
};

export { reducers };
