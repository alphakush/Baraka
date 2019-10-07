import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Favorites Screen!</Text>
        </View>
    );
};



FavoritesScreen.navigationOptions = {
    headerTitle : 'Favorites ',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;
