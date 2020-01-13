import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as data from '../data/info-bar.json';
import '../index.css';
//import { positions } from '@material-ui/system';
import { useState } from "react";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0
        }
    }
    success(pos) {
        var crd = pos.coords;
        this.setState({
            latitude: crd.latitude,
            longitude: crd.longitude
        })
    }

    error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }
    getLocation() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this), options)
    }
    map() {
        const [selectedBar, setSelectedBar] = useState(null);
        return (
            <GoogleMap
                defaultZoom={14}
                // defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
                defaultCenter={{ lat: 43.1208, lng: 5.93321 }}
                defaultOptions={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}>
                {data.features.map(park => (
                    <Marker key={park.properties.FACILITY_F}
                        position={{
                            lat: park.geometry.coordinates[0],
                            lng: park.geometry.coordinates[1]
                        }}
                        onClick={() => {
                            setSelectedBar(park);
                        }}
                        icon={{
                            url: '/images/biere_logo.png',
                            scaledSize: new window.google.maps.Size(25, 25)
                        }}
                    />
                ))}
                {selectedBar && (
                    <InfoWindow
                        position={{
                            lat: selectedBar.geometry.coordinates[0],
                            lng: selectedBar.geometry.coordinates[1]
                        }}
                        onCloseClick={() => {
                            setSelectedBar(null);
                        }}
                    >
                        <div>
                            <h1>{selectedBar.properties.NAME_FR}</h1><br />
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>
        );

    }

    render() {
        this.getLocation()
        const WrappedMap = withScriptjs(withGoogleMap(this.map.bind(this)));
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