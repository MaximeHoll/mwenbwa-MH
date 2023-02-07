import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';



function Profile(){

  const url = 'http://localhost:3500/'

  const {
    authUser,
    isLoggedIn,
} = useAuth()

  
  // const getActivities = async() => {
  //   const newBoard = await axios.get(url + `activities`)
  //   setBoard(newBoard.data)
    
  // }




    return (
      <div>
        <li>Username: {authUser.username}</li>
        <li>Leaves: {authUser.leaves}</li>
        <li>Color: {authUser.color}</li>
      </div>
    );

}

export default Profile;