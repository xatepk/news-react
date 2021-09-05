import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';

export default ( { id, title, score, by, time }) => {
  return (
    <li className="post">
      <Link to={`/posts/${id}`} className="post__link">
        <span className="post__score">{score}</span>
        <div className="post__description">
          <span className="post__date">{time}</span>
          <h3 className="post__title">{title}</h3>
          <span className="post__autor">{by}</span>
        </div>
      </Link>
    </li>
  )
}
