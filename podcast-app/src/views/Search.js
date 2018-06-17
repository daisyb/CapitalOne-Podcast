import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Body from '../components/Body'
import { getUrlParam } from '../utils'

/**
 * View containing search results
 */
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
        popups
      />
    )
  }
}

Search.propTypes = {
  /**
   * base url for gpodder.net api
   */
  gpodurl: PropTypes.string,
  /**
   * Scale for logo images, controls size of Card components
   */
  logo_scale: PropTypes.number,
  /**
   * react-router location prop
   */
  location: PropTypes.object
}
export default Search
