import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Body from '../components/Body'

/**
 * View containing list of popular podcasts
 */
class Popular extends Component {
  constructor() {
    super()
    this.state = {
      podcasts: [],
      loading: true
    }
  }

  componentDidMount() {
    /* fetch Top Podcasts */
    fetch(
      `${this.props.gpodurl}toplist/100.json?scale_logo=${this.props
        .logo_scale}`
    )
      .then(res => res.json())
      .then(
        result => this.setState({ podcasts: result, loading: false }),
        error => {
          console.log(error)
        }
      )
  }

  render() {
    const subheader = 'Popular'
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

Popular.propTypes = {
  /**
   * base url for gpodder.net api
   */
  gpodurl: PropTypes.string,
  /**
   * Scale for logo images, controls size of Card components
   */
  logo_scale: PropTypes.number
}

export default Popular
