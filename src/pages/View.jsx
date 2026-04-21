import audit from "../assets/img/audit.jpeg";

// DEPENDECE
import { useContext, useEffect, useState } from "react";
import Loader from "../uiComponent/Loader";
import auth from "../utility/axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import mark from "../assets/icon/mark.png";
import Logout from "../uiComponent/Logout";
import { stateManager } from "../utility/authContext/Context";

// import Axios api

const View = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [details, setDetails] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [postDelete, setPostDelete] = useState(false);
  const [deleteing, setDeleting] = useState(false);
  const [userDetails, setUserDetails] = useState(true);

  // navigate
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(stateManager);

  const token = localStorage.getItem("token");

  // fetching data from api

  const users = async () => {
    // get token from localStorage
    const token = localStorage.getItem("token");

    //   try block and catch error
    setLoading(true);
    try {
      const userPost = await auth.get("/user", {
        // jwt header bearer tokens
        headers: {
          Authorization: `Bearer ${token}`,
        },

        //   end
      });

      setUserData(userPost.data.user.fullname);

      const oneUser = await auth.get("/postuser", {
        // jwt header bearer tokens
        headers: {
          Authorization: `Bearer ${token}`,
        },

        //   end
      });

      setBlogData(oneUser.data.onePost);

      console.log(oneUser.data.onePost);

      setUserDetails(oneUser.data.onePost <= 0);
    } catch (err) {
      console.log(`Problem Occure ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    users();
  }, []);

  const deleteBoxPost = (id) => {
    setSelectedId(id);
    setDeleteBox(true);
  };

  const cencelDeletePost = () => {
    setDeleteBox(false);
  };

  const handleDetails = (id) => {
    setDetails((prev) => (prev === id ? null : id));
  };

  const deletePost = async () => {
    setDeleting(true);
    try {
      console.log("loading ...");
      const post = await auth.delete("/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // if (post.data.isDelete) {
      //   users();
      //   console.log("loading ...");
      // }

      console.log(post.data.isDelete);

      setDeleteBox(post.data.isDelete);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);

      const done = () => {
        setDeleteBox(false);
      };

      setTimeout(done, 4000);
    }
  };

  const confirmDeletePost = () => {
    setPostDelete(true);
    deletePost();
  };

  return (
    <>
      <div className="view">
        {loading ? (
          <div className="spinner">{loading && <Loader />}</div>
        ) : (
          <div className="user">
            <>
              {isLoggedIn ? <Logout /> : null}
              {userDetails ? (
                <div className="message-box">
                  <h2>
                    Welcome,
                    <span
                      style={{
                        fontSize: "x-large",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      back
                    </span>
                  </h2>
                  <img src={mark} alt="" className="img-mark" />
                  <p className="user-details">
                    <span className="userName">
                      {userData.length <= 0 ? "Gesture" : userData}
                    </span>
                  </p>
                  <p className="user-details">
                    Would you like to create blog ?
                  </p>
                  <Link to="/create">
                    <div className="submit">
                      <span>Create now</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="main-view">
                  {deleteBox && (
                    <div className="delete-position">
                      <div className="deleted-post">
                        {postDelete ? (
                          <div>
                            <div className="process">
                              {deleteing ? (
                                <p>Processing... </p>
                              ) : (
                                <p>Delete sucess</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <>
                            {blogData.map(
                              (index, key) =>
                                selectedId === index._id && (
                                  <div key={index._id}>
                                    <p>
                                      Are you sure ? do you want delete "
                                      {index._id}"
                                    </p>
                                  </div>
                                ),
                            )}

                            <div className="btn-Delete">
                              <button onClick={cencelDeletePost}>Cancel</button>
                              <button onClick={confirmDeletePost}>
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {blogData.map((index, key) => (
                    <div className="posts" key={index._id}>
                      <div className="img-box">
                        <img src={index.Image} alt="picture" />
                      </div>

                      <div className="position-rel">
                        <div className="blog">
                          <div
                            className="deteils-blog"
                            onClick={() => {
                              handleDetails(index._id);
                            }}
                          >
                            <span>...</span>
                          </div>

                          {details === index._id && (
                            <div className="menu-post">
                              <ul>
                                <Link to="/create">
                                  <li>Create</li>
                                </Link>

                                <li
                                  onClick={() => {
                                    deleteBoxPost(index._id);
                                  }}
                                >
                                  Delete
                                </li>

                                <li>Update</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <h1>{index.title}</h1>
                      <p className="sub-heading">{index.subtitle}</p>
                      <div className="contents">
                        <p>{index.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default View;
