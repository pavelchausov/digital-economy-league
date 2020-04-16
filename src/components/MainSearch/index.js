/* eslint-disable react/prop-types */
import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'underscore';
import { setSearchQuery, setFindedFilmsAsync } from '../../actions';
import './MainSearch.scss';

const mapStateToProps = () => ({});
const changeSearchQuery = (query, props) => {
  const { actions } = props;
  actions.setSearchQuery(query);
  actions.setFindedFilmsAsync(query);
};
const changeSearchQueryDebounced = debounce(changeSearchQuery, 400);

const MainSearch = (props) => {
  const handleChange = (e) => {
    changeSearchQueryDebounced(e.target.value, props);
  };
  return (
    <div className="main-search-container">
      <input
        type="search"
        onChange={handleChange}
        placeholder="Введите название фильма для поиска"
        className="main-search"
        maxLength="80"
      />
    </div>
  );
};

export default compose(
  connect(
    mapStateToProps,
    (dispatch) => ({
      actions: bindActionCreators({ setSearchQuery, setFindedFilmsAsync }, dispatch),
    }),
  ),
)(MainSearch);
