const initialState = {
  mainSearchQuery: '',
  mainSearchPageNumber: 1,
  mainSearchTotalPages: 1,
  totalFilmsCount: 0,
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
        mainSearchQuery: payload,
      };
    }
    case 'SET_FINDED_FILMS': {
      const { payload } = action;
      return {
        ...state,
        mainPageFilms: [...payload],
      };
    }
    case 'SET_SEARCH_PAGE_NUMBER': {
      const { payload } = action;
      return {
        ...state,
        mainSearchPageNumber: payload,
      };
    }
    case 'SET_SEARCH_TOTAL_PAGES': {
      const { payload } = action;
      return {
        ...state,
        mainSearchTotalPages: payload,
      };
    }
    case 'CHANGE_TOTAL_FILMS_COUNT': {
      const { payload } = action;
      return {
        ...state,
        totalFilmsCount: payload,
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

const initialUiState = {
  isMainPageLoadingData: false,
  isDetailPageLoadingData: true,
  isAutocompleteLoadingData: false,
};

const uiStateReducers = (state = initialUiState, action) => {
  switch (action.type) {
    case 'SET_MAIN_PAGE_LOADING': {
      const { payload } = action;
      return {
        ...state,
        isMainPageLoadingData: payload,
      };
    }
    case 'SET_DETAIL_PAGE_LOADING': {
      const { payload } = action;
      return {
        ...state,
        isDetailPageLoadingData: payload,
      };
    }
    case 'SET_AUTOCOMPLETE_LOADING': {
      const { payload } = action;
      return {
        ...state,
        isAutocompleteLoadingData: payload,
      };
    }
    default:
      return state;
  }
};

export {
  reducers,
  uiStateReducers,
  initialState,
  initialUiState,
};
