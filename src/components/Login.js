import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
  font-size: 14px;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  background: #fff;
  &:hover {
    background: #e3dde9;
    border: 1px solid #e3dde9;
  }
  padding: 4px 8px 4px 8px;
  cursor: pointer;
`
/**
 * Login/Logout prompts
 */
class Login extends Component {
  handleLogin(e) {
    const username = this.user.value
    const password = this.password.value
    const { gpodurl, setUsername } = this.props
    fetch(`${gpodurl}api/2/auth/${username}/login.json`, {
      method: 'post',
      headers: new Headers({
        Authorization: 'Basic ' + btoa(username + ':' + password)
      }),
      mode: 'no-cors',
      credentials: 'include'
    }).then(
      res => {
        setUsername(username)
      },
      error => {
        alert('Incorrect username or password')
        console.log(error)
      }
    )
  }

  handleLogout(e) {
    const { gpodurl, setUsername, username } = this.props
    fetch(`${gpodurl}api/2/auth/${username}/logout.json`, {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'include'
    }).then(res => setUsername(null), error => console.log(error))
  }

  checkEnter(e) {
    let code = e.keyCode ? e.keyCode : e.which
    if (code === 13) {
      this.handleLogin(e)
    }
  }

  render() {
    if (this.props.username)
      return <Button onClick={e => this.handleLogout(e)}>Logout</Button>
    else
      return (
        <div>
          <input
            ref={input => (this.user = input)}
            type="text"
            placeholder="username"
          />
          <input
            ref={input => (this.password = input)}
            type="password"
            placeholder="password"
            onKeyPress={e => this.checkEnter(e)}
          />

          <Button onClick={e => this.handleLogin(e)}>Login</Button>
        </div>
      )
  }
}

Login.propTypes = {
  /**
   * base url for gpodder.net api
   */
  gpodurl: PropTypes.string,
  /**
   * username for account logged in at gpodder.net, null if not logged in
   */
  username: PropTypes.string,
  /**
   * function to set username in App.js state
   */
  setUsername: PropTypes.func
}
export default Login
