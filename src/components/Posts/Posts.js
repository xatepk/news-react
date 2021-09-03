import React from 'react';
import { connect } from 'react-redux';
import './Posts.css';
import Post from '../Post/Post';
import Preloader from '../Preloader/Preloader'

const Posts = ({ posts, dataFetching }) => {
  if (dataFetching) {
      return <Preloader />;
  }

  return (
    <section className="posts__block">
      {!posts.length && <p className="movies__message">Новостей пока нет</p>}
      <ul className="posts__list">
        {posts.map((post, idx) => {
          if (idx < 100) {
            return (
              <Post
              {...post}
              key={post.id}
              />
            );
          }
          return null;
        })}
      </ul>
    </section>
  );
}

const mapStateToProps = ({ rootState }) => {
  return {
    posts: rootState.posts,
    dataFetching: rootState.dataFetching,
  }
}

export default connect(mapStateToProps, null)(Posts)
