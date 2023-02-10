import React, { useState, useEffect } from 'react';
import axios from 'axios';




function SingleTree(){
  
    const url = 'http://localhost:3500/'

    const [tree, setTree] = useState({})

    const [queryParameters] = new URLSearchParams(window.location.pathname)
    const tree_id = queryParameters[0].slice(12)

    const configuration = {
      method: 'post',
      url: url + 'trees/buy',
      data: {
        tree_id: tree_id
      },
      withCredentials: true,
    };


    const getSingleTree = async() => {
        const singleTree = await axios.get(url + `trees/` + tree_id, { withCredentials: true })
        setTree(singleTree.data)
        console.log(singleTree.data)
      }

    const buyTree = async() => {  
      const boughtTree = await axios.post(configuration)
      console.log(boughtTree)
    }

      useEffect(() => {
        getSingleTree()
      }, [])
  
      return (
      <div>
            <span>{tree.foundTree.random_name}</span>
            <br />
            {tree.foundTree.locked ? <span>Locked</span> : 
            
            (!tree.foundTree.user_id ? <button onClick={() => buyTree()}>Buy for {tree.price} leaves</button> : 
            (!tree.lockPrice?<button onClick={() => buyTree()}>Buy for {tree.buyPrice} leaves</button> : <button>Buy for {tree.lockPrice} leaves</button> ))}



      </div>
      );
  
  }
  
  export default SingleTree;