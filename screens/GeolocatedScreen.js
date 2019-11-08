import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Map from '../components/Map';

import HeaderButton from '../components/HeaderButton';

const GeolocatedScreen = props => {
    return (
        <Map/>
    );
};

GeolocatedScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Me géolocaliser',
        headerLayoutPreset: 'center',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GeolocatedScreen;
