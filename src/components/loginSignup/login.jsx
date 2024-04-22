import "./Login.Module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/spinnerLoader'
import { useNavigate } from "react-router";
import { UserContext } from "../../user";

export default function login() {
  const Navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, user);
      if (data) setLoader(false);
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      toast.success('Login Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      Navigate('/');
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

  };

  const [forgetPassDiv, setForgetPassDiv] = useState(false);

  const [newPassDiv, setNewPassDiv] = useState(false);
  const [Email, setEmail] = useState({
    email: ''
  })

  const [userData, setuserData] = useState({
    email: '',
    password: '',
    code: '',
  })

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmail({
      [name]: value
    })
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, Email);
      setNewPassDiv(true);
      toast.success('Code Sent', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  const handleChangeCode = (e) => {
    const { name, value } = e.target;
    setuserData({
      [name]: value
    })
  }

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, userData);
      setForgetPassDiv(false);
      setNewPassDiv(false);
      toast.success('Password Changed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div className="loginpage">
      <div className="logincontainer">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <button className="submitbtn" type="submit">{loader ? <Loader /> : 'Login'}</button>
        </form>
        <button className="forgetpass" onClick={() => { setForgetPassDiv(true); setNewPassDiv(false); }}>Forget your password?</button>
      </div>
      {forgetPassDiv &&
        <div className="forgetpassdiv" >
          {!newPassDiv ?
            <div className='forgetpasswordpage'>
              <form>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type='email'
                    value={Email.email}
                    name='email'
                    onChange={handleChangeEmail} />
                </div>
                <button type='submit' onClick={handleSubmitEmail}>{loader ? <Loader /> : 'Send Code'}</button>
              </form>

            </div>
            :
            <div className='newpasswordpage'>
              <form>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type='email'
                    value={userData.email}
                    name='email'
                    onChange={handleChangeCode} />
                </div>
                <div>
                  <label htmlFor="code">Code:</label>
                  <input
                    type='text'
                    value={userData.code}
                    name='code'
                    onChange={handleChangeCode} />
                </div>
                <div>
                  <label htmlFor="password">New Password:</label>
                  <input
                    type='password'
                    value={userData.password}
                    name='password'
                    onChange={handleChangeCode} />
                </div>
                <button type='submit' onClick={handleSubmitCode}>{loader ? <Loader /> : 'Change Passowrd'}</button>
              </form>

            </div>}
          <FontAwesomeIcon icon={faXmark} className="closeDiv" onClick={() => setForgetPassDiv(false)} />
        </div>}
    </div>
  );
}
