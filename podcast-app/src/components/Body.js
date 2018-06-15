import React, { Component } from 'react'
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

class Body extends Component {
  render() {
    const {
      resources,
      subheader,
      loading,
      loading_gif,
      logo_scale
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
            <Card resource={resource} scale={logo_scale} key={i} />
          )}
        </Grid>
      </Container>
    )
  }
}

export default Body
