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
  console.log(props);
  const { currentPage, totalPagesCount, query } = props;
  // console.log('films list props', props);
  const [inputValue, setInputValue] = useState('');
  const handlePlus = () => {
    changePage(query, parseInt(currentPage, 10) + 1, props);
  };
  const handleMinus = () => {
    changePage(query, parseInt(currentPage, 10) - 1, props);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMoveClick = () => {
    if (inputValue === '') {
      return;
    }
    const intInputValue = parseInt(inputValue, 10);
    if (intInputValue < 1) {
      alert(`Select page only in range from 1 to ${totalPagesCount}`);
      return;
    }
    if (intInputValue > totalPagesCount) {
      alert(`Select page only in range from 1 to ${totalPagesCount}`);
      return;
    }
    changePage(query, inputValue, props);
  };
  const isPrevDisabled = () => (parseInt(currentPage, 10) === 1);
  const isNextDisabled = () => (parseInt(currentPage, 10) === parseInt(totalPagesCount, 10));

  if (query === '' || parseInt(totalPagesCount, 10) === 1) {
    return (<></>);
  }
  return (
    <div className="pagination">
      <div>
        <button
          type="button"
          onClick={handleMinus}
          disabled={isPrevDisabled()}
        >
          Previous
        </button>
        <span>
          Current: {currentPage}
        </span>
        <button
          type="button"
          onClick={handlePlus}
          disabled={isNextDisabled()}
        >
          Next
        </button>
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
        <button type="button" onClick={handleMoveClick}>Move</button>
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
