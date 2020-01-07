import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import '../index.css';

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
        navigator.geolocation.getCurrentPosition(this.success.bind(this),this.error.bind(this), options)
    }
    map() {
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
                }}
            />
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