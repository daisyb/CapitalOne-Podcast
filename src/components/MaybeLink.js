import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: inherit;
`

/**
 * If props.to is present wraps children in link to props.to
 * Otherwise does nothing
 */
const MaybeLink = props => {
  if (props.to) {
    return (
      <StyledLink to={props.to}>
        {props.children}
      </StyledLink>
    )
  }
  return props.children
}

MaybeLink.propTypes = {
  /**
   * url to link to
   */
  to: PropTypes.string
}
export default MaybeLink
