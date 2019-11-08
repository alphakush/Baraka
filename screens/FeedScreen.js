import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

import BarsList from '../components/BarsList';
import { BARS } from '../data/data';
import LocalSign from '../components/LocalSign';
const FeedScreen = props => {
    return (
        <View style={styles.container}>
            <LocalSign navigation={props.navigation}/>
          <BarsList data={BARS} navigation={props.navigation} />
        </View>
    );
};

FeedScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Accueil ',
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
    },
    container: {
      flex: 1, paddingTop: 20
    }
});

export default FeedScreen;
