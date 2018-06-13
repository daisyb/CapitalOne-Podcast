import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Card from './components/Card'
import Loading from './resources/loading.gif'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75%;
`

const SubHeader = styled.h1`width: 70%;`

class App extends Component {
  constructor() {
    super()
    this.state = {
      gpodurl: 'http://gpodder.net/',
      username: null,
      podcasts: [],
      logo_scale: 150,
      subheader: 'Popular',
      loading: false
    }
    this.setUsername = this.setUsername.bind(this)
    this.search = this.search.bind(this)
    this.renderBody = this.renderBody.bind(this)
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
        `${url}toplist/20.json?scale_logo=${this.state.logo_scale}`
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
    this.setState({ loading: true })
    fetch(
      `${this.state.gpodurl}search.json?q=${searchquery}&scale_logo=${this.state
        .logo_scale}`
    )
      .then(res => res.json())
      .then(
        res => {
          this.setState({ subheader: `Search results for '${searchquery}'` })
          this.setState({ podcasts: res })
          this.setState({ loading: false })
        },
        error => this.setState({ error })
      )
  }

  renderBody() {
    const { podcasts, subheader, loading, logo_scale } = this.state
    if (loading) {
      return (
        <Body>
          <img alt="Data is loading" src={Loading} />
        </Body>
      )
    } else if (podcasts === undefined || !podcasts.length) {
      return (
        <Body>
          <SubHeader>
            {subheader}
          </SubHeader>
          <h2>No Results Found</h2>
        </Body>
      )
    }
    return (
      <Body>
        <SubHeader>
          {subheader}
        </SubHeader>
        <Grid>
          {podcasts.map((podcast, i) =>
            <Card podcast={podcast} scale={logo_scale} key={i} />
          )}
        </Grid>
      </Body>
    )
  }
  render() {
    const { error, gpodurl, username } = this.state
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
          {this.renderBody()}
        </div>
      )
    }
  }
}

export default App
