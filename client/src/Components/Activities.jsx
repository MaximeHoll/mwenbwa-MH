import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Activities(){

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
      board.map((boardElement, index) => (
        
        <li key={index}>{boardElement[3]} {boardElement[0]} {boardElement[2]} {boardElement[1]}.</li>
        
      )
      
      )
    );

}

export default Activities;