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
        dispatch(BarsActions.getAllUsersAdmin());
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
                { text: "Supprimer", onPress: () => { sendDeleteOrder() } }
            ],
            { cancelable: false }
        )
    };

    function AfficherUser() {
        return <Text style={styles.informationText}> Utilisateur</Text>
    }

    function AfficherAdmin() {
        return <Text style={styles.informationText}> Administrateur</Text>
    }

    function AfficherManager() {
        return <Text style={styles.informationText}> Manager</Text>
    }

    function AfficherBouton() {
        return <SimpleLineIcons name="close" size={40} style={styles.iconDelete} />
    }

    function AfficherAccessLevel(props) {
        const l_accessLevel = props.accessLevel;
        switch (l_accessLevel) {
            case '-1':
                console.log(props.accessLevel)
                return <AfficherUser />
            case '1':
                return <AfficherManager />
            case '2':
                return <AfficherAdmin />
        }
    }

    function AfficherBoutonDelete(props) {
        if (props.accessLevel != '2') {
            return <AfficherBouton />
        }
        else {
            return <Text></Text>
        }
    }

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
                                <Text style={styles.informationText}>{props.email}</Text>
                            </View>
                            <View style={styles.grayInformation}>
                                <SimpleLineIcons name="graduation" size={20} />
                                <Text style={styles.accessLevelText}> <AfficherAccessLevel style={styles.informationText} accessLevel={props.accessLevel} /></Text>
                            </View>
                        </View>
                    </View >
                    <View style={styles.buttonPart}>
                        <TouchableOpacity onPress={confirmation}>
                            <AfficherBoutonDelete accessLevel={props.accessLevel}/>
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
    informationText: {
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
    iconDelete: {
        color: Colors.Red,
        textShadowColor: 'black',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2,
    }
});

export default UserRow;
