import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './User.scss'
import REST, { setToken } from '../../rest'
import { login, logout } from './redux/actions'
import { browserHistory } from 'react-router'

class User extends React.Component {
  login(e) {
    e.preventDefault();
    // automatic loggin, hack
    let username = 'guro.bokum@email.com'
    let password = '12345'
    REST.login(username, password)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.message)
        }
        response.json().then(data => {
          setToken(data.id);
          this.props.login(username, data.id)
        })
      })
      .catch(() => {})
  }

  logout() {
    REST.logout()
      .then(response => {
        if (response.status !== 204) {
          throw new Error(response.message)
        }
        setToken(null);
        this.props.logout()
        browserHistory.replace('/')
      })
      .catch(() => {})
  }

  render () {
    return (
      <div className='auth'>
      { this.props.isLogin ?
        <div>
          <span>You are login as: { this.props.username }</span>
          <button onClick={this.logout.bind(this)} className='btn btn-primary btn-sm'>Logout</button>
        </div>
          :
        <div>
          <span>You are not loggin</span>
          <button onClick={this.login.bind(this)} className='btn btn-primary btn-sm'>Login</button>
        </div>
      }
      </div>
    )
  }
}

export default connect(
  state => ({
    isLogin: state.auth.isLogin,
    username: state.auth.username,
    token: state.auth.token
}), {
  login,
  logout,
})(User)
