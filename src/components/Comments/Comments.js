import React, { useState } from 'react';
import cn from 'classnames';
import './Comments.css';
import { SvgIcon } from '../SvgIcon/SvgIcon';

const htmlDecode = (string) => {
  const doc = new DOMParser().parseFromString(string, "text/html");
  return doc.documentElement.textContent;
}

export default ({ kids, comments }) => {

  const [isCommentOpen, toggleComment] = useState(false);

  function handleClick() {
    toggleComment(!isCommentOpen);
  }
  return (
    <ul className="comments__list">
        {kids.map((rootCommentId) => {
          const rootComment = comments.find(comment => comment.id === rootCommentId);
          const commentChild = comments.filter(comment => comment.parent === rootCommentId);
          console.log(commentChild);


          return (
            <ul key={rootCommentId} className="comments__root-comment">
              <li className="comments__item">
                { commentChild.length ? <span className={cn("comment__more", { "comment__more_visible" : !isCommentOpen })} onClick={handleClick}> <SvgIcon icon='plus-circle' /></span> : null}
                <span className={cn("comment__more", { "comment__more_visible" : isCommentOpen })} onClick={handleClick}><SvgIcon icon='minus-circle' /></span>
                <p>{htmlDecode(rootComment.text)}</p>
                { isCommentOpen &&
                  <ul className="comments__list">
                  {commentChild.map((comment) => {
                      return (
                        <li className="comments__item">
                          <p>{htmlDecode(comment.text)}</p>
                        </li>
                      );
                  })}
                </ul>}
              </li>
            </ul>
          );
          return null;
        })}
      </ul>
  );
}

// const mapStateToProps = ({ comments }) => {
//   console.log(comments);
//   return {
//     comments: comments.comments
//   }
// }

// export default connect(mapStateToProps, null)(Comments)

