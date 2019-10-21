import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import './index.css';

class Map extends Component {
    map() {
        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: 43.124229, lng: 5.928000 }}
                defaultOptions={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}
            />
        );
    }

    render() {
        const WrappedMap = withScriptjs(withGoogleMap(this.map));
        return (
            <WrappedMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCARoALGnORPsB-faLx61kr2zFqnKYtwEs&callback=initMap"
                loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
                containerElement={<div style={{ height: `100%`, width: '100%' }} />}
                mapElement={<div style={{ height: `100%`, width: '100%' }} />}
            />
        );
    }
}
export default Map;