import React from 'react'
import Body from '../components/Body'

const Error = props => {
  console.log('Error')
  return (
    <Body>
      podcasts={[]}
      subheader="An error has occured" loading={false}
    </Body>
  )
}

export default Error
