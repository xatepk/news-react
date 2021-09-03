import React from 'react';
import './PostCard.css'
import { connect } from 'react-redux';

const PostCard = ({ posts, match }) => {
  const id = Number(match.params.id);
  const postToShow = posts.find((item) => item.id === id);
  return (
    <a target='_blank' href={postToShow.url}>вот тебе ссылочка</a>

  );
}

const mapStateToProps = ({ rootState }) => {
  return {
    posts: rootState.posts,
  }
}

export default connect(mapStateToProps, null)(PostCard)
