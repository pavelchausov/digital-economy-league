import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { setFindedFilmsAsync } from '../../actions';

// const mapStateToProps = ({ mainPageFilms, isMainPageLoadingData }) => ({
//   films: mainPageFilms,
//   isDataLoading: isMainPageLoadingData,
// });

const changePage = (query, page, props) => {
  const { actions } = props;
  actions.setFindedFilmsAsync(query, page);
};
const mapStateToProps = (store) => {
  const {
    state: {
      mainSearchQuery: query,
      mainSearchPageNumber: currentPage,
      mainSearchTotalPages: totalPagesCount,
    },
  } = store;
  return {
    currentPage,
    totalPagesCount,
    query,
  };
};


const Paging = (props) => {
  const { currentPage, totalPagesCount, query } = props;
  console.log('films list props', props);
  const [inputValue, setInputValue] = useState('');

  const handlePlus = () => {
    changePage(query, currentPage + 1, props);
  };
  const handleMinus = () => {
    changePage(query, currentPage - 1, props);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputSubmit = () => {
    changePage(query, inputValue, props);
  };

  return (
    <div className="pagination">
      <div>
        <button type="button" onClick={handleMinus}>Previous</button>
        <span>{currentPage}</span>
        <button type="button" onClick={handlePlus}>Next</button>
      </div>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="page number"
          min={1}
          max={totalPagesCount}
        />
        <button type="button" onClick={handleInputSubmit}>Move</button>
      </div>
      <div>
        total: {totalPagesCount}
      </div>
    </div>
  );
};

export default compose(
  connect(
    mapStateToProps,
    (dispatch) => ({
      actions: bindActionCreators({ setFindedFilmsAsync }, dispatch),
    }),
  ),
)(Paging);