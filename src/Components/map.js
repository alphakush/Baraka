import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";
import Api from "../api/api.js";
import '../index.css';
//import { positions } from '@material-ui/system';
import { useState } from "react";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            nombre_de_bars: null
        }
    }
    async componentDidMount() {
        await Api.get('/allbars').then(userData => {
            console.log(userData)
            this.setState({ nombre_de_bars: userData.data })
        });
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
    itineraireTo(bar) {
        alert("Yo");
    }

    map() {
        const [selectedBar, setSelectedBar] = useState(null);
        const { nombre_de_bars } = this.state
        if (nombre_de_bars === null)
            return (
                <div>
                    Problème API
                </div>
            )

            const rows = nombre_de_bars.map(bar => 
                <Marker key={bar._id}
                  position={{
                    lat: bar.latitude,
                    lng: bar.longitude
                  }}
                  onClick={() => {
                    setSelectedBar(bar);
                  }}
                  icon={{
                    url: '/images/biere_logo.png',
                    scaledSize: new window.google.maps.Size(25, 25)
                  }}
                />
              );    
        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
                defaultOptions={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}>
                <Marker
                position={{ lat: this.state.latitude, lng: this.state.longitude }} 
                icon={{
                    url: '/images/marker.png',
                    scaledSize: new window.google.maps.Size(50, 50)
                }}
                />
                {rows}
                {selectedBar && (
                    <InfoWindow
                        position={{
                            lat: selectedBar.latitude,
                            lng: selectedBar.longitude
                        }}
                        onCloseClick={() => {
                            setSelectedBar(null);
                        }}
                    >
                        <div>
                            <p>{selectedBar.name}</p>
                            <p>{selectedBar.description}</p>
                            <button >Je m'y rend</button>
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