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
import * as Location from 'expo-location';
import { useDispatch,useSelector } from 'react-redux';
import Colors from '../constant/Colors';

const Map = () => {

    return (
      <ScrollView>
        <View style={styles.container}>
          <MapView style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude:45.746380014259245,
            longitude:4.834850259302889,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          }}>
          </MapView>
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
});

export default Map;
