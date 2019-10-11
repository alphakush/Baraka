import React, { useState } from 'react';
import { View, Text, Keyboard, Button, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ScrollView } from 'react-native-gesture-handler';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constant/Colors'
import Input from '../components/Input';

const FindBarsScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');

    const searchInputHandler = inputText => {
        setEnteredValue(inputText);
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss(); }}>
                <View style={styles.screen}>
                    <Input
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={searchInputHandler}
                        value={enteredValue}
                        placeholder="Find your favorite bar"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Search"
                            color={Colors.accent}
                        />

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

FindBarsScreen.navigationOptions = () => {
    return {
        headerTitle: 'Trouver un bar',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    buttonContainer: {
        width: '50%'
    },
    input: {
        width: 200,
        textAlign: 'center'
    },
});

export default FindBarsScreen;
