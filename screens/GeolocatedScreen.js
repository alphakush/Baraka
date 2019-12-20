import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Map from '../components/Map';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import HeaderButton from '../components/HeaderButton';

const GeolocatedScreen = props => {
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
      <Map
      />
  );
};

GeolocatedScreen.navigationOptions = navData => {
  return {
      headerTitle: 'Localisation',
      headerLayoutPreset: 'center',
      headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
              title="Localisation"
              iconName="ios-menu"
              onPress={() => {
                  navData.navigation.toggleDrawer();
              }}
          />
      </HeaderButtons>
    ),
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
});

export default GeolocatedScreen;
