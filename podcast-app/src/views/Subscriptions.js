import React, { Component } from 'react'
import Body from '../components/Body'
import Error from '../views/Error'

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
    const { username } = this.props
    if (!username) {
      this.setState({ error: 'no username' })
    } else {
      fetch(`${this.props.gpodurl}subscriptions/${this.props.username}.json`)
        .then(res => res.json())
        .then(
          result => this.setState({ podcasts: result, loading: false }),
          error => {
            if (error.status === 401) {
              this.setState({ error: 'not logged in' })
            } else {
              this.setState({ error: 'bad request' })
            }
          }
        )
    }
  }

  render() {
    const subheader = 'Subscriptions'
    const { podcasts, loading, error } = this.state
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

export default Popular
