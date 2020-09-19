import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as BarsActions from '../store/actions/BarsActions';


const UserRow = props => {

    const dispatch = useDispatch();


    const sendDeleteOrder = async () => {
        dispatch(BarsActions.deleteUser(props.username));
        Alert.alert("Suppression effectuée");
    };

    const confirmation = async () => {
    Alert.alert(
      "Confirmation de suppression",
      "Supprimer l'utilisateur " + props.username,
      [
        {
          text: "Non",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Supprimer", onPress: () => {sendDeleteOrder()} }
      ],
      { cancelable: false }
    )
    };


    return (
        <View style={styles.separator}>
            <View style={styles.container}>
                <Image resizeMode='contain' source={{ uri: `data:image/png;base64,${props.image}` }} style={styles.image} />
                <View style={styles.containerRight}>
                    <View style={styles.userInformation}>
                        <View style={styles.usernameContainer}>
                            <SimpleLineIcons name="user" size={20} />
                            <Text style={styles.usernameText}>{props.username}</Text>
                        </View>
                        <View style={styles.emailAcesslevelContainer}>
                            <View style={styles.grayInformation}>
                                <SimpleLineIcons name="envelope" size={20} />
                                <Text style={styles.emailText}>{props.email}</Text>
                            </View>
                            <View style={styles.grayInformation}>
                                <SimpleLineIcons name="graduation" size={20} />
                                <Text style={styles.accessLevelText}>{props.accessLevel}</Text>
                            </View>
                        </View>
                    </View >
                    <View style={styles.buttonPart}>
                        <TouchableOpacity onPress={confirmation}>
                            <SimpleLineIcons name="close" size={40} style={styles.iconDelete} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 400 / 2,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    usernameText: {
        marginHorizontal: 10,
        fontSize: 17, 
        fontWeight: 'bold'
    },
    emailText: {
        fontSize: 15,
        color: Colors.GreyDark,
        marginHorizontal: 10,
    },
    accessLevelText: {
        fontSize: 15,
        color: Colors.GreyDark,
        marginHorizontal: 10,
    },
    containerRight: {
        flex: 1,
        flexDirection: 'row'
    },
    usernameContainer: {
        flexDirection: 'row',
    },
    grayInformation: {
        flexDirection: 'row',
    },
    userInformation: {
        width: '80%',
    },
    buttonPart: {
        justifyContent: 'center',
        width: '20%',
    },
    iconDelete:{        
        color: Colors.Red,
        textShadowColor: 'black', 
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2, 
    },
});

export default UserRow;
