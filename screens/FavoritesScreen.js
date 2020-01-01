import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import BarsList from '../components/BarsList';

const FavoritesScreen = props => {
    const myfavorite = useSelector(state => state.bars.favoriteBars);
    return (
        <View style={styles.container}>
            <BarsList data={myfavorite} navigation={props.navigation} />
        </View>
    );
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Mes bars favoris ',
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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        flex: 1, paddingTop: 20
    },
});

export default FavoritesScreen;
