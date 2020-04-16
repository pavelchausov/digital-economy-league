import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDetailFilmId, setDetailFilmDataAsync } from '../../actions';

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
    return (<div>LOADING...</div>);
  }
  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Plot,
    Poster,
    Response,
  } = filmData;
  if (Response === 'False') {
    return (<div>INVALID FILM ID...</div>);
  }
  return (
    <div className="film-detail">
      <h3>{Title}</h3>
      <div className="film-detail__data-wrap">
        <div>
          <img src={Poster} alt="poster" />
        </div>
        <div className="film-detail__data">
          <div>
            <span>Year: </span>
            <span>{Year}</span>
          </div>
          <div>
            <span>Rated: </span>
            <span>{Rated}</span>
          </div>
          <div>
            <span>Rated: </span>
            <span>{Rated}</span>
          </div>
          <div>
            <span>Released: </span>
            <span>{Released}</span>
          </div>
          <div>
            <span>Runtime: </span>
            <span>{Runtime}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{Genre}</span>
          </div>
          <div>
            <span>Plot: </span>
            <span>{Plot}</span>
          </div>
          <div>
            <span>Rated: </span>
            <span>{Rated}</span>
          </div>
          <div>
            <span>Released: </span>
            <span>{Released}</span>
          </div>
          <div>
            <span>Runtime: </span>
            <span>{Runtime}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{Genre}</span>
          </div>
          <div>
            <span>Plot: </span>
            <span>{Plot}</span>
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
