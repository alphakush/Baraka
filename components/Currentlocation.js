import React from 'react';
import {View, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constant/Colors';

const CurrentLocationButton = props => {

  const cb = props.cb ? props.cb : () => console.log('callback');
  const frombarroute = props.route;
  return(
    <View style={frombarroute ? [styles.container, {bottom : 30},StyleSheet.absoluteFillObject] : [styles.container, {bottom : 120},StyleSheet.absoluteFillObject]}>
      <MaterialIcons
        style={StyleSheet.absoluteFillObject}
        name="my-location"
        color="#000000"
        size={25}
        onPress={() => { cb() }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    zIndex: 9,
    position: 'absolute',
    width:45,
    height:45,
    backgroundColor: Colors.White,
    left: 320,
    borderRadius:50,
    shadowColor: Colors.Black,
    elevation:7,
    shadowRadius:5,
    shadowOpacity:1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default CurrentLocationButton;
