import React from 'react';
import MainSearch from '../../components/MainSearch';
import FilmList from '../../components/FilmsList';
import Paging from '../../components/Paging';
import './MainPage.scss';

const MainPage = () => (
  <div className="main-container main-page">
    <h1>Поиск фильмов</h1>
    <MainSearch />
    <FilmList />
    <Paging />
  </div>
);

export default MainPage;
