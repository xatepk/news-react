import React, { useEffect, useRef } from 'react';
import './PostCard.css'
import { connect, useDispatch } from 'react-redux';
import { getData } from '../../utils/PostsApi';
import { addComment } from '../../store/app/actions';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { SvgIcon } from '../../components/SvgIcon/SvgIcon';
import Preloader from '../Preloader/Preloader';

const PostCard = ({ posts, match, comments, handleGoBack, interval }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const intervalRef = useRef(null);

  let postToShow = posts.find((item) => item.id === parseInt(id));
  const updateComments = () => {
    getData(postToShow.kids)
      .then((res) => {
        const allKids = res.flatMap(comment => comment.kids || []);
        getData(allKids)
        .then((result) => {
          dispatch(addComment([...res, ...result]));
        })
        .catch(err => {
          console.warn(err);
        })
      })
      .catch(err => {
        console.warn(err);
      });
  };

  useEffect(() => {
    if (postToShow) {
      if (interval) {
        clearInterval(interval);
      }
      if (postToShow.kids) {
        updateComments();
        intervalRef.current = setInterval(updateComments, 5000);
      }
    }

    return () => {
      dispatch(addComment([]));
      return clearInterval(intervalRef.current);
    }

  }, [postToShow]);

  if (!postToShow || !comments) {
    return <Preloader />
  }
  const date = new Date( postToShow.time * 1000 );
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <section className="card">
      <button className="card__link" onClick={handleGoBack}>Назад</button>
      <div className="card__header">
        <span className="card__autor">{postToShow.by}</span>
        <span className="card__date">{`${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</span>
      </div>
      <div className="card__description">
        <h3 className="card__title">{postToShow.title}</h3>
        <a href={postToShow.url} className="card__link" target='_blank'>Узнать больше...</a>
      </div>
      <div className="card__comments">
        <SvgIcon />
        <span className="card__comments-number">({comments.length})</span>
      </div>
      {comments.length ? <Comments { ...{ ...postToShow, comments }} /> : null}

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
