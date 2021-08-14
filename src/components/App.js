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
import UserPage from './UserPage/UserPage';
import ModalAlert from './MainPage/ModalAlert';



function App() {




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

          <Route exact path="/user">
            <UserPage />
          </Route>

          <Redirect from="*" to="/" />

        </Switch>

      </Router>

    </div>
  );
}

export default App;
