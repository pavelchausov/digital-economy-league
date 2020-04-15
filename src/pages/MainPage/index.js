import React from 'react';
import MainSearch from '../../components/MainSearch';
import FilmList from '../../components/FilmsList';
import Paging from '../../components/Paging';

const MainPage = () => (
  <div className="main-container">
    <h1>Main page</h1>
    <MainSearch />
    <FilmList />
    <Paging />
  </div>
);

export default MainPage;
