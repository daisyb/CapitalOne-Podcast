import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Body from '../../components/Body'
import { scaleLogo } from '../../utils'

/**
 * View containing podcasts in a given genre
 */
class Genre extends Component {
  constructor() {
    super()
    this.state = {
      podcasts: [],
      loading: true
    }
  }

  componentDidMount() {
    /* fetch podcasts in genre */
    const fetchPodcasts = async () => {
      let podcasts = await fetch(
        `${this.props.gpodurl}api/2/tag/${encodeURIComponent(
          this.props.match.params.genre
        )}/100.json`
      )
        .then(res => res.json())
        .then(
          result => result,
          error => {
            console.log(error)
          }
        )
      if (podcasts) {
        podcasts = podcasts
          .map(podcast => {
            podcast.scaled_logo_url = scaleLogo(
              podcast.scaled_logo_url,
              this.props.logo_scale
            )
            return podcast
          })
          .sort((a, b) => {
            return b.subscribers - a.subscribers
          })
      }
      this.setState({ podcasts, loading: false })
    }
    fetchPodcasts()
  }

  render() {
    const { podcasts, loading } = this.state
    const { logo_scale, match } = this.props
    const subheader = match.params.genre
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

Genre.propTypes = {
  /**
   * base url for gpodder.net api
   */
  gpodurl: PropTypes.string,
  /**
   * Scale for logo images, controls size of Card components
   */
  logo_scale: PropTypes.number,
  /**
   * react-router match prop
   */
  match: PropTypes.object
}
export default Genre
