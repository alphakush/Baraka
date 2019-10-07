import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constant/Colors'

import HeaderButton from '../components/HeaderButton';

import Login from '../components/Login';

const LoginScreen = props => {
    return (
        <Login />
    );
};

LoginScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Se connecter',
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


export default LoginScreen;
