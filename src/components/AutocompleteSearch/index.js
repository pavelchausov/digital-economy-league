/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'underscore';
import { withRouter, Link, useHistory } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { setAutocompleteSearchQuery, setAutocompleteSearchResultAsync } from '../../actions';


const mapStateToProps = (state) => ({
  store: {
    autocompleteSearchResult: state.autocompleteSearchResult,
  },
});

const changeSearchQuery = (query, props) => {
  console.log(query);
  const { actions } = props;
  // actions.setAutocompleteSearchQuery(query);
  actions.setAutocompleteSearchResultAsync(query);
};

const changeSearchQueryDebounced = debounce(changeSearchQuery, 300);

const AutocompleteSearch = (props) => {
  const { store: { autocompleteSearchResult } } = props;
  console.log('prop changed - autocomplete search result -> ', autocompleteSearchResult);
  const getSuggestionValue = (suggestion) => suggestion.Title;

  const renderSuggestion = (suggestion) => {
    const {
      Title: title,
      Year: year,
      imdbID,
    } = suggestion;
    const link = `/film/${imdbID}`;
    return (
      <Link to={{
        pathname: link,
        state: {
          filmId: imdbID,
        },
      }}>{title}</Link>
    );
  };

  const [queryValue, setQueryValue] = useState('');
  // const [suggestions, setSuggestions] = useState(autocompleteSearchResult);
  const onChange = (event, { newValue }) => {
    setQueryValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value, reason }) => {
    // 123 <====<===
    // setSuggestions(autocompleteSearchResult);
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
  };

  const history = useHistory();
  const onSuggestionSelected = (e, { suggestion: { imdbID } }) => {
    const link = `/film/${imdbID}`;
    history.push(link);
  };
  return (
    <Autosuggest
      suggestions={autocompleteSearchResult}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
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
