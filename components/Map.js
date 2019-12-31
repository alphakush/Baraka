import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Button,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
  Dimensions
 } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { useDispatch,useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import CurrentLocationButton from "../components/Currentlocation";
import { MaterialIcons } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const GOOGLE_MAPS_APIKEY = "AIzaSyCHcQmmWvpRpHrpvfNp7u4A3F4iXPvYpe8";


const Map = props => {
  const userlatitude = useSelector(state => state.auth.userlatitude);
  const userlongitude = useSelector(state => state.auth.userlongitude);
  const userposition = [{latitude : Number(userlatitude), longitude: Number(userlongitude),latitudeDelta:0.01,longitudeDelta:0.01}];

   centerMap = async () => {
     let location = await Location.getCurrentPositionAsync({});
     const latitude = location.coords.latitude;
     const longitude = location.coords.longitude;
     const latitudeDelta = 0.01;
     const longitudeDelta = 0.01;

      this.map.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      })
    }

    useEffect(() => {
        centerMap();
    },[]);
    return (
        <View style={styles.container}>
          <MapView style={styles.map}
          showsUserLocation={true}
          showUserLocationButton={true}
          userLocationAnnotationTitle="Tu te trouve ici"
          ref={(map) => {this.map = map}}
          initialRegion={userposition[0]}>
          </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
 map: {
   height: HEIGHT,
   width : WIDTH
 },
});

export default Map;
