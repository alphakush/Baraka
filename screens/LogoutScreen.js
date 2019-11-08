import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import * as AuthActions from '../store/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';

const LogoutScreen = props => {
    const dispatch = useDispatch();
    
    const disconnectHandler = () => {
        dispatch(AuthActions.SignOut());
    }

    return (
        <View style={styles.screen}>
            <Text>Log out Screen!</Text>
            <Button title="Me déconnecter" onPress={disconnectHandler} />
        </View>
    );
};

LogoutScreen.navigationOptions = navData => {
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

export default LogoutScreen;
