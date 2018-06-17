import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

const SearchArea = styled.input`
  box-sizing: border-box;
  width: 100%;
  size: 10px;
  border: none;
  padding: 0;
  margin: 0;
`

const Container = styled.div`
  width: 50%;
  height: 30px;
  display: flex;
  > * {
    padding: 10px;
  }

  border-radius: 5px;
  border: 2px solid #dadcdc;
`

const SearchButton = styled.button`border: none;`

/**
 * Search bar for podcasts
 */
class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      redirectToSearch: false,
      query: ''
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.redirectToSearch) {
      this.setState({ redirectToSearch: false })
    }
  }

  executeSearch(e) {
    e.preventDefault()
    const query = this.searchtext.value
    this.setState({ redirectToSearch: true, query })
  }

  checkEnter(e) {
    let code = e.keyCode ? e.keyCode : e.which
    if (code === 13) {
      this.executeSearch(e)
    }
  }

  render() {
    const { redirectToSearch, query } = this.state
    if (redirectToSearch) {
      return (
        <Redirect
          to={{
            pathname: '/Search',
            search: `?q=${query}`
          }}
        />
      )
    }
    return (
      <Container>
        <SearchArea
          type="text"
          placeholder="Search"
          innerRef={comp => (this.searchtext = comp)}
          onKeyPress={e => this.checkEnter(e)}
        />
        <SearchButton type="submit" onClick={e => this.executeSearch(e)}>
          <span role="img" aria-label="search">
            &#x1F50D;
          </span>
        </SearchButton>
      </Container>
    )
  }
}

export default SearchBar
