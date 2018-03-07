// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { conditionalRender } from '../../../utils'

const StyledStory = styled.div`
  padding: 0;
  margin: 0;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  color: #555;
  border: 3px solid #eee;
  box-sizing: border-box;
  hyphens: auto;
  word-wrap: break-word;
`

const BottomGradient = styled.span`
  background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.75), #fff);
  display: block;
  position: absolute;
  bottom: 16px;
  padding-top: 30px;
  width: calc(100% - 40px);
`

const StoryText = styled.div`
  max-height: 660px;
  overflow: hidden;
`

type Props = {
  story: string,
}

class Story extends Component<any, Props, any> {
  state = {
    isLong: false,
  }

  componentDidMount() {
    this.setState({ isLong: this.story.offsetHeight === 660 })
  }

  story: Object

  render() {
    const { story } = this.props
    const { isLong } = this.state
    return (
      <StyledStory isLong={isLong}>
        <StoryText
          innerRef={(n) => {
            this.story = n
          }}
          dangerouslySetInnerHTML={{ __html: story }}
        />
        {conditionalRender(isLong, <BottomGradient />)}
      </StyledStory>
    )
  }
}

export default Story
