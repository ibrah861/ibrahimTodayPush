import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// import Components
import auth from "../utility/axios/AxiosApi";

const PostDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //   states
  const [title, setTitle] = useState("");
  const [subtitle, setsubTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [accept, setAccept] = useState(true);
  const [Deleter, setDelete] = useState(false);

  const [count, setCount] = useState(5);
  const [start, setStart] = useState(false);

  const deletePost = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await auth.delete(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!start) return;
    if (count === 0 && start) {
      deletePost();
      navigate("/view");
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [start, count]);

  // function for fetching blog post
  const blogpost = async () => {
    // states

    // get token from localStorage
    const token = localStorage.getItem("token");
    const singlePost = await auth.get(`/post/${id}`, {
      // jwt header bearer tokens
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataPrefix = singlePost.data.onePost;

    setTitle(dataPrefix.title);
    setsubTitle(dataPrefix.subtitle);
    setContent(dataPrefix.content);
    setImage(dataPrefix.Image);
  };

  useEffect(() => {
    blogpost();
  }, []);

  const confirmDelete = () => {
    setAccept(false);
  };

  const deleteButton = () => {
    setDelete(true);
  };
  const cencelDelete = () => {
    setDelete(false);
  };

  const handleUndo = () => {
    cencelDelete();
    setAccept(true);
    setStart(false);
    setCount(5);
  };

  const update = () => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      <div className="main">
        <div></div>
        <div className="post-button">
          <button onClick={update}>Update</button>
          <button onClick={deleteButton}>Delete</button>
        </div>
        {Deleter && (
          <>
            <div className="delete-confirm">
              {accept ? (
                <div>
                  <p className="sure">
                    Are you sure ? &nbsp;Do you want delete this post.
                  </p>

                  <div className="done">
                    <button
                      onClick={() => {
                        confirmDelete();
                        setStart(true);
                      }}
                    >
                      Confirm
                    </button>
                    <button onClick={cencelDelete}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="timer-delete">
                  <p>{count}s</p>
                  <button className="undo-delete" onClick={handleUndo}>
                    Undo
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        <div className="padding-post">
          <p className="title-post">{title}</p>

          <div className="img-image">
            <img src={image} alt="blog post" />
          </div>

          <p className="sub-post">{subtitle}</p>

          <p className="content-post">{content}</p>
        </div>
      </div>
    </>
  );
};

export default PostDescription;
