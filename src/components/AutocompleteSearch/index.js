/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'underscore';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { Typeahead } from 'react-typeahead';
import Autosuggest from 'react-autosuggest';
import { setAutocompleteSearchQuery, setAutocompleteSearchResultAsync } from '../../actions';


const mapStateToProps = (state) => ({
  store: {
    autocompleteSearchResult: state.autocompleteSearchResult,
  },
});


const AutocompleteSearch = (props) => {

  const changeSearchQuery = (query) => {
    const {
      actions: {
        setAutocompleteSearchQuery: setQuery,
        setAutocompleteSearchResultAsync: setResult,
      },
    } = props;
    setQuery(query);
    setResult(query);
  };
  const changeSearchQueryDebounced = debounce(changeSearchQuery, 400);
  const handleChange = (e) => {
    changeSearchQueryDebounced(e.target.value);
  };
  // console.log('autocomplete');
  // console.log(props.store.autocompleteSearchResult);
  const { store: { autocompleteSearchResult } } = props;

  // const renderResultList = (searchResult) => {
  //   // console.log({searchResult})
  //   return (
  //     <ul className="autocomplete-result">
  //       {searchResult.map((element, i) => {
  //         const {
  //           Title: title,
  //           Year: year,
  //           imdbID,
  //         } = element;
  //         const key = `${imdbID}${i}ac`;
  //         const link = `/film/${imdbID}`;
  //         return (
  //           <li key={key}>
  //             <Link to={{
  //               pathname: link,
  //               state: {
  //                 filmId: imdbID,
  //               },
  //             }}>{title}</Link>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // };

  

  // return (
  //   <div className="search-container">
  //     <input type="search" onChange={handleChange} />
  //     {(autocompleteSearchResult.length > 0) ? renderResultList(autocompleteSearchResult) : ''}
  //   </div>
  // );
  // return (
  //   <Typeahead onKeyUp={handleChange} customListComponent={(autocompleteSearchResult.length > 0) ? renderResultList(autocompleteSearchResult) : <></>} />
  // );
  const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    },
  ];
  const getSuggestions = (value) => {
    // const inputValue = value.trim().toLowerCase();
    // const inputLength = inputValue.length;
  
    // return inputLength === 0 ? [] : languages.filter(lang =>
    //   lang.name.toLowerCase().slice(0, inputLength) === inputValue
    // );
    return props.store.autocompleteSearchResult;
  };
  const getSuggestionValue = suggestion => suggestion.Title;

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
  const [suggestions, setSuggestions] = useState([]);
  const [redirect, setRedirect] = useState('');
  const onChange = (event, { newValue }) => {
    setQueryValue(newValue);
    changeSearchQuery(newValue);// меняем стор
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const inputProps = {
    placeholder: 'Type a programming language',
    value: queryValue,
    onChange,
  };

  const onSuggestionSelected = (e, suggestion) => {
    console.log(suggestion);
    const {
      imdbID,
    } = suggestion.suggestionValue;
    const link = `/film/${imdbID}`;
    setRedirect(link);
  };
  if (redirect.length > 0) {
    return (<Redirect to={{
      pathname: '/film/tt0076759',
      state: {
        filmId: 'tt0076759',
      },
    }} />);
  }
  return (
    <Autosuggest
      suggestions={suggestions}
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
