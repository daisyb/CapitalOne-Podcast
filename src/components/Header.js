import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import Login from './Login'
import NavMenu from './NavMenu'
import MaybeLink from './MaybeLink'

const Container = styled.div`
  padding: 20px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  // background: #0099ff;
  background: #cedbff;
  border-bottom: 2px solid #dadcdc;
  margin: 0;
  width: 100%;
`
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Left = styled.div`
  width: 75%;
  display: flex;
  justify-content: flext-start;
`
const Right = styled.div`
  display: flex;
  justify-content: flext-end;
`
const Logo = styled.div`
  font-size: 25px;
  width: 200px;
`
/**
 * Navigation Header to be rendered at the top of every page
 */
class Header extends Component {
  render() {
    const { gpodurl, username, setUsername, location } = this.props
    return (
      <Container>
        <TopContainer>
          <Left>
            <MaybeLink to="/">
              <Logo>PodSearch</Logo>
            </MaybeLink>
            <SearchBar />
          </Left>
          <Right>
            <Login
              gpodurl={gpodurl}
              username={username}
              setUsername={setUsername}
            />
          </Right>
        </TopContainer>
        <NavMenu
          location={location}
          tabs={{
            POPULAR: '/',
            SUBSCRIPTIONS: '/Subscriptions',
            GENRES: '/Genres'
          }}
        />
      </Container>
    )
  }
}

Header.propTypes = {
  /**
   * base url for gpodder.net api
   */
  gpodurl: PropTypes.string,
  /**
   * username for account logged in at gpodder.net, null if not logged in
   */
  username: PropTypes.string,
  /**
   * function to set username in App.js state
   */
  setUsername: PropTypes.func,
  /**
   * react-router location prop
   */
  location: PropTypes.object
}

export default Header
