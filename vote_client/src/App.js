import React from "react";
import { Redirect, Router } from '@reach/router';
import { Provider } from 'react-redux';
import LoginPage from './components/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
function App() {
  return (
          <div className="body container" style={{ background: '#FFFFFF' }}>
              <Provider store={store}>
                  <Router>
                      <LoginPage path="/login" />
                      {/*<LogoutPage path="/logout" />*/}
                      {/*<Page default path="/home">*/}
                      {/*    <Redirect from="/" to="/home" />*/}
                      {/*</Page>*/}
                  </Router>
              </Provider>

          </div>
  );
}

export default App;
