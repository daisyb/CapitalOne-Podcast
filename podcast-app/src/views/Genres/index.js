import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Body from '../../components/Body'

/**
 * View containing list of Genres
 */
class Genres extends Component {
  constructor() {
    super()
    this.state = {
      genres: [],
      loading: true
    }
  }

  componentDidMount() {
    /* fetch Genres */
    const fetchGenres = async () => {
      const tags = await fetch(`${this.props.gpodurl}api/2/tags/100.json`)
        .then(res => {
          return res.json()
        })
        .then(
          result => result,
          error => {
            console.log(error)
          }
        )
      let genres = []
      if (tags) {
        const sorted = tags.sort((a, b) => {
          return b.usage - a.usage
        })
        genres = sorted.map(tag => {
          return {
            ...tag,
            link_to: `${this.props.location.pathname}/${tag.tag}`
          }
        })
      }
      this.setState({ genres, loading: false })
    }
    fetchGenres()
  }

  render() {
    const subheader = 'Genres'
    const { genres, loading } = this.state
    const { logo_scale } = this.props
    return (
      <Body
        resources={genres}
        subheader={subheader}
        loading={loading}
        logo_scale={logo_scale}
      />
    )
  }
}

Genres.propTypes = {
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
export default Genres
