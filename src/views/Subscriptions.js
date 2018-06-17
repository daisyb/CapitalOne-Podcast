import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Body from '../components/Body'
import Error from '../views/Error'

/**
 * View containg subscribed podcasts
 */
class Subscriptions extends Component {
  constructor() {
    super()
    this.state = {
      podcasts: [],
      loading: true
    }
  }

  componentDidMount() {
    /* fetch Subscribed Podcasts */
    const { username } = this.props
    if (!username) {
      this.setState({ subheader: 'Please login to continue', loading: false })
    } else {
      fetch(`${this.props.gpodurl}subscriptions/${this.props.username}.json`)
        .then(res => res.json())
        .then(
          result => {
            console.log(result)
            this.setState({
              podcasts: result,
              loading: false,
              subheader: `${this.props.username}'s Subscriptions`
            })
          },
          error => {
            this.setState({
              subheader: 'Please login to continue',
              loading: false
            })
          }
        )
    }
  }

  render() {
    const { podcasts, loading, error, subheader } = this.state
    const { logo_scale } = this.props
    if (error) {
      return <Error error={error} />
    }
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

Subscriptions.propTypes = {
  /**
   * base url for gpodder.net api
   */
  gpodurl: PropTypes.string,
  /**
   * username for account logged in at gpodder.net, null if not logged in
   */
  username: PropTypes.string,
  /**
   * Scale for logo images, controls size of Card components
   */
  logo_scale: PropTypes.number
}
export default Subscriptions
