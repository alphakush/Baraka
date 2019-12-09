import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Button,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView
 } from 'react-native';
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
    // récuperer les commentaires en base (il faut modifier la table comment pour que ça ressemble aux data ci dessous)
    const data=[
        {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Tony Stark",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"Natasha Romanof",     comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"Steve Rogers", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Bruce Banner",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Clint Barton",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name:"Nick Fury", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"Thor Odinson",      comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
      ]

    const TapeLike = () => {
      Alert.alert("Baraka","You Like this bar");
    };

    const TapeDislike = () => {
      Alert.alert("Baraka","You Dislike this bar");
    };

    const GoToBar = () => {
      Alert.alert("Baraka","Itinéraire non disponible pour l'instant")
    };

    const Likebar = () => {
      like = true;
      Alert.alert("Baraka","Vous aimez ce bar")
    };

    return (
      <ScrollView>
        <View style={styles.container}>
        {/* Information du bar */}
        <View style={{marginHorizontal:30}}>
          <Image resizeMode='contain' style={styles.image} source={{uri:bar.picturesUrls}}/>
          <View style= {{alignItems:'center'}}>
            <Text style={styles.nameBar}>{bar.name}</Text>
            <View style={styles.aligntext}>
              <Text style={styles.Notebar}>{bar.averageNotation}</Text>
              <Image style={styles.icon} source={require('../images/rated.png')}/>
            </View>
              {bar.tags.map((item, key) => (
                <Text key={key} style={styles.descriptionBar}> {item} </Text>
              ))}
            <TouchableOpacity onPress={ () => Likebar() }>
              <Image style={styles.like} source={{uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png'}}/>
            </TouchableOpacity>
            <Text style={styles.descriptionBar}>{bar.description}</Text>
          </View>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.Button} onPress={()=> GoToBar()}>
            <Text style={styles.ButtonText}>S'y rendre</Text>
          </TouchableOpacity>
        </View>

        {/* Espace commentaire */}
        <FlatList
          style={styles.rootCom}
          data={data}
          ItemSeparatorComponent={() => {
            return (<View style={styles.separatorCom}/>)
          }}
          keyExtractor={(item)=>{
            return item.id.toString();
          }}
          renderItem={(item) => {
            const Commentaire = item.item;
            return(
              <View style={styles.containerCom}>
                  <Image style={styles.imageCom} source={{uri: Commentaire.image}}/>
                <View style={styles.contentCom}>
                  <View style={styles.contentHeaderCom}>
                    <Text  style={styles.nameCom}>{Commentaire.name}</Text>
                  </View>
                  <Text rkType='primary3 mediumLine'>{Commentaire.comment}</Text>
                </View>
              </View>
            );
        }}/>
    </View>
  </ScrollView>
    );
};

const styles = StyleSheet.create({
  // Header
  nameBar:{
   fontSize:28,
   color:Colors.Black,
   fontWeight:'bold'
 },
 Notebar:{
   marginTop:10,
   fontSize:18,
   color:Colors.Green,
   fontWeight:'bold',
 },
 descriptionBar:{
   fontSize:18,
   textAlign:'center',
   marginTop:10,
   color:Colors.Black,
 },
 aligntext:{
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
 },

 //Bouton
 ButtonContainer:{
    marginHorizontal:30
  },
  ButtonText:{
    color: Colors.Black,
    fontSize:20,
  },
  Button: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: Colors.Gold,
  },

  //Espace commentaire
  rootCom: {
    backgroundColor: Colors.White,
    marginTop:10,
  },
  separatorCom: {
    height: 1,
    backgroundColor: Colors.Brown
  },
  containerCom: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentCom: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeaderCom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  imageCom:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  timeCom:{
    fontSize:11,
    color:Colors.Grey,
  },
  nameCom:{
    fontSize:16,
    fontWeight:"bold",
  },

//Divers
  image:{
    height: 100,
    width: null,
  },
  icon:{
    width:20,
    height:20,
  },
  like:{
    width:40,
    height:40,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: Colors.Black,
  }
});


export default BarInformations;
