/* eslint-disable react/prop-types */
import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'underscore';
import { withRouter, Link } from 'react-router-dom';
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
  const changeSearchQueryDebounced = debounce(changeSearchQuery, 100);
  const handleChange = (e) => {
    changeSearchQueryDebounced(e.target.value);
  };

  const { store: { autocompleteSearchResult } } = props;

  const renderResultList = (searchResult) => {
    // console.log({searchResult})
    return (
      <ul className="autocomplete-result">
        {searchResult.map((element, i) => {
          const {
            Title: title,
            Year: year,
            imdbID,
          } = element;
          const key = `${imdbID}${i}ac`;
          const link = `/film/${imdbID}`;
          return (
            <li key={key}>
              <Link to={{
                pathname: link,
                state: {
                  filmId: imdbID,
                },
              }}>{title}</Link>
            </li>
          );
        })}
      </ul>
    );
  };


  return (
    <div className="search-container">
      <input type="search" onChange={handleChange} />
      {(autocompleteSearchResult.length > 0) ? renderResultList(autocompleteSearchResult) : ''}
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
