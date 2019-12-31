import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const ConfidentialityScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>ConfidentialityScreen Screen!</Text>
        </View>
    );
};

ConfidentialityScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Create route',
        headerLayoutPreset: 'center',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Create route"
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

export default ConfidentialityScreen;
