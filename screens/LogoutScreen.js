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
        props.navigation.navigate('loginFlow');
    }

    return (
        <View style={styles.screen}>
            <Text>Cliquer ici pour vous déconnecter</Text>
            <Button title="Me déconnecter" onPress={disconnectHandler} />
        </View>
    );
};

LogoutScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Se déconnecter ',
        headerLayoutPreset: 'center',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Se déconnecter"
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
    button: {
        
    }
});

export default LogoutScreen;
