/* eslint-disable react/prop-types */
import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'underscore';
import { setSearchQuery, setFindedFilms, setSearchQueryAsync } from '../../actions';


const mapStateToProps = (state) => ({
  store: {
    queryString: state.mainPageSearch,
  },
});

const MainSearch = (props) => {
  const changeSearchQuery = (query) => {
    const {
      actions: {
        setSearchQuery: setQuery,
        setSearchQueryAsync: setFilms,
      },
    } = props;
    setQuery(query);
    setFilms(query);
  };
  const changeSearchQueryDebounced = debounce(changeSearchQuery, 400);
  const handleChange = (e) => {
    changeSearchQueryDebounced(e.target.value);
  };

  // console.log('props: ', props);

  return (
    <div className="search-container">
      <input type="search" onChange={handleChange} />
    </div>
  );
};

export default compose(
  connect(
    mapStateToProps,
    (dispatch) => ({
      actions: bindActionCreators({ setSearchQuery, setSearchQueryAsync }, dispatch),
    }),
  ),
)(MainSearch);
