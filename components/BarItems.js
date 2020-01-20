import React from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableHighlight,TouchableOpacity } from 'react-native';
import Colors from '../constant/Colors';

const BarItems = props => {

  const TapeLike = () => {
    Alert.alert("Baraka","You Like this bar");
  };

  const TapeDislike = () => {
    Alert.alert("Baraka","You Dislike this bar");
  };

  return (
      <TouchableOpacity onPress={props.onSelectBar} >
        <View style={styles.box}>
          <Image resizeMode="center" style={styles.image} source={{ uri: props.picturesUrls }} />
          <View style={styles.boxContent}>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.description}>Tags:
            {props.tags.map((item, key)=>(
            <Text key={key} style={styles.description}> {item} </Text>)
            )}
            </Text>
            <Text style={styles.description}>Note : {props.averageNotation}
              <Image resizeMode="center" style={styles.icon} source={require('../images/stars.png')}/>
            </Text>
            <View style={styles.buttons}>
              <TouchableHighlight style={[styles.button, styles.view]} onPress={() => TapeLike()}>
                <Image style={styles.icon} source={require('../images/like.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button, styles.view]} onPress={() => TapeDislike()}>
                <Image style={styles.icon} source={require('../images/dislike.png')}/>
              </TouchableHighlight>
            </View>
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
    flexWrap: "wrap"
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    flexWrap: "wrap"
  },
  title:{
    fontSize:18,
    color: Colors.Black,
    flex: 1,
    flexWrap: 'wrap'
  },
  description:{
    fontSize:15,
    color: Colors.GreyDark,
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

export default BarItems;
