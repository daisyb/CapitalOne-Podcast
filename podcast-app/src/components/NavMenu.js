import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavContainer = styled.div`
  display: flex;
  height: 100%;
  margin: 0;
  padding-left: 20%;
`
const Tab = styled.div`
  padding: 15px;
  cursor: pointer;
  border-bottom: ${props => (props.active ? '2px solid #3f11d6' : '')};
`
const NavLink = styled(Link)`
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: inherit;
`
class NavMenu extends Component {
  render() {
    const active = 'popular'
    const { location, tabs } = this.props
    return (
      <NavContainer>
        {Object.keys(tabs).map((key, i) =>
          <NavLink key={i} to={tabs[key]}>
            {location.pathname === tabs[key]
              ? <Tab active>
                  {key}
                </Tab>
              : <Tab>
                  {key}
                </Tab>}
          </NavLink>
        )}
      </NavContainer>
    )
  }
}

export default NavMenu
