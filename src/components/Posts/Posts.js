import React from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post'

const Posts = ({ posts, dataFetching }) => {
  if (dataFetching) {
      return <p>loading...</p>;
  }
  if (!posts.length) {
    return <p className="posts__status">Новостей пока нет</p>
  }
  return posts.map(post => <Post />)
}

const mapStateToProps = ({ rootState }) => {
  return {
    posts: rootState.posts,
    dataFetching: rootState.dataFetching,
  }
}

export default connect(mapStateToProps, null)(Posts)
