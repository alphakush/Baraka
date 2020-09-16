import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button,
    TextInput
} from 'react-native';
import Colors from '../constant/Colors';
import { useDispatch, useSelector } from 'react-redux';

const UserRow = props => {
    
    return (
        <View style={styles.container}>
            <Text>{props.username}</Text>
            <Text>{props.email}</Text>
            <Text>{props.accessLevel}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Grey,
    },
    formContent: {
        flexDirection: 'row',
        marginTop: 30,
    },
    notificationList: {
        padding: 5,
    },
    card: {
        height: null,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        backgroundColor: Colors.White,
        flexDirection: 'column',
        borderTopWidth: 40,
        marginBottom: 20,
    },
    cardContent: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    imageContent: {
        marginTop: -40,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'
    },
});

export default UserRow;
