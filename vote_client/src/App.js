import React from "react";
import { Redirect, Router } from '@reach/router';
import { Provider } from 'react-redux';
import LoginPage from './components/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import store from './redux/store';
import Page from "./components/Page";
import Home from "./components/Home";
function App() {
  return (
          <div className="body container" style={{ background: '#FFFFFF' }}>
              <Provider store={store}>
                  <Router>
                      <LoginPage path="/login" />
                      <Page default>
                          <Redirect from="/" to="/home" />
                          <Home path="/home" />
                      </Page>
                  </Router>
              </Provider>
          </div>
  );
}

export default App;
