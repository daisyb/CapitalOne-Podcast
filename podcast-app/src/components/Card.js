import React, { Component } from 'react'
import styled from 'styled-components'
import defaultImg from '../resources/default.png'
import { Link } from 'react-router-dom'
import { getColorCode } from '../utils'

const Wrapper = styled.div`
  width: ${props => props.scale}px;
  height: ${props => props.scale + 110}px;
  background: white;
  padding: 0px 10px 0px 10px;
  margin: 10px;
  -webkit-box-shadow: 5px 9px 38px -6px rgba(168, 168, 168, 1);
  -moz-box-shadow: 5px 9px 38px -6px rgba(168, 168, 168, 1);
  box-shadow: 5px 9px 38px -6px rgba(168, 168, 168, 1);
`
const CardDiv = styled.div`
  width: ${props => props.scale}px;
  height: ${props => props.scale + 90}px;
  overflow: hidden;
`

const Img = styled.img`
  display: block;
  max-width: ${props => props.scale}px;
  max-height: ${props => props.scale}px;
  width: auto;
  height: auto;
`

const ImgWrap = styled.div`
  width: ${props => props.scale}px;
  height: ${props => props.scale}px;
  background: ${props => props.color};
`

const Title = styled.h3`
  padding: 0;
  margin: 0;
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
  width: 200px;
  font-size: 13px;
  background-color: #424242;
  color: #fff;
  text-align: justify-left;
  padding: 10px
  position: absolute;
  z-index: 1;
  margin-left: ${props => props.scale + 15}px;
  &:after,
  &before {
    right: 100%;
    top: 25%;
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

const StyledLink = styled(Link)`
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: inherit;
`
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

class Card extends Component {
  constructor() {
    super()
    this.state = {
      popup: false
    }
  }

  openPopup(e) {
    if (this.props.popup) this.setState({ popup: true })
  }

  closePopup(e) {
    if (this.props.popup) this.setState({ popup: false })
  }

  loadDefaultImg(e) {
    e.target.src = defaultImg
  }

  render() {
    const { resource, scale, popup } = this.props
    return (
      <Wrapper scale={scale}>
        {popup
          ? <Popup>
              <PopupText popup={this.state.popup} scale={scale}>
                <Title>
                  {resource.title}
                </Title>
                <span>
                  {resource.subscribers} subscribers<br />
                </span>
                <br />
                <span />
                {resource.description}
              </PopupText>
            </Popup>
          : ''}
        <MaybeLink to={resource.link_to}>
          <CardDiv
            onMouseOver={e => this.openPopup(e)}
            onMouseOut={e => this.closePopup(e)}
            scale={scale}
          >
            {resource.scaled_logo_url
              ? <ImgWrap scale={scale}>
                  <Img
                    alt="Image not available"
                    src={resource.scaled_logo_url}
                    scale={scale}
                    onError={e => this.loadDefaultImg(e)}
                  />
                </ImgWrap>
              : <ImgWrap scale={scale} color={getColorCode()} />}
            <h3>
              {resource.title}
            </h3>
          </CardDiv>
        </MaybeLink>
      </Wrapper>
    )
  }
}

export default Card
