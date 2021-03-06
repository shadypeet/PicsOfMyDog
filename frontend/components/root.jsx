import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import App from './app';
import SessionFormContainer from './session_form/session_form_container';
import ProfileShowContainer from './profile/profile_show_container';
import EditProfileForm from './edit_profile_form/edit_profile_form_container';
import PhotoViewContainer from './photo_view/photo_view_container';
import PhotoListContainer from './photo_list/photo_list_container';
import PetPhotosContainer from './pet_photos/pet_photos_container';
import Welcome from './welcome/welcome';

const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/welcome');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/photos');
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Redirect from="/" to="/welcome" />
        <Route path="/" component={ App }>
          <Route path="/welcome" component={ Welcome } onEnter={ _redirectIfLoggedIn } />
          <Route path="/login" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
          <Route path="/signup" component={ SessionFormContainer} onEnter={ _redirectIfLoggedIn } />
          <Route path="/users/:userId" component={ ProfileShowContainer } onEnter={ _ensureLoggedIn } />
          <Route path="/photos" component={ PhotoListContainer } onEnter={ _ensureLoggedIn } />
            <Route path="/photos/:photoId" component={ PhotoViewContainer } />
          <Route path="/pets/:petId/photos" component={ PetPhotosContainer } onEnter={ _ensureLoggedIn }/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
