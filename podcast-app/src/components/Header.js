import React from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import Login from './Login'

const Container = styled.div`
  padding: 2%;
  display: flex;
  justify-content: space-between;
  background: #0099ff;
  color: white;
  border-bottom: 2px solid #dadcdc;
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
  font-size: 30px;
  width: 200px;
`

const Header = props => {
  return (
    <Container>
      <Left>
        <Logo>Clever Name</Logo>
        <SearchBar search={props.search} />
      </Left>
      <Right>
        <Login
          gpodurl={props.gpodurl}
          username={props.username}
          setUsername={props.setUsername}
        />
      </Right>
    </Container>
  )
}

export default Header
