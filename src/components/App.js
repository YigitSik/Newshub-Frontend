import Article from './MainPage/Article';
import SearchBar from './MainPage/SearchBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import React from 'react';
import FavouritesPage from './FavouritesPage/FavouritesPage';
import ModalAlert from './MainPage/ModalAlert';
import AdminPage from "./AdminPage/AdminPage"



function App() {


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: '.' })
      .then(function () {
        console.log('Service worker registered!');
      });
  }

  return (
    <div >


      <Router>


        <SearchBar />

        <ModalAlert />



        <Switch>

          <Route exact path="/">
            <Article />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/register">
            <RegisterPage />
          </Route>

          <Route exact path="/favourites">
            <FavouritesPage />
          </Route>

          <Route exact path="/admin">
            <AdminPage />
          </Route>

          <Redirect from="*" to="/" />

        </Switch>

      </Router>

    </div>
  );
}

export default App;
