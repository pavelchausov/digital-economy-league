import React, { useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDetailFilmId, setDetailFilmDataAsync } from '../../actions';

const mapStateToProps = (state) => ({
  ...state,
});
const FilmsDetail = (props) => {
  useEffect(() => {
    const {
      detailFilmId,
      actions: {
        setDetailFilmDataAsync: setFilmDataAsync
      },
    } = props;
    // setFilmId(props.filmIdURL);
    // setFilmDataAsync(props.detailFilmId);
  }, []);
  console.log('=============================');
  console.log(props);
  const {
    detailFilmInfo: {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Plot,
      Poster,
    },
  } = props;
  return (
    <div className="film-container">
      <h3>{Title}</h3>
      <div>
        <img src={Poster} alt="poster" />
      </div>
      <div>
        <span>Year: </span>
        <span>{Year}</span>
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
