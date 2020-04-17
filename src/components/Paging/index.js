/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { setFindedFilmsAsync } from '../../actions';
import './Paging.scss';

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
    uiState: {
      isMainPageLoadingData: isDataLoading,
    },
  } = store;
  return {
    currentPage,
    totalPagesCount,
    query,
    isDataLoading,
  };
};


const Paging = (props) => {
  const {
    currentPage,
    totalPagesCount,
    query,
    isDataLoading,
  } = props;
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
    if (intInputValue === parseInt(currentPage, 10)) {
      return;
    }
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
  const isMoveButtonDisabled = () => (inputValue === '');

  if (parseInt(totalPagesCount, 10) === 1 || isDataLoading) {
    return (<></>);
  }
  return (
    <div className="pagination">
      <div className="pagination__prev-next-block">
        <button
          type="button"
          onClick={handleMinus}
          disabled={isPrevDisabled()}
          className="pagination__btn"
        >
          Previous
        </button>
        <div className="pagination__current">
          <span className="pagination__nomination">Current: </span>
          <span className="pagination__value">{currentPage}</span>
        </div>
        <button
          type="button"
          onClick={handlePlus}
          disabled={isNextDisabled()}
          className="pagination__btn"
        >
          Next
        </button>
      </div>
      <div className="pagination__input-block">
        <label
          htmlFor="pagination__input"
          className="pagination__label"
        >
          Введите номер страницы:
        </label>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="555"
          min={1}
          max={totalPagesCount}
          id="pagination__input"
          className="pagination__input"
        />
        <button
          type="button"
          onClick={handleMoveClick}
          disabled={isMoveButtonDisabled()}
          className="pagination__btn"
        >
          Move
        </button>
      </div>
      <div className="pagination__total">
        <span className="pagination__nomination">Total pages: </span>
        <span className="pagination__value">{totalPagesCount}</span>
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
