import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps'

const Map = () => {
    return <MapView style={styles.map} 
    initialRegion={{
        latitude:43.6123646,
        longitude:1.4290608,
        latitudeDelta:0.01,
        longitudeDelta:0.01
    }}
    />
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        height: 300
    }
});

export default Map;