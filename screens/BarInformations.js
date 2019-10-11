import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import { BARS } from '../data/data';

const BarInformations = props => {
    const barId = props.navigation.getParam('BarId');
    console.log(barId);
    return (
      <Text>
        Informations du bar
      </Text>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default BarInformations;
