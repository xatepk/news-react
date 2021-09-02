import React from 'react';
import { Link } from 'react-router-dom';

export default ( { id, title, score, by, time }) => {
  return (
    <li className="post">
        <div className="post__description">
          <Link to={`/posts/${id}`} className="post__link">
            <p className="post__title">{title}</p>
            <span className="post__score">{score}</span>
            <span className="post__autor">{by}</span>
            <span className="post__date">{time}</span>
          </Link>
        </div>
    </li>
  )
}
