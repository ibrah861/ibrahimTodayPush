import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utility/axios/AxiosApi";
import Loader from "../uiComponent/Loader";
// import { useContext } from "react";
// import world from "../assets/icon/images.jpg";

const Home = () => {
  // user details

  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [msgHeader, setMsgHeader] = useState("");
  const [msgContent, setMsgContent] = useState("");
  const [box, setBox] = useState(false);
  const [boxColor, setBoxColor] = useState("");
  const navigate = useNavigate();
  const [pswState, setPswState] = useState(true);
  const [formChoice, setFormChoice] = useState(false);

  // use context

  // handle submit

  const handleSignin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // sending request
      const submit = await auth.post("/signin", { email, password });
      const data = submit?.data;
      // set Role
      console.log(data?.role);

      if (data?.role === "admin") {
        navigate("/admin/:id");
      } else {
        navigate("/view/:id");
      }

      setMsgHeader(data?.head);
      setMsgContent(data?.msg);
      setBoxColor(data?.isAuth);

      // save token into localStorage
      localStorage.setItem("token", data?.token);
      localStorage.setItem("isAuth", data?.isAuth);

      // set Box
      if (submit?.data?.success) {
        setBox(true);
        setEmail("");
        setPassword("");

        // Navigate to view page

        function removeBox() {
          setBox(false);
        }

        setTimeout(removeBox, 5000);
      }

      // then catching err
    } catch (err) {
      //  Set Messages
      setMsgHeader(err.response?.data?.head);
      setMsgContent(err.response?.data?.msg);
      setBoxColor(err?.response?.data?.isAuth);

      // if Error
      if (err?.response?.data?.success) {
        setBox(true);

        setEmail("");
        setPassword("");

        function removeBox() {
          setBox(false);
        }

        setTimeout(removeBox, 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // sending request
      const submit = await auth.post("/signup", { fullname, email, password });

      if (submit?.data?.success) {
        setBox(true);
        setName("");
        setEmail("");
        setPassword("");

        function removeBox() {
          setBox(false);
        }
        setFormChoice(true);

        setTimeout(removeBox, 5000);
      }
      setMsgHeader(submit?.data?.head);
      setMsgContent(submit?.data?.msg);

      // then catching err
    } catch (err) {
      //  Set Messages
      setMsgHeader(err.response?.data?.head);
      setMsgContent(err.response?.data?.msg);

      // if Error
      if (err?.response?.data?.success) {
        setBox(true);
        setName("");
        setEmail("");
        setPassword("");

        function removeBox() {
          setBox(false);
        }

        setTimeout(removeBox, 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  const view = async () => {
    const token = localStorage.getItem("token");

    try {
      const userPost = await auth.get("/user", {
        // jwt header bearer tokens
        headers: {
          Authorization: `Bearer ${token}`,
        },

        //   end
      });

      console.log(userPost.status);

      if (userPost.status === 201) {
        navigate("/view/:id");
        console.log("ndio");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    view();
  }, []);

  const psw = () => {
    setPswState((ps) => !ps);
  };

  const register = () => {
    setFormChoice(true);
  };

  const signup = () => {
    setFormChoice(false);
  };
  return (
    <>
      <div className="hero-container">
        <div className="hero">
          <div className="flex-head">
            <div className="heigth-flex">
              <h1>Enjoy posting blog using our website</h1>
              <p>
                Now you can create post and update it also delete it easy Signin
                to create account and then enjoy our services free
              </p>
            </div>
          </div>
        </div>
        <div className="form-container-hero">
          <div className="conteiner-choice">
            <p onClick={register}>Register</p>
            <p onClick={signup}>Sing-up</p>
          </div>

          {formChoice ? (
            <div className=" signin">
              <div className="auth-container">
                <div className="container">
                  <h2>Register</h2>

                  {box && (
                    <div className="messageBox">
                      <p className="msg-head">{msgHeader}</p>
                      <div className={boxColor ? "green" : "orangered"}>
                        <p className="message">{msgContent}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSignin}>
                    <div>
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        placeholder="enter your email"
                        value={email}
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type={pswState ? "password" : "text"}
                        placeholder="enter your password"
                        value={password}
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="psw-rechange" onClick={psw}>
                        {pswState ? "Show" : "Hide"}
                      </span>
                    </div>

                    <div className="flex-btn">
                      <div className="signin-user">
                        {isLoading && <Loader />}
                        <button title="Signin in user account">
                          {isLoading ? "Authenticating ..." : " Sign-in"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="register">
              <div className="auth-container">
                <div className="container">
                  <h2>Sign up</h2>

                  {box && (
                    <div className="messageBox">
                      <p className="msg-head">{msgHeader}</p>
                      <div className={boxColor ? "green" : "orangered"}>
                        <p className="message">{msgContent}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSignup}>
                    <div className="form-field">
                      <label htmlFor="name">User name</label>
                      <input
                        type="text"
                        placeholder="enter your user name"
                        value={fullname}
                        id="name"
                        required
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                      />
                    </div>

                    <div>
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        placeholder="enter your email"
                        value={email}
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type={pswState ? "password" : "text"}
                        placeholder="enter your password"
                        value={password}
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="psw-rechange" onClick={psw}>
                        {pswState ? "Show" : "Hide"}
                      </span>
                    </div>

                    <div className="flex-btn">
                      <div className="signin-user">
                        {isLoading && <Loader />}
                        <button>
                          {isLoading ? "Authenticating ..." : " Sign up"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
