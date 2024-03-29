import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, updatePost } from "../redux/postsSlice";
import "./Posts.css";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const posts = useSelector((state) => state.posts.posts);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  return (
    <div className="form-container">
      <form action="Post">
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          placeholder="Enter Post title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="desc"
          id="desc"
          required
          value={description}
          placeholder="Enter Post Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (title.length > 0 && description.length > 0) {
              dispatch(addPost({ title, description, id: posts.length + 1 }));
              setDescription("");
              setTitle("");
            }
          }}
        >
          Add Post
        </button>
      </form>
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <button
                onClick={() => {
                  setIsEdit(true);
                  setId(post.id);
                }}
              >
                Edit
              </button>
              <button onClick={() => dispatch(deletePost({ id: post.id }))}>
                Delete
              </button>
              {isEdit && id == post.id && (
                <>
                  <input
                    type="text"
                    placeholder="Update Title"
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Update Description"
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      dispatch(
                        updatePost({
                          id: post.id,
                          title: updatedTitle,
                          description: updatedDescription,
                        }),
                        setIsEdit(false)
                      )
                    }
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>There are no posts.</p>
        )}
      </div>
    </div>
  );
}
