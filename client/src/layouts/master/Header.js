import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { logoutUser } from '../../store/authentication'

class Header extends Component {
  handleLogout () {
    this.props.logoutUser()
  }

  renderAuthLinks () {
    if (this.props.authenticated) {
      return [
        <Link to='/furniture/create' key='create-furniture'> Create Furniture
        </Link>,
        <a href='javascript:;' key='logout' onClick={this.handleLogout.bind(this)}>Logout</a>,
        <Link to='/profile' key='profile'> Profile
        </Link>
      ]
    } else {
      return [
        <Link to='/register' key='register'> Register
        </Link>,
        <Link to='/login' key='login'> Login
        </Link>
      ]
    }
  }

  render () {
    return (
      <nav>
        <Link to='/' key='home'> Home
        </Link>
        <Link to='/furniture' key='furniture'> Furniture
        </Link>
        {this.renderAuthLinks()}
      </nav>
    )
  }
}

function mapStateToProps (state) {
  return { authenticated: state.authentication.authenticated, currentUser: state.authentication.currentUser }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({logoutUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
