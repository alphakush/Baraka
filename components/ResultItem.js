import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight,TouchableOpacity } from 'react-native';
import Colors from '../constant/Colors';

const ResultItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelectBar} >
            <View style={styles.box}>
                <Image resizeMode="center" style={styles.image} source={{ uri: props.picturesUrls }} />
                <View style={styles.boxContent}>
                    <Text style={styles.title}>{props.name}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                    <Text style={styles.description}>Note : {props.averageNotation}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height:100,
    },
    box: {
        padding:20,
        marginTop:5,
        marginBottom:5,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    boxContent: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft:10,
    },
    title:{
        fontSize:18,
        //TODO add color in Color.js and import
        color:"#151515",
    },
    description:{
        fontSize:15,
        color: "#646464",
    },
    buttons:{
        flexDirection: 'row',
    },
    button: {
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        width:50,
        marginRight:5,
        marginTop:5,
    },
    icon:{
        width:20,
        height:20,
    },
    view: {
        backgroundColor: Colors.accentColor,
    },
})

export default ResultItem;
