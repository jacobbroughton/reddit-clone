import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost, startEditPost } from "../../actions/postActions";
import "./Post.scss";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editPostBody, setEditPostBody] = useState("")

  const { postId } = useParams()

  const handleEditPostFormSubmit = (e, id) => {

    const body = editPostBody

    dispatch(startEditPost({ id, body }))

    e.preventDefault()
  }


  return (
    <div className="post" onClick={() => dispatch(setPost(post))}>
        <Link
          to={`/r/${post.subreddit_name.replace(/\s+/g, "-").toLowerCase()}/${
            post.id
          }`}
          className="post-title"
        >
          {post.title}
        </Link>

        { post.post_type === "link" &&
          <a href={post.body}>{post.body}</a>
        }
      
      <p>r/{post.subreddit_name}</p>
      <p className="post-created-at">{post.created_at}</p>
      {user && user.id === post.author_id && (
        <div>
          <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          <button>Delete</button>
          {isEditing && (
            <form onSubmit={(e) => handleEditPostFormSubmit(e, post.id)}>
              <textarea onChange={(e) => setEditPostBody(e.target.value)}/>
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
