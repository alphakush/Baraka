import React, { useState } from 'react';
import { View, Keyboard, Button, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ScrollView } from 'react-native-gesture-handler';
import test from '../api/test'

import HeaderButton from '../components/HeaderButton';
import SearchBar from "../components/SearchBar";
const FindBarsScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const searchInputHandler = inputText => {
        setEnteredValue(inputText);
    };
    const [result, setResults] = useState([]);

    const searchApi =  async () => {
        try {
            const reponse = await test.get('/bar/:barname', {
                params: {
                    barname: "Wallace"
                }
            });
            console.log("response" + reponse.data);
            setResults(reponse.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }} >
            <View style={styles.screen}>
                <View >
                    <SearchBar onChangeText={searchInputHandler}
                               value={enteredValue} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Rechercher" onPress={ () => searchApi() }/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

FindBarsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Trouver un bar',
        headerLayoutPreset: 'center',
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
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
});

export default FindBarsScreen;