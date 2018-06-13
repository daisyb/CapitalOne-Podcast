import React, { Component } from 'react'
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

class Login extends Component {
  handleLogin(e) {
    const username = this.user.value
    const password = this.password.value
    const { gpodurl, setUsername } = this.props
    fetch(`${gpodurl}api/2/auth/${username}/login.json`, {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Basic ' + btoa(username + ':' + password)
      }),
      mode: 'no-cors',
      credentials: 'include'
    }).then(res => {
      if (res.ok && res.status === 200) setUsername(username)
      else if (res.status === 401) alert('incorrect username or password')
      else {
        console.log(res)
        setUsername(username)
      }
    })
  }

  handleLogout(e) {
    const { gpodurl, setUsername, username } = this.props
    fetch(`${gpodurl}api/2/auth/${username}/logout.json`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => setUsername(null), error => console.log(error))
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
          />

          <Button onClick={e => this.handleLogin(e)}>Login</Button>
        </div>
      )
  }
}

export default Login
