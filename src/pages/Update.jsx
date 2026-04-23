import { useEffect, useState, useContext } from "react";
import auth from "../utility/axios/AxiosApi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../uiComponent/Loader";

// components
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();

  // state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [Image, setImgUrl] = useState(null);
  const [blogcreated, setbBogCreated] = useState(false);
  const [create, setCreate] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userPost = await auth.get(`/post/${id}`, {
        // jwt header bearer tokens
        headers: {
          Authorization: `Bearer ${token}`,
        },

        //   end
      });

      const postData = userPost.data.onePost;
      setTitle(postData.title);
      setSubtitle(postData.subtitle);
      setContent(postData.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    setCreate(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);
      formData.append("Image", Image);

      const submitPost = await auth.put(`/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setbBogCreated(submitPost.data.isblogCreated);

      //  reset to  empty filed
      setTitle("");
      setContent("");
      setSubtitle("");
      setImgUrl("");
      // ---- end of reset
    } catch (err) {
      console.log(err);
    } finally {
      setCreate(false);
      navigate("/view");
    }
  };

  return (
    <>
      <div className="create">
        {blogcreated && (
          <div className="created">
            <h4>Post updated success</h4>
            <p>
              Would you like to view it ? <Link to="/view">Re-view update</Link>
            </p>
          </div>
        )}
        <h1>Update blog</h1>
        <div className="input">
          <form onSubmit={createPost} encType="">
            <input
              type="text"
              value={title}
              required
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value.trim())}
            />
            <input
              type="text"
              value={subtitle}
              required
              placeholder="Sub-title"
              onChange={(e) => setSubtitle(e.target.value.trim().toUpperCase())}
            />

            <textarea
              name=""
              id=""
              required
              value={content}
              placeholder="Contents"
              onChange={(e) => setContent(e.target.value.trim())}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              required
              className="file-input"
              onChange={(e) => setImgUrl(e.target.files[0])}
            />
            <div className="div-post">
              {create ? <Loader /> : null}
              <button className="submit-post">
                {create ? "Updating post..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
