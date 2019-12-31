import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constant/Colors'

const SearchBar = props => {
    return (
        <View style={styles.screen} >
            <Feather name="search" style={styles.iconStyle} />
            <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Rechercher un bar"
                value={props.term}
                onChangeText={props.onTermChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        marginTop: 10,
        backgroundColor: Colors.GreyLight,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});

export  default SearchBar;
