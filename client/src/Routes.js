import React, { Component } from 'react'
import { IndexRoute, Router, Route } from 'react-router'

import App from './App'

// Guards
import RequireGuest from './shared/guards/RequireGuest'
import RequireAuth from './shared/guards/RequireAuth'

import Home from './Home'

// Authentication
import Register from './authentication/Register'
import Login from './authentication/Login'

// Account
import Profile from './account/Profile'

// Furniture
import Furniture from './furniture/containers/Furniture'
import FurnitureDetails from './furniture/containers/FurnitureDetails'
import CreateFurniture from './furniture/containers/CreateFurniture'

import NotFound from './NotFound'

export default class Routes extends Component {
  render () {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          {/* Authentication */}
          <Route path='/register' component={RequireGuest(Register)} />
          <Route path='/login' component={RequireGuest(Login)} />
          {/* Account */}
          <Route path='/profile' component={RequireAuth(Profile)} />
          {/* Furniture */}
          <Route path='/furniture' component={Furniture} />
          <Route path='/furniture/details/:id' component={RequireAuth(FurnitureDetails)} />
          <Route path='/furniture/create' component={RequireAuth(CreateFurniture)} />

          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}
