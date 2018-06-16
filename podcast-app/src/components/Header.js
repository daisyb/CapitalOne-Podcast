import React, { Component } from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import Login from './Login'
import NavMenu from './NavMenu'

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

class Header extends Component {
  render() {
    const { gpodurl, username, setUsername, location } = this.props
    return (
      <Container>
        <TopContainer>
          <Left>
            <Logo>Clever Name</Logo>
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

export default Header
