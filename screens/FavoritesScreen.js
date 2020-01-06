import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import BarsList from '../components/BarsList';
import * as BarsActions from '../store/actions/BarsActions';

const FavoritesScreen = props => {
    const dispatch = useDispatch();

    const myfavorite = useSelector(state => state.bars.favoriteBars);

    const loadFavorites = async () => {
        await dispatch(BarsActions.getFavoriteBar());
    }

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadFavorites);
        return () => {
            willFocusSub.remove();
        }
    },[loadFavorites]);

    if (myfavorite.length === 0) {
        return (
        <View style={styles.centered}>
            <Text>Oups, vous semblez pas encore avoir de bars favoris.</Text>
            <Text>Parcourez la liste des bars pour en retenir quelqu'uns.</Text>
        </View>)
    }

    
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
    centered: { 
        flex: 1, 
        justifyContent: 'center',
         alignItems: 'center' }
});

export default FavoritesScreen;
