import React, { Component } from 'react'
import Body from '../../components/Body'

class Genres extends Component {
  constructor() {
    super()
    this.state = {
      genres: [],
      loading: true
    }
  }

  componentDidMount() {
    /* fetch Top Podcasts */
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
            link_to: tag.tag
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

export default Genres
