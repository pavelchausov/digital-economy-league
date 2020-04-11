import React from 'react';
import { withRouter, useParams } from 'react-router-dom';

const DetailPage = () => {
  const { filmId } = useParams();
  return (
    <div className="main-container">
      Detail Page
      {filmId}
    </div>
  );
};

export default withRouter(DetailPage);
