import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import Colors from '../constant/Colors';

const BarFeed = props => {

  const Likebar = (barname) => {
    like = true;
    Alert.alert("Baraka","Vous aimez "+barname)
  };

  return (
    <TouchableOpacity onPress={props.onSelectBar} >
      <View style={styles.card}>
       <View style={styles.cardHeader}>
          <View>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
        </View>
        <Image resizeMode="center" style={styles.cardImage} source={{uri:props.picturesUrls}}/>
        <View style={styles.cardFooter}>
          <View style={styles.socialBarContainer}>
            <View style={styles.socialBarSection}>
              <TouchableOpacity style={styles.socialBarButton} onPress={ () => Likebar(props.name) }>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png'}}/>
                <Text style={styles.socialBarLabel}>78</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.socialBarSection}>
              <View style={styles.socialBarButton}>
                <Image style={styles.icon} source={require('../images/rated.png')}/>
                <Text style={styles.socialBarLabel}>{props.averageNotation}</Text>
              </View>
            </View>
            <View style={styles.socialBarSection}>
              <View style={styles.socialBarButton}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>13</Text>
              </View>

            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:Colors.GreyLight,
  },
  separator: {
    marginTop: 10,
  },
  card:{
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:Colors.White
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 100,
    width: null,
  },
  title:{
    fontSize:22,
    flex:1,
  },
  description:{
    fontSize:15,
    color: Colors.GreyDark,
    marginTop: 5
  },
  icon: {
    width:20,
    height:20,
  },
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BarFeed;
