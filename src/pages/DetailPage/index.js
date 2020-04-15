import React, { useEffect } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilmDetail from '../../components/FilmDetail';
import AutocompleteSearch from '../../components/AutocompleteSearch';
// import AutocompleteWithoutRedux from '../../components/AutocompleteWithoutRedux';
import { setDetailFilmId, setDetailFilmDataAsync } from '../../actions';

const mapStateToProps = (state) => ({
  storeFilmId: state.detailFilmId,
});

const DetailPage = (props) => {
  const { filmId } = useParams();

  useEffect(() => {
    const {
      storeFilmId,
      actions: {
        setDetailFilmId: setFilmId,
        setDetailFilmDataAsync: setFilmData,
      },
    } = props;
    // setFilmId(filmId);
    setFilmData(filmId);
    setFilmId(filmId);
  });
  return (
    <>
      <Link to="/">Назад</Link>
      <AutocompleteSearch />
      <div className="main-container">
        {/* <FilmDetail filmIdURL={filmId} /> */}
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
