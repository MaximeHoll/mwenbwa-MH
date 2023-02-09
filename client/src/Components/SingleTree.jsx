import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';



function SingleTree(){
  
    const url = 'http://localhost:3500/'

    const [tree, setTree] = useState()

    const [queryParameters] = useSearchParams()

    const getSingleTree = async() => {
        const singleTree = await axios.get(url + `trees/` + queryParameters.get("id"), { withCredentials: true })
        console.log(singleTree.data)
        
      }

      useEffect(() => {
        getSingleTree()
      }, [])
  
      return (
       <div>
            {/* <span>{tree.foundTree.random_name}</span>
            <span>{tree.foundTreeleaves}</span>
            {locked ? <span>Locked</span> : <button>Buy for {leaves} leaves.</button>} */}



       </div>
      );
  
  }
  
  export default SingleTree;