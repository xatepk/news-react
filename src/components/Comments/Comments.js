import React from 'react';

export default ({ kids }) => {

  return (
    <ul className="comments__list">
        {kids.map((rootComment) => {
          return (
            <ul className="comments__root-comment">
              {rootComment}
            </ul>
          );
          return null;
        })}
      </ul>
  );
}

