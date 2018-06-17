import React from 'react'
import PropTypes from 'prop-types'
import Body from '../components/Body'

/**
 * View containing error message
 */
const Error = props => {
  console.log(props.error)
  return (
    <Body>
      podcasts={[]}
      subheader="An error has occured" loading={false}
    </Body>
  )
}
Error.propTypes = {
  /**
   * Information about the error
   */
  error: PropTypes.string
}
export default Error
