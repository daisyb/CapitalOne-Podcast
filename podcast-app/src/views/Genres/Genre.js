import React, { Component } from 'react'
import Body from '../../components/Body'
import { scaleLogo } from '../../utils'
class Genre extends Component {
  constructor() {
    super()
    this.state = {
      podcasts: [],
      loading: true
    }
  }

  componentDidMount() {
    const fetchPodcasts = async () => {
      let podcasts = await fetch(
        `${this.props.gpodurl}api/2/tag/${encodeURIComponent(
          this.props.match.params.genre
        )}/20.json`
      )
        .then(res => res.json())
        .then(
          result => result,
          error => {
            console.log(error)
          }
        )
      if (podcasts) {
        podcasts = podcasts.map(podcast => {
          podcast.scaled_logo_url = scaleLogo(
            podcast.scaled_logo_url,
            this.props.logo_scale
          )
          return podcast
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

export default Genre
