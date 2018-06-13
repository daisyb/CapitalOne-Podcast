import React, { Component } from 'react'
import styled from 'styled-components'

const SearchArea = styled.input`
  box-sizing: border-box;
  width: 100%;
  size: 20px;
  border: none;
`

const Container = styled.div`
  width: 50%;
  display: flex;
  > * {
    padding: 10px 10px 10px 10px;
  }

  border-radius: 5px;
  border: 2px solid #dadcdc;
`

const SearchButton = styled.button`border: none;`

class SearchBar extends Component {
  executeSearch(e) {
    const query = this.searchtext.value
    this.props.search(query)
    this.searchtext.value = null
  }

  render() {
    return (
      <Container>
        <SearchArea
          type="text"
          placeholder="Search"
          innerRef={comp => (this.searchtext = comp)}
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
