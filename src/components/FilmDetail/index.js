import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDetailFilmId, setDetailFilmDataAsync } from '../../actions';

import noImg from '../../assets/no-image-available.png';
import loadingGif from '../../assets/loading.gif';
import './FilmDetail.scss';


const mapStateToProps = (store) => {
  const {
    state: {
      detailFilmInfo: filmData,
    },
    uiState: {
      isDetailPageLoadingData: isDataLoading,
    },
  } = store;
  return {
    filmData,
    isDataLoading,
  };
};

const FilmsDetail = (props) => {
  const {
    filmData,
    isDataLoading,
  } = props;
  if (isDataLoading) {
    return (
      <div className="films-loading">
        <img className="films-loading__gif" src={loadingGif} alt="loading" />
      </div>
    );
  }
  const {
    Actors,
    Awards,
    BoxOffice,
    Country,
    DVD,
    Director,
    Genre,
    Language,
    Plot,
    Poster,
    Production,
    Rated,
    Released,
    Response,
    Runtime,
    Title,
    Writer,
    Year,
    imdbRating,
    imdbVotes,
  } = filmData;
  if (Response === 'False') {
    return (
      <div className="error-msg">INVALID FILM ID...</div>
    );
  }
  const imgSrc = (Poster === 'N/A') ? noImg : Poster;
  return (
    <div className="film-detail">
      <h3>{Title}</h3>
      <div className="film-detail__data-wrap">
        <div className="poster-wrap">
          <img src={imgSrc} alt="poster" className="poster" />
        </div>
        <div className="film-detail__data">
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Rated: </span>
            <span className="film-detail__field-val">{Rated}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Year: </span>
            <span className="film-detail__field-val">{Year}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Actors: </span>
            <span className="film-detail__field-val">{Actors}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Country: </span>
            <span className="film-detail__field-val">{Country}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Director: </span>
            <span className="film-detail__field-val">{Director}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Genre: </span>
            <span className="film-detail__field-val">{Genre}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Writer: </span>
            <span className="film-detail__field-val">{Writer}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Released: </span>
            <span className="film-detail__field-val">{Released}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Production: </span>
            <span className="film-detail__field-val">{Production}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Plot: </span>
            <span className="film-detail__field-val">{Plot}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Language: </span>
            <span className="film-detail__field-val">{Language}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Awards: </span>
            <span className="film-detail__field-val">{Awards}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">Runtime: </span>
            <span className="film-detail__field-val">{Runtime}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">BoxOffice: </span>
            <span className="film-detail__field-val">{BoxOffice}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">DVD: </span>
            <span className="film-detail__field-val">{DVD}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">imdbRating: </span>
            <span className="film-detail__field-val">{imdbRating}</span>
          </div>
          <div className="film-detail__field">
            <span className="film-detail__field-nom">imdbVotes: </span>
            <span className="film-detail__field-val">{imdbVotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose(
  connect(
    mapStateToProps,
    (dispatch) => ({
      actions: bindActionCreators({ setDetailFilmId, setDetailFilmDataAsync }, dispatch),
    }),
  ),
)(FilmsDetail);
