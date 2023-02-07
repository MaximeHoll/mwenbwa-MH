import React, {useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

 

 
function Login(props) {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {
        authUser,
        isLoggedIn,
        dispatch
    } = useAuth()

    const configuration = {
        method: 'post',
        url: 'http://localhost:3500/auth',
        data: {
          username,
          password,
        },
        withCredentials: true,
      };

    const handleSubmit = async(e) => {
        e.preventDefault()
        axios(configuration)
        .then((result) => {
            dispatch({type:'LOGIN', payload: result.data})
            console.log(authUser, isLoggedIn, result.data)
        })
        .catch((error) => {
          error = new Error();
        });
        navigate('/', { replace: true });
    }


  return (
    <div>
      <div>
        <h1>Login Page</h1>
 
        <form method='POST' onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
 
export default Login;