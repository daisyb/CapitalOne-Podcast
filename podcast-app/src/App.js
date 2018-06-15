import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Error from './views/Error'
import Popular from './views/Popular'
import Search from './views/Search'
import Genres from './views/Genres'
import Genre from './views/Genres/Genre'

class App extends Component {
  constructor() {
    super()
    this.state = {
      gpodurl: 'http://gpodder.net/',
      username: null,
      logo_scale: 150
    }
    this.setUsername = this.setUsername.bind(this)
  }

  setUsername(name) {
    this.setState({ username: name })
  }

  render() {
    const { gpodurl, username, logo_scale } = this.state
    return (
      <div>
        <Header
          gpodurl={gpodurl}
          setUsername={this.setUsername}
          username={username}
          location={this.props.location}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() =>
              <Popular gpodurl={gpodurl} logo_scale={logo_scale} />}
          />
          <Route
            exact
            path="/Search"
            component={props =>
              <Search
                gpodurl={gpodurl}
                logo_scale={logo_scale}
                location={props.location}
              />}
          />
          <Route
            exact
            path="/Genres"
            component={props =>
              <Genres gpodurl={gpodurl} logo_scale={logo_scale} />}
          />
          <Route
            exact
            path="/Genres:genre"
            component={props =>
              <Genre gpodurl={gpodurl} logo_scale={logo_scale} />}
          />

          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export default App
