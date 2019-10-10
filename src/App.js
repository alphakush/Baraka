import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import se_connecter from "./se_connecter"
import './index.css';

function Map() {
 return (
   <GoogleMap 
   defaultZoom={10} 
   defaultCenter={{lat: 43.124229, lng:5.928000}}
   
   />
 );
}

function Header() {
  return (
  <div style={{width: '100%', height: '3%'}}>
    <ul>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
      <li><a href="#">Item plus long</a></li>
    </ul>
  </div>)
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
  <div style={{width: '100vw', height: '100vh'}}>
    <Header/>
    <div style={{width: '100%', height: '97%'}}> 
    <WrappedMap 
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCARoALGnORPsB-faLx61kr2zFqnKYtwEs&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
      containerElement={<div style={{ height: `100%`, width: '100%' }} />}
      mapElement={<div style={{ height: `100%`, width: '100%' }} />}
    /> 
    </div>
  </div>
  );
}
