import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';

const Post = ( { id, title, score, by, time }) => {
  const date = new Date( time * 1000 );
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <li className="post">
      <Link to={`/${id}`} className="post__link">
        <span className="post__score">{score}</span>
        <div className="post__description">
          <span className="post__date">{`${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</span>
           <h3 className="post__title">{title}</h3>
          <span className="post__autor">{by}</span>
        </div>
      </Link>
    </li>
  )
}

export default Post;
