import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import HeaderButton from '../components/HeaderButton';

const PromotionScreen = props => {

    return (
        <View style={styles.screen}>
            <QRCode content="https://baraka-api.herokuapp.com/"/>
        </View>
    );
};


PromotionScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Mes Promotions',
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


export default PromotionScreen;
