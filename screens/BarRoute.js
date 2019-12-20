import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MapRoute from '../components/MapRoute';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import HeaderButton from '../components/HeaderButton';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from 'expo-location';

const BarRoute = props => {
  const barlatitude = props.navigation.getParam('barlatitude');
  const barlongitude = props.navigation.getParam('barlongitude');
  const barname = props.navigation.getParam('barname');
  const bardestination = [{latitude : barlatitude.barlatitude,longitude : barlongitude.barlongitude,latitudeDelta:0.01,longitudeDelta:0.01}];
  const userlatitude = useSelector(state => state.auth.userlatitude);
  const userlongitude = useSelector(state => state.auth.userlongitude);
  const origin = [{latitude : Number(userlatitude), longitude: Number(userlongitude),latitudeDelta:0.01,longitudeDelta:0.01}];

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
      <MapRoute
      origin={origin}
      destination={bardestination}
      barname={barname}
      />
  );
};

BarRoute.navigationOptions = navData => {
    return {
        headerTitle: 'Itinéraire ',
        headerLayoutPreset: 'center',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Localisation"
                    iconName="ios-locate"
                    onPress={() => {this.centerMaptoUser()}}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BarRoute;
