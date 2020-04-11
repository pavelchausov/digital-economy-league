import React from 'react';
import MainSearch from '../../components/MainSearch';
import FilmList from '../../components/FilmsList';

const MainPage = () => (
  <div className="main-container">
    <h1>Main page</h1>
    <MainSearch />
    <FilmList />
  </div>
);

export default MainPage;
