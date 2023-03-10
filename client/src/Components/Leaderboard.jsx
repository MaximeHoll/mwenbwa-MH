import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Leaderboard(){

  const url = 'http://localhost:3500/'

  const [board, setBoard] = useState([])

  const getLeaderBoard = async() => {
    const newBoard = await axios.get(url + `users`)
    setBoard(newBoard.data)
    
  }


  useEffect(() => {
    getLeaderBoard()
  }, [])



    return (
      board.map((boardElement, index) => (
        
          <li key={index}>{index + 1}. {boardElement.username} with {boardElement.leaves} leaves.</li>
        
      )
      
      )
    );

}

export default Leaderboard;