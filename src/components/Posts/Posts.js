import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../utils/PostsApi';
import Post from '../Post/Post'

const Posts = ({syncPosts}) => {
  if (!syncPosts.length) {
    return <p className="posts__status">Новостей пока нет</p>
  }
  return syncPosts.map(post => <Post />)
}

const mapStateToProps = state => {

  getPosts()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });

  return {
    syncPosts: []
  }
}

export default connect(mapStateToProps, null)(Posts)
