import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session_form/session_form_container';
import ProfileShowContainer from './profile/profile_show_container';
import EditProfileForm from './edit_profile_form/edit_profile_form_container';

const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <Route path="/login" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
          <Route path="/signup" component={ SessionFormContainer} onEnter={ _redirectIfLoggedIn } />
          <Route path="/users/:userId" component={ ProfileShowContainer } />
          <Route path="/edit-profile" component={ EditProfileForm } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;