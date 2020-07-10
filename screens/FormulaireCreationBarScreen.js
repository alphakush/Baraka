import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import FormulaireBar from '../components/FormulaireBar';

const FormulaireCreationBarScreen = props => {
    return (
        <FormulaireBar navigation={props.navigation} />
    );
};

FormulaireCreationBarScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Creation de bar',
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

export default FormulaireCreationBarScreen;
