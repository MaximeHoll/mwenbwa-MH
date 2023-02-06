import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Profile(){

  const url = 'http://localhost:3500/'

  const [board, setBoard] = useState([])

  const getActivities = async() => {
    const newBoard = await axios.get(url + `activities`)
    setBoard(newBoard.data)
    
  }


  useEffect(() => {
    getActivities()
  }, [])



    return (
      <div>
        <li>Username: </li>
        <li>Email: </li>
        <li>Leaves: </li>
        <li>Color: </li>
      </div>
    );

}

export default Profile;