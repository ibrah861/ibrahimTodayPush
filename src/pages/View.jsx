import audit from "../assets/img/audit.jpeg";

// DEPENDECE
import { use, useContext, useEffect, useState } from "react";
import Loader from "../uiComponent/Loader";
import auth from "../utility/axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import mark from "../assets/icon/mark.png";
import Logout from "../uiComponent/Logout";
import { stateManager } from "../utility/authContext/Context";
import { useParams } from "react-router-dom";

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
  const [invalidToken, setInvalidToken] = useState("");
  const [InvalidBox, setInvalidBox] = useState(false);
  const [update, setUpdate] = useState(null);

  // other states
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  // useParams
  const { id } = useParams();

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
      const userPost = await auth.get("/me", {
        // jwt header bearer tokens
        headers: {
          Authorization: `Bearer ${token}`,
        },

        //   end
      });

      const allUserInfo = userPost.data.user;

      setFullname(allUserInfo.fullname);
      setEmail(allUserInfo.email);

      const oneUser = await auth.get(`/post`, {
        // jwt header bearer tokens
        headers: {
          Authorization: `Bearer ${token}`,
        },

        //   end
      });

      setBlogData(oneUser.data.getBlog);

      setUserDetails(oneUser.data.getBlog <= 0);
    } catch (err) {
      console.log(`Problem Occure ${err}`);
      // console.log(err.response.status);

      // if (err.response.status === 406) {
      //   localStorage.setItem("token", "");
      //   navigate("/");
      //   setInvalidBox(true);
      // }

      // setInvalidToken(err.response.data.msg);
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

  const handleUpdate = (id) => {
    setUpdate(id);
  };
  const deletePost = async () => {
    setDeleting(true);

    try {
      const post = await auth.delete("/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (post.data.isDelete) {
        users();
      }

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

  const getImageId = (id) => {
    navigate(`/postDescription/${id}`);
  };

  // const confirmDeletePost = () => {
  //   setPostDelete(true);
  //   deletePost();
  // };

  const create = () => {
    navigate("/create");
  };

  return (
    <>
      <div className="view">
        {loading ? (
          <div className="spinner">{loading && <Loader />}</div>
        ) : (
          <>
            <div className="token-box">
              {InvalidBox && <p className="invalied-token">{invalidToken}</p>}
            </div>
            <div className="user">
              <>
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
                      <span className="userName block">{fullname}</span>

                      <span className="block">{email}</span>
                    </p>

                    <p className="user-details">
                      Would you like to create blog ?
                    </p>

                    <div className="submit" onClick={create}>
                      <span>Create now</span>
                    </div>
                  </div>
                ) : (
                  <div className="main-view">
                    {blogData.map((index, key) => (
                      <div
                        className="posts"
                        key={index._id}
                        onClick={() => {
                          getImageId(index._id);
                        }}
                      >
                        <div className="img-box">
                          <img src={index.Image} alt="picture" />
                        </div>

                        <p className="sub-heading">{index.subtitle}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default View;
