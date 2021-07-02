import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getElapsedTime } from "../GetElapsedTime";
import { startEditComment, deleteComment } from "../../actions/commentsActions";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { ReactComponent as CommentIcon } from "../../images/comment-icon.svg";
import CommentForm from "../CommentForm/CommentForm";
import "./Comment.scss";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.post);
  const darkMode = useSelector((state) => state.darkMode);
  const comments = useSelector((state) => state.comments);

  const [childComments, setChildComments] = useState([]);
  const [toggleCommentReply, setToggleCommentReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentBody, setEditCommentBody] = useState();
  const [threadToggle, setThreadToggle] = useState(true);

  let createdAt = getElapsedTime(comment.created_at);

  const getChildComments = (comment) => {
    return comments.filter(
      (filteredComment) => filteredComment.parent_comment === comment.id
    );
  };

  useEffect(() => {
    setChildComments(getChildComments(comment));
  }, []);

  const handleEditCommentFormSubmit = (e, id) => {
    const body = editCommentBody;

    dispatch(startEditComment({ id, body }));
    setIsEditing(!isEditing);

    e.preventDefault();
  };

  useEffect(() => {
    setEditCommentBody(comment.body);
  }, [isEditing]);

  return (
    <div className="comment-thread">
      <div className={`comment ${darkMode && "dark"}`}>
        <div className="comment-main-section">
          <p className="comment-metadata">
            <span className="user">{comment.username}</span>
            {createdAt}
          </p>

          <div className="comment-body">
            {user && user.id === comment.author_id && isEditing ? (
              <form
                className="edit-comment-form"
                onSubmit={(e) => {
                  handleEditCommentFormSubmit(e, comment.id);
                }}
              >
                <textarea
                  value={editCommentBody}
                  onChange={(e) => setEditCommentBody(e.target.value)}
                />
                <div className="save-and-cancel">
                  <button type="submit">Save</button>
                  <button onClick={() => setIsEditing(!isEditing)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p className="comment-body-text">{comment.body}</p>
            )}
          </div>

          {user && (
            <>
              {!toggleCommentReply && (
                <button
                  className="reply-button"
                  onClick={() => setToggleCommentReply(!toggleCommentReply)}
                >
                  <CommentIcon className="comment-icon" /> Reply
                </button>
              )}

              {toggleCommentReply && (
                <CommentForm
                  post={post}
                  parentComment={comment.id}
                  setToggleCommentReply={setToggleCommentReply}
                  alwaysOpen={false}
                />
              )}
            </>
          )}
        </div>

        {user && user.id === comment.author_id && (
          <div className="commented-user-accessable-options">
            {!isEditing && (
              <button onClick={() => setIsEditing(!isEditing)}>
                <EditIcon className="edit-icon" />
              </button>
            )}

            <button onClick={() => dispatch(deleteComment(comment.id))}>
              <DeleteIcon className="delete-icon" />
            </button>
          </div>
        )}
      </div>

      {comments && (
        <>
          <div className="nested-comment">
            <p
              onClick={() => setThreadToggle(!threadToggle)}
              className="replies-toggle"
            >
              {`${threadToggle ? "Hide " : "Show "}`}replies
            </p>
            {comments.map(
              (eachComment, key) =>
                eachComment.parent_comment === comment.id &&
                threadToggle && (
                  <div className="bar-and-comment">
                    <div
                      onClick={() => setThreadToggle(!threadToggle)}
                      className="bar"
                    ></div>
                    <Comment key={key} comment={eachComment} />
                  </div>
                )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
