import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import FilmDetail from '../../components/FilmDetail';

const DetailPage = () => {
  const { filmId } = useParams();
  return (
    <div className="main-container">
      <FilmDetail filmIdURL={filmId} />
    </div>
  );
};

export default withRouter(DetailPage);
