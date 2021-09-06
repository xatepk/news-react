import React, { useEffect } from 'react';
import './PostCard.css'
import { connect, useDispatch } from 'react-redux';
import { getData } from '../../utils/PostsApi';
import { addComment } from '../../store/app/actions';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments'

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

  const date = new Date( postToShow.time * 1000 );
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <section className="card">
      <div className="card__header">
        <span className="card__autor">{postToShow.by}</span>
        <span className="card__date">{`${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</span>
      </div>
      <div className="card__description">
        <h3 className="card__title">{postToShow.title}</h3>
        <Link to={postToShow.url} className="card__link">Узнать больше...</Link>
      </div>
      <div className="card__comments">
        <span className="card__comments-icon"></span>
        <span className="card__comments-number">({comments.length})</span>
      </div>
      {postToShow.kids && <Comments {...postToShow} />}

    </section>

  );
}

const mapStateToProps = ({ rootState, comments }) => {
  return {
    posts: rootState.posts,
    comments: comments.comments
  }
}

export default connect(mapStateToProps, null)(PostCard)
