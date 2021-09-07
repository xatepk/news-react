import React, { useEffect } from 'react';
import './PostCard.css'
import { connect, useDispatch } from 'react-redux';
import { getData } from '../../utils/PostsApi';
import { addComment } from '../../store/app/actions';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { SvgIcon } from '../../components/SvgIcon/SvgIcon';

const PostCard = ({ posts, match, comments, handleGoBack }) => {
  const id = Number(match.params.id);
  const postToShow = posts.find((item) => item.id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postToShow.kids) {
      getData(postToShow.kids)
      .then((res) => {
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
      <Link className="back__link" onClick={handleGoBack}>Назад</Link>
      <div className="card__header">
        <span className="card__autor">{postToShow.by}</span>
        <span className="card__date">{`${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</span>
      </div>
      <div className="card__description">
        <h3 className="card__title">{postToShow.title}</h3>
        <Link to={postToShow.url} className="card__link">Узнать больше...</Link>
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
