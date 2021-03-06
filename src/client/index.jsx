import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index.jsx';

import App from './components/App.jsx';
import IndexPage from './components/IndexPage.jsx';
import SignIn from './components/Auth/SignIn/signin.jsx';
import SignUp from './components/Auth/SignUp/signup.jsx';
import SignOut from './components/Auth/SignOut/signout.jsx';
import Home from './components/Home/home.jsx';
import Friends from './components/Friends/friends.jsx';
import CreateEvent from './components/Event/event.jsx';
import Profile from './components/Profile/profile.jsx';
import Message from './components/Message/message.jsx';
import Nav from './components/Nav/nav.jsx';

import checkAuth from './components/Auth/check_auth.jsx';
import { getUserInfo } from './actions/index.jsx';

const store = createStore(reducers,
  applyMiddleware(thunk));

const token = localStorage.getItem('token');
const email = localStorage.getItem('user_email');
if (token && email) {
  store.dispatch(getUserInfo(token, email))
}

ReactDOM.render(
  <div className="container-fluid">
    <Provider store={store}>
      <Router history={hashHistory} >
        <Route path='/' component={App} >
          <IndexRoute component={IndexPage} />
          <Route path='/auth/signup' component={SignUp} />
          <Route path='/auth/signin' component={SignIn} />
          <Route path='/auth/signout' component={SignOut} />
          <Route path='/home' component={checkAuth(Home)} />
          <Route path='/friends' component={Friends} />
          <Route path='/postevent' component={checkAuth(CreateEvent)} />
          <Route path='/profile/:userid' component={checkAuth(Profile)} />
          <Route path='/message' component={Message} />
        </Route>
      </Router>
    </Provider> 
  </div>
  , document.getElementById('app'));
