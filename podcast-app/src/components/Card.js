import React, { Component } from 'react'
import styled from 'styled-components'

const CardDiv = styled.div`
  width: fit-content;
  height: fit-content;
`

const Wrapper = styled.div`
  width: ${props => props.scale}px;
  height: ${props => props.scale + 100}px;
  background: white;
  padding: 0px 8px 0px 8px;
  margin: 10px;
  -webkit-box-shadow: 5px 9px 38px -6px rgba(168, 168, 168, 1);
  -moz-box-shadow: 5px 9px 38px -6px rgba(168, 168, 168, 1);
  box-shadow: 5px 9px 38px -6px rgba(168, 168, 168, 1);
`

const Img = styled.img`
  display: block;
  max-width: ${props => props.scale}px;
  max-height: ${props => props.scale}px;
  width: auto;
  height: auto;
`
const Popup = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
const PopupText = styled.div`
  visibility: ${props => (props.popup ? 'visible' : 'hidden')};
  width: 300px;
  background-color: #555;
  color: #fff;
  text-align: justify;
  border-radius: 6px;
  padding: 10px
  position: absolute;
  z-index: 1;

  margin-left: 250px;
  margin-top: 50px;
  &:after,
  &before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-right-color: #555;
    border-width: 5px;
    margin-top: -5px;
  }
  &:before {
    border-right-color: #555;
    border-width: 5px;
    margin-top: -5px;
  }
`
class Card extends Component {
  constructor() {
    super()
    this.state = {
      popup: false
    }
  }

  openPopup(e) {
    this.setState({ popup: true })
  }

  closePopup(e) {
    this.setState({ popup: false })
  }

  render() {
    const { podcast, alt, scale } = this.props
    return (
      <Wrapper scale={scale}>
        <Popup>
          <PopupText {...this.state}>
            <h3>
              {podcast.title}
            </h3>
            <span />
            {podcast.description}
          </PopupText>
        </Popup>

        <CardDiv
          onMouseOver={e => this.openPopup(e)}
          onMouseOut={e => this.closePopup(e)}
        >
          <Img alt={alt} src={podcast.scaled_logo_url} scale={scale} />
          <h3>
            {podcast.title}
          </h3>
        </CardDiv>
      </Wrapper>
    )
  }
}

export default Card
