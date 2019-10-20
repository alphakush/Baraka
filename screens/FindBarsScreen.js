import React, { useState } from 'react';
import { View, Keyboard, Button, StyleSheet, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api/api';

import HeaderButton from '../components/HeaderButton';
import SearchBar from "../components/SearchBar";
import ResultList from '../components/ResultList';

const FindBarsScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage ] = useState('');

    const searchApi =  async (reqbar) => {
        try {
            const reponse = await api.get('bar/'+reqbar);
            setResults(reponse.data);
        } catch (e) {
            setErrorMessage('Something went wrong');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }} >
            <View style={styles.screen}>
                <View >
                    <SearchBar term={enteredValue}
                               onTermChange={setEnteredValue}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Rechercher" onPress={ () => searchApi(enteredValue) }/>
                </View>
                <ResultList searchResult={results} navigation={props.navigation} />
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