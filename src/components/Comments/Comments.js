import React, { useState } from 'react';
import cn from 'classnames';
import './Comments.css';
import { SvgIcon } from '../SvgIcon/SvgIcon';

const htmlDecode = (string) => {
  const doc = new DOMParser().parseFromString(string, "text/html");
  return doc.documentElement.textContent;
}

export default ({ kids, comments }) => {

  const [expandedComments, toggleComment] = useState([]);

  function handleClick(id) {
    const idx = expandedComments.indexOf(id);
    let nextComments = [...expandedComments];
    if (idx > -1) {
      nextComments.splice(idx, 1);
    } else {
      nextComments = [...nextComments, id];
    }
    toggleComment(nextComments);
  }
  console.log('commentsIds', expandedComments);

  return (
    <ul className="comments__list">
        {kids.map((rootCommentId) => {
          const rootComment = comments.find(comment => comment.id === rootCommentId);
          rootComment.isCommentOpen = expandedComments.includes(rootCommentId);

          const commentChild = comments.filter(comment => comment.parent === rootCommentId);
          return (
            <ul key={rootCommentId} className="comments__root-comment">
              <li className="comments__item">
                <div className="comments__description">
                  { commentChild.length ? (
                    <span
                      className={
                        cn("comment__more", { "comment__more_visible" : !rootComment.isCommentOpen})
                      }
                      onClick={() => handleClick(rootCommentId)}
                    >
                      <SvgIcon icon='plus-circle' />
                    </span>
                  ) : null}
                  <span
                    className={
                      cn("comment__more", { "comment__more_visible" : rootComment.isCommentOpen })
                    }
                    onClick={() => handleClick(rootCommentId)}
                  >
                    <SvgIcon icon='minus-circle' />
                  </span>
                  <p className="comment__text">{htmlDecode(rootComment.text)}</p>
                </div>

                { rootComment.isCommentOpen ?
                  <ul className="comments__list comments__child-list">
                  {commentChild.map((comment) => {
                      return (
                        <li key={comment.id} className="comments__item">
                          <p className="comment__text">{htmlDecode(comment.text)}</p>
                        </li>
                      );
                  })}
                </ul> : null}
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

