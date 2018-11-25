import React, { Component } from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import BigLoader from './BigLoader'
import StoryItem from './StoryItem'
import StoriesList from './styles/StoriesList'

const ALL_STORIES_QUERY = gql`
  query ALL_STORIES_QUERY($cursor: String) {
    stories(cursor: $cursor, limit: 20) @connection(key: "StoriesConnection") {
      edges {
        id
        title
        body
        user {
          id
          username
          photo
        }
        likedBy {
          id
          userId
        }
        dislikedBy {
          id
          userId
        }
        viewedBy {
          id
          userId
        }
        comments {
          id
          body
          user {
            id
            username
          }
          createdAt
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

class Stories extends Component {
  render() {
    return (
      <Query query={ALL_STORIES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <BigLoader />
          if (error) return <p>Error: {error.message}</p>
          if (!data.stories.edges.length)
            return (
              <>
                <h2>No stories yet</h2>
                <Link href="/create-story">
                  Be the first{' '}
                  <span role="img" aria-label="fire">
                    🔥
                  </span>
                </Link>
              </>
            )
          return (
            <StoriesList>
              {data.stories.edges.map((story, index) => (
                <StoryItem key={story.id} story={story} index={index} />
              ))}
            </StoriesList>
          )
        }}
      </Query>
    )
  }
}

export default Stories
