import React from 'react';
import './SearchQuery.scss';

const SearchQuery = ({ query, resultsCount }) => {
  if (query === '') {
    return (<></>);
  }
  return (
    <div className="search-query">
      <div className="query-block">
        <span className="search-query__label">Вы искали: </span>
        <span className="search-query__value">
          &ldquo;
          {query}
          &ldquo;
        </span>
      </div>
      <div className="total-cnt-block">
        <span className="search-query__label">Всего результатов: </span>
        <span className="search-query__value">
          &ldquo;
          {resultsCount}
          &ldquo;
        </span>
      </div>
    </div>
  );
};

export default SearchQuery;
