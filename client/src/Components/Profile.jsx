import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";



function Profile(){

  const [profile, setProfile] = useState({})
  const navigate = useNavigate()



  const {
    user,
    logout
} = useAuth()

  
const configuration = {
  method: 'post',
  url: 'http://localhost:3500/users/profile',
  data: {
    user_id: user
  },
  withCredentials: true,
};

const getProfile = async(e) => {
  axios(configuration)
  .then((result) => {
      setProfile(result.data.user)
  })
  .catch((error) => {
    error = new Error();
  });
}

useEffect(() => {
  getProfile()
}, [])


    return (
      <div>
        <li>Username: {profile.username}</li>
        <li>Leaves: {profile.leaves}</li>
        <li>Color: {profile.color}</li>
        <br />
        <button onClick={() => logout()}>Logout</button>
      </div>
    );

}

export default Profile;