import React, { Component,useState,useEffect } from 'react';
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
import * as Location from 'expo-location';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import * as BarsActions from '../store/actions/BarsActions';

const AdminFeedBar = props => {
  const dispatch = useDispatch();


  const cardClickEventListener = () => {
    Alert.alert("Baraka","En développement")
  }

  useEffect(() => {
}, []);

return (
    <View style={styles.container}>
      <View style={styles.notificationList}>
        <TouchableOpacity style={[styles.card, {borderColor:Colors.Gold}]} onPress={props.onSelectBar}>
            <View style={styles.cardContent}>
              <Image resizeMode="center" style={[styles.image, styles.imageContent]} source={{ uri: `data:image/png;base64,${props.picturesUrls}` }}/>
              <Text style={styles.name}>{props.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Grey,
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  notificationList:{
    padding:5,
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: Colors.White,
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10,
  },
  imageContent:{
    marginTop:-40,
  },
  image:{
    width:80,
    height:80,
    borderRadius:30,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
});

export default AdminFeedBar;
