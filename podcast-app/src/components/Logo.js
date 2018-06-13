import React from 'react'
import styled from 'styled-components'

const LogoContainer = styled.div`
  font-size: 45px;
  padding: 2%;
  display: flex;
  justify-content: right;
  background: #0099ff;
  color: white;
`
const Logo = props => {
  return <LogoContainer>Clever Name</LogoContainer>
}

export default Logo
