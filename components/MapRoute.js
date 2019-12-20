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
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch,useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import CurrentLocationButton from "../components/Currentlocation";
import { MaterialIcons } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import HeaderButton from '../components/HeaderButton';

const HEIGHT = Dimensions.get('window').height
const GOOGLE_MAPS_APIKEY = "AIzaSyCHcQmmWvpRpHrpvfNp7u4A3F4iXPvYpe8";
const DEFAULT_PADDING = { top: 50, right: 50, bottom: 50, left: 50 }

const MapRoute = props => {
  const destinationbar = props.destination;
  const userposition = props.origin;
  const barname = props.barname;
  const date = new Date();
  const [duration, setduration] = useState('');
  const [distance, setdistance] = useState('');
  const [arrivage, setarrivage] = useState('');
  const [labelduration, setlabelduration] = useState('');

  const MARKERS = [
    destinationbar[0],
    userposition[0],
  ];

  const centermaptomarkers = async () => {
    this.map.fitToCoordinates(MARKERS, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

    useEffect(() => {
       centermaptomarkers();
    }, []);

   centerMaptoUser = async () => {
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

    return (
      <ScrollView>
        <View style={styles.container}>
          <MapView style={styles.map}
          showsUserLocation={true}
          userLocationAnnotationTitle="Tu te trouve ici"
          ref={(map) => {this.map = map}}
          fitToSuppliedMarkers={userposition[0],destinationbar[0]}
          initialRegion={userposition[0]}
          >
          <MapView.Marker
            coordinate={userposition[0]}
            />
          <MapView.Marker
            title = {barname.barName}
            coordinate={destinationbar[0]}
            />
          <MapViewDirections
            origin={userposition[0]}
            destination={destinationbar[0]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={6}
            optimizeWaypoints={true}
            strokeColor="blue"
            onReady={result => {
              if (result.duration > 59){
                var hours = (result.duration / 60);
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);
                if (rminutes.length < 2){
                  rminutes = '0'+rminutes;
                }
                if(rminutes === '60'){
                  rhours = rhours + 1;
                  rminutes = '0';
                }
                setduration(rhours+':'+rminutes);
                setlabelduration('heures');
              } else{
                setduration(Math.round(result.duration));
                setlabelduration('minutes');
              }
              setdistance(result.distance.toFixed(0));
              date.setHours(date.getHours(),date.getMinutes()+Math.round(result.duration));
              setarrivage(date.toLocaleTimeString('fr-FR').slice(0, -3));
            }}
            />
          </MapView>
          <View style={styles.notificationBox}>
            <Text style={styles.arrivage}>{arrivage}</Text>
            <Text style={styles.duration}>{duration}</Text>
            <Text style={styles.distance}>{distance}</Text>
          </View>
          <View style={styles.notificationBoxbis}>
            <Text style={styles.descarrivage}>arrivée</Text>
            <Text style={styles.descduration}>{labelduration}</Text>
            <Text style={styles.descdistance}>km</Text>
          </View>
        </View>
      </ScrollView>
    );
};

MapRoute.navigationOptions = navData => {
    return {
      headerRight: (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                  title="Save"
                  iconName="ios-save"
                  onPress={() => {
                       this.centerMaptoUser()
                  }}
              />
          </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
    map: {
      height: HEIGHT - 200
    },
    text:{
     fontSize:24,
     color:Colors.Black,
     marginTop : 10
   },

   notificationBox: {
   backgroundColor: Colors.White,
   flexDirection:'row',
   marginTop : 10,
   shadowOffset: {
      width: 0,
      height: 6,
    },
    borderRadius:30,
   },

   notificationBoxbis: {
   backgroundColor: Colors.White,
   flexDirection:'row',
   shadowOffset: {
      width: 0,
      height: 6,
    },
    borderRadius:30,
   },

 descduration:{
    fontSize:20,
    color: Colors.GreyDark,
    marginRight : 30,
    marginLeft : 40
  },
 descdistance:{
    fontSize:20,
    color: Colors.GreyDark,
    marginRight : 25,
    marginLeft : 55
  },
 descarrivage:{
    fontSize:20,
    color: Colors.GreyDark,
    marginRight : 35,
    marginLeft : 30
  },
 duration:{
    fontSize:40,
    color: Colors.Black,
    marginRight : 50,
    fontWeight:'bold',
    marginLeft : 45
  },
 distance:{
    fontSize:40,
    color: Colors.Black,
    marginRight : 40,
    fontWeight:'bold',
    marginLeft : 0
  },
 arrivage:{
    fontSize:40,
    color: Colors.Black,
    marginRight : 15,
    fontWeight:'bold',
    marginLeft : 10
  },
});

export default MapRoute;
