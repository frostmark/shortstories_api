// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Textarea from '../Commons/Textarea'
import Button from '../Commons/Button'
import Preloader from '../Commons/Preloader'

import { createStory } from '../../Actions/Commons'

import { conditionalRender } from '../../Utils'

const Wrapper = styled.main`
  margin: 0 auto;
  margin-top: 24px;
  width: 90%;
  max-width: 600px;
`

const Count = styled.p`
  text-align: right;
`

type Props = {
  dispatch: Function,
  isFetching?: boolean,
}

type State = {
  story: string,
}

class CreateStory extends Component<*, Props, State> {
  state = {
    story: '',
  }

  render() {
    const { story } = this.state
    const { isFetching, dispatch } = this.props
    return (
      <Wrapper>
        <Count>{3000 - story.length}</Count>
        <Textarea
          placeholder="Write your story here..."
          maxLength={3000}
          value={story}
          onChange={e => this.setState({ story: e.target.value })}
        />
        <Button
          onClick={() => {
            dispatch(createStory(story))
          }}
          extStyle={{ width: '200px', marginBottom: '30px', float: 'right' }}
        >
          {conditionalRender(isFetching, <Preloader />, <p>Publish your story</p>)}
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ UI }) => ({
  isFetching: UI.createStoryFetching,
})

export default connect(mapStateToProps)(CreateStory)
