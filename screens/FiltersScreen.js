import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import FilterSwitch from '../components/FilterSwitch';
import Colors from '../constant/Colors';

const FiltersScreen = props => {
    const [isLike, setIsLike] = useState(false);
    const [isDistance, setIsDistance] = useState(false);
    const [isDate, setIsDate] = useState(false);

    return (
        <View style={styles.screen}>
            <Text style={styles.title} >Available Filters</Text>
            <FilterSwitch
                label='LIKE'
                state={isLike}
                onChange={newvalue1 => setIsLike(newvalue1)}
            />
            <FilterSwitch
                label='DISTANCE'
                state={isDistance}
                onChange={newvalue => setIsDistance(newvalue)}
            />
            <FilterSwitch
                label='DATE'
                state={isDate}
                onChange={newvalue => setIsDate(newvalue)} />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter ',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={() => {
                        Alert.alert("Baraka", "Filter save not available");
                    }}
                />
            </HeaderButtons>
        )
    };
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    }
});

export default FiltersScreen;
