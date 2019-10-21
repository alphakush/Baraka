import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,TouchableOpacity, Alert,Button,TouchableWithoutFeedback,Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import api from '../api/api';

import Colors from '../constant/Colors';
import { BARS } from '../data/data';

// TODO: 'rename the name this screen'
const BarInformations = props => {
    const bar = props.navigation.getParam('Bar');
    const [enteredValue, setEnteredValue] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage ] = useState('');
    console.log(bar);

    const TapeLike = () => {
      Alert.alert("Baraka","You Like this bar");
    };

    const TapeDislike = () => {
      Alert.alert("Baraka","You Dislike this bar");
    };

    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image resizeMode="center" style={styles.avatar}
                  source={{uri: bar.picturesUrls}}/>
                <Text style={styles.name}>
                  {bar.name}
                </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight style={[styles.button, styles.view]} onPress={() => TapeLike()}>
              <Image style={styles.icon} source={require('../images/like.png')}/>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, styles.view]} onPress={() => TapeDislike()}>
              <Image style={styles.icon} source={require('../images/dislike.png')}/>
            </TouchableHighlight>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.textInfo}>
                Description : {bar.description}
              </Text>
              <Text style={styles.textInfo}>
                Note : {bar.averageNotation}
                <Image resizeMode="center" style={styles.icon} source={require('../images/stars.png')}/>
              </Text>
              <Text style={styles.textInfo}>
                Tags :
              </Text>
              { bar.tags.map((item, key)=>(
              <Text key={key} style={styles.TextStyle}> { item } </Text>)
              )}
              <Text style={styles.textInfo}>
                Commentaires :
              </Text>
              { bar.commentaires.map((item, key)=>(
              <Text key={key} style={styles.TextStyle}> { item } </Text>)
              )}
            </View>
        </View>

      </View>
    );
};

const styles = StyleSheet.create({

  header:{
    backgroundColor: Colors.LightBlue,
  },
  headerContent:{
    alignItems: 'center',
    padding: 5,
  },
  buttons:{
    flexDirection: 'row',
    marginLeft: 135,
  },
  MainContainer: {
   flex: 1,
   margin: 10

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
  body: {
    backgroundColor: Colors.White,
    flexDirection: 'row',
  },
  avatar: {
    width: 150,
    height: 150,
    borderColor: Colors.White,
    marginBottom:10,
  },
  icon:{
    width:20,
    height:20,
  },
  TextStyle:{
   fontSize : 18,
    textAlign: 'center'
 },
  name:{
    fontSize:22,
    color:Colors.Black,
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  view: {
    backgroundColor: Colors.accentColor,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: Colors.Black,
  }
});


export default BarInformations;
