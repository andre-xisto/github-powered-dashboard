import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';

import './styles/style.scss';
import ProfileView from './views/ProfileView';
import ErrorView from './views/ErrorView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={HomeView} exact />
          <Route path="/profile/:login" component={ProfileView} />
          <Route path="/error" component={ErrorView} />
          <Redirect from="/" to="/error" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
