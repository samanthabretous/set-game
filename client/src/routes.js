//====================
// Import React and the dependencies we need to make react router work
//====================
import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import auth from './utils/auth.js'
import {socket} from './actions/connections'


//====================
// Import the different components that will represent the different pages
// of our website.
//====================
import AppContainer from './containers/appContainer';
import GameContainer from './containers/gameContainer';
import HowToPlay from './components/HowToPlay';
import LoginContainer from './containers/loginContainer'
import Logout from './components/Logout'
import Modal from './components/Modal'
import ProfileContainer from './containers/profileContainer'
import Play from './components/Play'
import User from './components/User'



const redirectToLogin = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { modal: true, nextPathname: nextState.location.pathname }
    })
  } else {
    auth.getPlayerSecretInfo()
    if(nextState.params.room){
      socket.emit('startNewGame', nextState.params.room)
    }
  }
  console.log(nextState)
}

const redirectToProfile =(nextState, replace) =>{
  if (auth.loggedIn()) {
    replace('/')
  } 
}


export default (
  <Route path='/' component={AppContainer} >
    <IndexRoute 
      getComponent={(nextState, cb) => {
        // Share the path
        // Dynamically load the correct component
        if (auth.loggedIn()) {
          auth.getPlayerSecretInfo();
          return require.ensure([], (require) => {
            cb(null, ProfileContainer)
          })
        }
        return require.ensure([], (require) => {
          cb(null, HowToPlay)
        })
      }}
    />

    <Route onEnter={redirectToLogin} >
      // Protected nested routes for the dashboard
      <Route path='/game/:room'
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, GameContainer)
          })
        }}
      />
      <Route path='/play' component={Play}/>
    </Route>

    <Route path='/how-to-play' component={HowToPlay}/>
    <Route path='/logout' component={Logout}/>

    <Route onEnter={redirectToProfile}>
      {/* Unauthenticated routes
        * Redirect to dashboard if player is already logged in */}
      <Route path='/login'
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, LoginContainer)
          })
        }}
      />
    </Route>


  </Route>
)
