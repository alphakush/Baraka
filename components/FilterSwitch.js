import React from 'react';
import { View, Text, Platform, StyleSheet, Switch } from 'react-native';
import Colors from '../constant/Colors';

const FilterSwitch = props => {
    return (
            <View style={styles.filterContainer}>
                <Text> {props.label}</Text>
                <Switch
                trackColor = {{ true: Colors.primary}}
                thumbColor = { Platform.OS == 'android' ? Colors.primary : ''}
                value={props.state}
                onValueChange={props.onChange}/>
            </View>
    );
};

const styles = StyleSheet.create({
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
        width : '80%',
        marginVertical: 15
    }
});


export default FilterSwitch;
