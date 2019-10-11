import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight,TouchableOpacity,Alert,Button } from 'react-native';
import Colors from '../constant/Colors';

const OnClick = (bar) => {
  Alert.alert("Baraka","Informations du bar : "+bar.id);
  // Faire la redirection vers le screen BarInformations avec l'id du bar ??
};

export default (BarItems = props => (
  <TouchableOpacity onPress={() => OnClick(props)}>
    <View style={styles.box}>
      <Image resizeMode="center" style={styles.image} source={{ uri: props.picturesUrls }} />
      <View style={styles.boxContent}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.description}>{props.tags}</Text>
        <Text style={styles.description}>Note : {props.averageNotation}
        <Image resizeMode="center" style={styles.icon} source={require('../images/stars.png')}/>
        </Text>
        <View style={styles.buttons}>
          <TouchableHighlight style={[styles.button, styles.view]}>
            <Image style={styles.icon} source={require('../images/like.png')}/>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, styles.view]}>
            <Image style={styles.icon} source={require('../images/dislike.png')}/>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  </TouchableOpacity>
))

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
