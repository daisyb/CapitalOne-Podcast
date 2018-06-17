import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './Card'
import Loading from '../resources/loading.gif'

const Container = styled.div`
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

/**
 * Container for cards and error messages
 */
class Body extends Component {
  render() {
    const {
      resources,
      subheader,
      loading,
      loading_gif,
      logo_scale,
      popups
    } = this.props
    if (loading && loading_gif) {
      return (
        <Container>
          <img alt="Data is loading" src={Loading} />
        </Container>
      )
    } else if ((resources === undefined || !resources.length) && !loading) {
      return (
        <Container>
          <SubHeader>
            {subheader}
          </SubHeader>
          <h2>No Results Found</h2>
        </Container>
      )
    }
    return (
      <Container>
        <SubHeader>
          {subheader}
        </SubHeader>
        <Grid>
          {resources.map((resource, i) =>
            <Card
              resource={resource}
              scale={logo_scale}
              key={i}
              popup={popups}
            />
          )}
        </Grid>
      </Container>
    )
  }
}

Body.propTypes = {
  /**
   * Array containing resources objects to popuplate <Card/>s with
   * Objects should contain the following fields
   * {
   *    title: string, //required
   *    description: string, //optional
   *    subscribers: number, //optional
   *    scaled_logo_url: string, //optional, url for logo image
   *    link_to: string //optional, //if present card will link out
   * }
   * Almost all of these field are returned in 
   * gpodder.net's api calls for podcasts
   */
  resources: PropTypes.arrayOf(PropTypes.object),
  /**
   * Header describing contents of Body
   */
  subheader: PropTypes.string,
  /**
   * Scale for logo images, controls size of <Card/>s
   */
  logo_scale: PropTypes.number,
  /**
   * State information about whether data is being loaded from the api or not
   */
  loading: PropTypes.bool,
  /**
   * If true, generate loading gif while waiting for data
   */
  loading_gif: PropTypes.bool,
  /**
   * If true, display further information about resources on hover
   */
  popups: PropTypes.bool
}
export default Body
