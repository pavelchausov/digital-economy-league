/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchQuery from './SearchQuery';

import noImg from '../../assets/no-image-available.png';
import loadingGif from '../../assets/loading.gif';
import './FilmsList.scss';

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

const FilmsList = (props) => {
  const {
    films,
    searchQuery,
    resultsCount,
    isDataLoading,
  } = props;

  if (isDataLoading) {
    return (
      <div className="films-loading">
        <img className="films-loading__gif" src={loadingGif} alt="loading" />
      </div>
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
          const imgSrc = (posterSrc === 'N/A') ? noImg : posterSrc;
          return (
            <div key={`${imdbID}l${year}`} className="film-card-container">
              <Link to={`/film/${imdbID}`}>
                <div className="film-card">
                  <img
                    src={imgSrc}
                    alt="poster"
                    className="film-card__img"
                  />
                  <h4 className="film-card__title">{title}</h4>
                  <div className="film-card__year-block">
                    <span className="film-card__year-label">Год: </span>
                    <span className="film-card__year-value">{year}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default connect(mapStateToProps)(FilmsList);
