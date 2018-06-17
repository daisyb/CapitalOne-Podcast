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

/**
 * App logo
 */
const Logo = props => {
  return <LogoContainer>CapPod</LogoContainer>
}

export default Logo
