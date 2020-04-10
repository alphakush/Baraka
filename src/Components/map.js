import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Api from "../api/api.js";
import '../index.css';
import mapStyles from "./mapStyles";
import { useState } from "react";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            barsFromServeur: null,
            selected_bar:null
        }
    }
    async componentDidMount() {
        await Api.get('/allbars').then(userData => {
            this.setState({ barsFromServeur: userData.data })
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
            timeout: 0,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this), options)
    }
    itineraireTo() {
        
    }

    initMap() {
        const [selectedBar, setSelectedBar] = useState(null);
        const { barsFromServeur } = this.state
        if (barsFromServeur === null)
            return (
                <div>
                    Problème API
                </div>
            )
        const mapBars = barsFromServeur.map(bar => 
            <Marker 
                key={bar._id}
                position={{lat: bar.latitude,lng: bar.longitude}}
                onClick={() => {
                    setSelectedBar(bar);
                    this.state.selected_bar = bar;
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
                    styles: mapStyles,
                    disableDefaultUI: true
                 }}
                >
                
                <Marker
                position={{ lat: this.state.latitude, lng: this.state.longitude }} 
                icon={{
                    url: '/images/marker.png',
                    scaledSize: new window.google.maps.Size(50, 50)
                }}
                />
                {mapBars}
                {selectedBar && (
                    <InfoWindow
                        position={{
                            lat: selectedBar.latitude,
                            lng: selectedBar.longitude
                        }}
                        onCloseClick={() => {
                            setSelectedBar(null);
                            this.state.selected_bar = null;
                        }}
                    >
                        <div>
                            <p>{selectedBar.name}</p>
                            <p>{selectedBar.description}</p>
                            <button onClick={() => this.itineraireTo()}>Je m'y rend</button>
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>
        );

    }

    render() {
        this.getLocation()
        const WrappedMap = withScriptjs(withGoogleMap(this.initMap.bind(this)));
        return (
            <WrappedMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCARoALGnORPsB-faLx61kr2zFqnKYtwEs"
                loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
                containerElement={<div style={{ height: `100%`, width: '100%' }} />}
                mapElement={<div style={{ height: `100%`, width: '100%' }} />}
            />
        );
    }
}
export default Map;