

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import icon from "../assets/Short-tree-01.svg";
import L from "leaflet";
import SingleTree from "./SingleTree"
import {Link} from 'react-router-dom'

export default function Map() {
  const latitude = 50.632557
  const longitude = 5.579666

  const url = 'http://localhost:3500/'

  const[trees, setTrees] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getTrees = async() => {
    const allTrees = await axios.get(url + `trees`)
    console.log(allTrees.data)
    setTrees(allTrees.data)
  }


  useEffect(() => {
    getTrees()
    setIsLoading(false)
  }, [])

  const customIcon = new L.Icon({//creating a custom icon to use in Marker
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <MapContainer
      className="map"
      center={[latitude, longitude]}
      style={{height: 83 + "vh"}}
      zoom={50}
      scrollWheelZoom={true}
      preferCanvas
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trees.map((tree, index) => {
        return (
      <CircleMarker center={{lat: tree.geoloc.lat, lon: tree.geoloc.lon}} key={index} fillColor='green' color='green'
      radius={5} opacity={0.8}>
        <Popup>
            
        {/* {tree.random_name ? tree.random_name : "No name"} 
        <br></br>
        {tree.leaves} leaves
        <br></br> */}
        {/* {tree.locked ? "Locked" : (tree.user_id ? 
          (<div>
            Owned
            <br></br>
            <SingleTree name={tree.random_name} leaves={tree.leaves} id={tree.user_id} locked={tree.locked} available={tree.available} />
          </div>) : 
          (<div>
            Available
            <br></br>
            
          </div>))} */}
          <a href={`/singleTree/${tree._id}`}>See Tree</a>

        </Popup>  
      </CircleMarker>)

        })}
      
      <MapView />
    </MapContainer>
  )};