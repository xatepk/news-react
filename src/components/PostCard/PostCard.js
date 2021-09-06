import React, { useEffect } from 'react';
import './PostCard.css'
import { connect, useDispatch } from 'react-redux';
import { getData } from '../../utils/PostsApi';
import { addComment } from '../../store/app/actions';

const PostCard = ({ posts, match, comments }) => {
  const id = Number(match.params.id);
  const postToShow = posts.find((item) => item.id === id);
  const dispatch = useDispatch();
  console.log('---', comments);

  useEffect(() => {
    if (postToShow.kids) {
      console.log(postToShow);

      getData(postToShow.kids)
      .then((res) => {
        dispatch(addComment(res));
        const allKids = res.flatMap(comment => comment.kids || []);
        getData(allKids)
        .then((result) => {
          dispatch(addComment([...res, ...result]));
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, []);

  return (
    <a target='_blank' href={postToShow.url}>вот тебе ссылочка</a>

  );
}

const mapStateToProps = ({ rootState, comments }) => {
  return {
    posts: rootState.posts,
    comments: comments.comments
  }
}

export default connect(mapStateToProps, null)(PostCard)
