import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Card from './components/Card'

const Body = styled.div`
  display: flex;
  justify-content: center;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75%;
`

class App extends Component {
  constructor() {
    super()
    this.state = {
      gpodurl: 'http://gpodder.net/',
      username: null,
      podcasts: [],
      logo_scale: 150
    }
    this.setUsername = this.setUsername.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    const fetchData = async () => {
      /* fetch api url */
      const url = await fetch('http://gpodder.net/clientconfig.json')
        .then(res => res.json())
        .then(
          result => result.mygpo.baseurl,
          error => {
            console.log(`using default url: ${this.state.gpodurl}}`)
            return this.state.gpodurl
          }
        )
      /* fetch top podcasts for initial display */
      const podcasts = await fetch(
        `${url}toplist/16.json?scale_logo=${this.state.logo_scale}`
      )
        .then(res => {
          return res.json()
        })
        .then(
          result => result,
          error => {
            this.setState({ error })
          }
        )
      this.setState({ gpodurl: url, podcasts })
    }
    fetchData()
  }

  setUsername(name) {
    this.setState({ username: name })
  }

  search(searchquery) {
    fetch(
      `${this.state.gpodurl}search.json?q=${searchquery}&scale_logo=${this.state
        .logo_scale}`
    )
      .then(res => res.json())
      .then(
        res => this.setState({ podcasts: res }),
        error => this.setState({ error })
      )
  }

  render() {
    const { error, podcasts, logo_scale, gpodurl, username } = this.state
    if (error) {
      return (
        <div>
          Error: {error.message}
        </div>
      )
    } else {
      return (
        <div>
          <Header
            gpodurl={gpodurl}
            setUsername={this.setUsername}
            username={username}
            search={this.search}
          />
          <Body>
            <Grid>
              {podcasts.map((podcast, i) =>
                <Card podcast={podcast} scale={logo_scale} key={i} />
              )}
            </Grid>
          </Body>
        </div>
      )
    }
  }
}

export default App
