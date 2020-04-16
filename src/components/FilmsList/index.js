import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// const mapStateToProps = ({ mainPageFilms, isMainPageLoadingData }) => ({
//   films: mainPageFilms,
//   isDataLoading: isMainPageLoadingData,
// });

const mapStateToProps = (store) => {
  const {
    state: {
      mainPageFilms: films,
      mainSearchQuery: searchQuery,
      totalFilmsCount: resultsCount,
    },
    uiState: {
      isMainPageLoadingData: isDataLoading,
    },
  } = store;
  return {
    films,
    searchQuery,
    resultsCount,
    isDataLoading,
  };
};

const SearchQuery = ({ query, resultsCount }) => {
  if (query === '') {
    return (<></>);
  }
  return (
    <div>
      <div>
        <span>Вы искали: </span>
        <span>
          &ldquo;
          {query}
          &ldquo;
        </span>
      </div>
      <div>
        <span>Всего результатов: </span>
        <span>
          &ldquo;
          {resultsCount}
          &ldquo;
        </span>
      </div>
    </div>
  );
};

const FilmsList = (props) => {
  const {
    films,
    searchQuery,
    resultsCount,
    isDataLoading,
  } = props;

  // return (<></>);
  if (isDataLoading) {
    return (
      <div>LOADING...</div>
    );
  }
  return (
    <>
      <SearchQuery query={searchQuery} resultsCount={resultsCount} />
      <div className="films-container">
        {films.map((item) => {
          const {
            Title: title,
            Year: year,
            Poster: posterSrc,
            imdbID,
          } = item;
          return (
            <Link key={imdbID} to={`/film/${imdbID}`}>
              <div className="film-card">
                <img src={posterSrc} alt="poster" />
                <h6>{title}</h6>
                <div className="film-card__year-block">
                  <span className="film-card__year-label">Год: </span>
                  <span className="film-card__year-value">{year}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default connect(mapStateToProps)(FilmsList);
