import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilmDetail from '../../components/FilmDetail';
import AutocompleteSearch from '../../components/AutocompleteSearch';
import { setDetailFilmId, setDetailFilmDataAsync } from '../../actions';

const mapStateToProps = () => ({});

const DetailPage = (props) => {
  const { filmId } = useParams();

  useEffect(() => {
    const {
      actions: {
        setDetailFilmId: setFilmId,
        setDetailFilmDataAsync: setFilmData,
      },
    } = props;
    setFilmData(filmId);
    setFilmId(filmId);
  });
  return (
    <div className="main-container">
      <Link to="/">На главную</Link>
      <AutocompleteSearch />
      <FilmDetail />
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
)(DetailPage);
