import React, { useEffect, useState } from "react";
import auth from "../utility/axios/AxiosApi";
import { Link, replace, useNavigate, useParams } from "react-router-dom";
import Loader from "../uiComponent/Loader";

const AdminDashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [totalUser, setTotalUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [created, setCreated] = useState("");
  const [role, setRole] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [blogData, setBlogData] = useState([]);

  // use Params
  const { id } = useParams();

  // fetching admin data
  const navigate = useNavigate();
  useEffect(() => {
    const admin = async () => {
      setLoading(true);
      try {
        // get token from local host
        const token = localStorage.getItem("token");

        // data is fetching ...
        const adminData = await auth.get("/alluser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await auth.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // const posts = await auth.get("/post", {
        //   // jwt header bearer tokens
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },

        //   //   end
        // });

        // setBlogData(posts.data.getBlog);
        // console.log(posts);

        setUsersData(adminData.data.users);

        const adminUser = userData.data.user;
        setName(adminUser.fullname);
        setEmail(adminUser.email);
        setCreated(adminUser.createdAt);
        setRole(adminUser.role);

        const user = adminData?.data;
        setTotalUser(user?.users?.length);
      } catch (err) {
        if (err.response.status === 406) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    admin();
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner">{loading && <Loader />}</div>
      ) : (
        <div className="admin-wrapper">
          <h1 className="top-admin-head">Admin Dash Board</h1>

          <div className="grid">
            <div className="left-col">
              <div className="admin-profie">
                <div className="name-pro">{name.charAt()}</div>
                <div className="text-pro">
                  <p>{name}</p>
                  <span>{email}</span>
                </div>
              </div>
              <div className="time-stamp">
                <p>Admin Created Date : {created}</p>
              </div>
              <hr className="line" />
              <h4>Total user : {totalUser}</h4>
              <span className="post">Total Post : {blogData}</span>
              <p className="role">Role : {role}</p>
            </div>
            <div className="right-col">
              {usersData.map((users, key) => (
                <div className="details-user-data" key={users._id}>
                  <div className="admin-profie">
                    <div className="name-pro">
                      <span style={{ color: "white" }}>
                        {users.fullname.charAt()}
                      </span>
                    </div>

                    <div>
                      <span>{users.fullname}</span>

                      <span>{users.email}</span>

                      <Link to="/view/:id">
                        <span id="delete">View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashBoard;
