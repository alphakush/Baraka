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
  ScrollView
 } from 'react-native';
import MapView from 'react-native-maps';
import {Location, Permissions} from 'expo';
import { useDispatch,useSelector } from 'react-redux';
import Colors from '../constant/Colors';

const Map = () => {
  const [mylatitude, setmylatitude] = useState('');
  const [mylongitude, setmylongitude] = useState('');

  const recupcoord = () => {
    navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setmylongitude(longitude);
        setmylatitude(latitude);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

    return (
      <ScrollView>
      <View style={styles.container}>
        <MapView style={styles.map}
        initialRegion={{
            latitude:43.6123646,
            longitude:1.4290608,
            latitudeDelta:0.01,
            longitudeDelta:0.01
        }}>
        </MapView>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.Button} onPress={()=> recupcoord()}>
            <Text style={styles.ButtonText}>S'y rendre</Text>
          </TouchableOpacity>
          <Text >Latitude : {mylatitude}</Text>
          <Text >Longitude : {mylongitude}</Text>
        </View>
      </View>
      </ScrollView>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        height: 300
    },
    ButtonContainer:{
       marginHorizontal:30
     },
     ButtonText:{
       color: Colors.Black,
       fontSize:20,
     },
     Button: {
       marginTop:10,
       height:45,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       borderRadius:30,
       backgroundColor: Colors.Gold,
     },
});

export default Map;
