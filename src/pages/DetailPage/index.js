import React, { useEffect } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilmDetail from '../../components/FilmDetail';
import AutocompleteSearch from '../../components/AutocompleteSearch';
// import AutocompleteWithoutRedux from '../../components/AutocompleteWithoutRedux';
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
    <>
      <Link to="/">Назад</Link>
      <AutocompleteSearch />
      <div className="main-container">
        <FilmDetail />
      </div>
    </>
  );
};

// export default withRouter(DetailPage);
export default compose(
  connect(
    mapStateToProps,
    (dispatch) => ({
      actions: bindActionCreators({ setDetailFilmId, setDetailFilmDataAsync }, dispatch),
    }),
  ),
)(DetailPage);
