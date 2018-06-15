import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Body from '../components/Body'
import { getUrlParam } from '../utils'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      podcasts: [],
      loading: true,
      query: ''
    }
  }

  componentDidMount() {
    /* fetch podcasts that match query*/
    const query = getUrlParam(this.props.location.search, 'q')
    if (query) {
      fetch(
        `${this.props.gpodurl}search.json?q=${query}&scale_logo=${this.props
          .logo_scale}`
      )
        .then(res => res.json())
        .then(
          res => {
            this.setState({
              podcasts: res,
              loading: false,
              query
            })
          },
          error => console.log(error)
        )
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    if (this.state.query === '' && !this.state.loading) {
      return <Redirect to="/" />
    }
    const subheader = `Search results for '${this.state.query}'`
    const { podcasts, loading } = this.state
    const { logo_scale } = this.props

    return (
      <Body
        resources={podcasts}
        subheader={subheader}
        loading={loading}
        logo_scale={logo_scale}
        loading_gif
      />
    )
  }
}

export default Search
