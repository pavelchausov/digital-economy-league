/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'underscore';
import { withRouter, Link, useHistory } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { setAutocompleteSearchQuery, setAutocompleteSearchResultAsync } from '../../actions';
import './AutocompleteSearch.scss';
import loadingGif from '../../assets/loading.gif';

const mapStateToProps = ({ state, uiState }) => {
  const { autocompleteSearchResult } = state;
  const { isAutocompleteLoadingData } = uiState;
  return {
    autocompleteSearchResult,
    isAutocompleteLoadingData,
  };
};

const changeSearchQuery = (query, props) => {
  const { actions } = props;
  // actions.setAutocompleteSearchQuery(query);
  actions.setAutocompleteSearchResultAsync(query);
};

const changeSearchQueryDebounced = debounce(changeSearchQuery, 300);

const AutocompleteSearch = (props) => {
  const {
    autocompleteSearchResult,
    isAutocompleteLoadingData,
  } = props;
  const getSuggestionValue = (suggestion) => suggestion.Title;

  const renderSuggestion = (suggestion) => {
    const {
      Title: title,
      // Year: year,
      imdbID,
    } = suggestion;
    const link = `/film/${imdbID}`;
    return (
      <Link
        to={{
          pathname: link,
          state: {
            filmId: imdbID,
          },
        }}
      >
        {title}
      </Link>
    );
  };

  const [queryValue, setQueryValue] = useState('');
  const onChange = (event, { newValue }) => {
    setQueryValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value, reason }) => {
    if (reason === 'input-changed') {
      changeSearchQueryDebounced(value, props);
    }
  };

  const onSuggestionsClearRequested = () => {
    // setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Type a film title',
    value: queryValue,
    onChange,
    className: 'autocomplete__input',
  };

  const history = useHistory();
  const onSuggestionSelected = (e, { suggestion: { imdbID } }) => {
    const link = `/film/${imdbID}`;
    history.push(link);
  };
  return (
    <div className="autocomplete-block">
      <Autosuggest
        suggestions={autocompleteSearchResult}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
      <DataLoadingStatus isLoading={isAutocompleteLoadingData} />
    </div>
  );
};

const DataLoadingStatus = ({ isLoading }) => {
  if (!isLoading) {
    return (<></>);
  }
  return (
    <div className="autocomplete-loading">
      <div className="autocomplete-loading__msg">
        <img className="autocomplete-loading__gif" src={loadingGif} alt="loading" />
      </div>
    </div>
  );
};

export default compose(
  connect(
    mapStateToProps,
    (dispatch) => ({
      actions: bindActionCreators(
        { setAutocompleteSearchQuery, setAutocompleteSearchResultAsync },
        dispatch,
      ),
    }),
  ),
  withRouter,
)(AutocompleteSearch);
