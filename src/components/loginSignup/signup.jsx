import { useState } from 'react';
import axios from 'axios';
import { object, string } from 'yup';
import './Signup.Module.css';
import { toast, Bounce } from 'react-toastify';

export default function signup() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (! await validateData()) {
      return false;
    }

    const formdata = new FormData();
    formdata.append('userName', user.userName);
    formdata.append('email', user.email);
    formdata.append('password', user.password);
    formdata.append('image', user.image);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formdata);
      toast.success('Signin Successfully', {
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
    } catch (error) {
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

  const validateData = async () => {

    const Schema = object({
      userName: string().min(5).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });

    try {
      await Schema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      {
        error.errors.map((errors) =>
          toast.error(errors, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
        )
      }
      return false;
    }


  };

  return (
    <div className="signuppage">
      <div className="signupcontainer">
        <h2>Sign up</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Email</label>
            <input type="text" placeholder="email" value={user.email} name='email' onChange={handleChange} />
          </div>
          <div>
            <label>Username</label>
            <input type="text" placeholder="username" value={user.userName} name='userName' onChange={handleChange} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Password" value={user.password} name='password' onChange={handleChange} />
          </div>
          <div>
            <label>Image</label>
            <input type="file" name='image' onChange={handleImageChange} />
          </div>

          <button className="submitbtn" type="submit">SignUp</button>
        </form>
      </div>
    </div>
  )
}
