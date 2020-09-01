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
  Button
} from 'react-native';
import Colors from '../constant/Colors';
import * as Location from 'expo-location';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import * as BarsActions from '../store/actions/BarsActions';

const BarFeed = props => {
  const [barliked, setbarliked] = useState(false);
  const dispatch = useDispatch();

  const currentMealIsFavorite = useSelector(state => state.bars.favoriteBars.some(bar => bar._id === props.id));

  const Likebar = () => {
    if (barliked) {
      setbarliked(false)
      dispatch(BarsActions.removeBarToFavorite(props.id));
    } else {
      setbarliked(true)
      dispatch(BarsActions.addBarToFavorite(props.id));
    }
  };

  useEffect(() => {
    if(currentMealIsFavorite){
      setbarliked(true);
    }
}, []);

  return (
    <TouchableOpacity onPress={props.onSelectBar} >
      <View style={styles.card}>
       <View style={styles.cardHeader}>
          <View>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
        </View>
        <Image resizeMode="center" style={styles.cardImage} source={{ uri: `data:image/png;base64,${props.picturesUrls}` }}/>
        <View style={styles.cardFooter}>
          <View style={styles.socialBarContainer}>
            <View style={styles.socialBarSection}>
              <TouchableOpacity style={styles.socialBarButton} onPress={ () => Likebar(props.id) }>
                <Image style={styles.icon} source={barliked ? require('../images/hearts.png') : require('../images/heartsempty.png')}/>
                <Text style={styles.socialBarLabel}>{props.numberLike}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.socialBarSection}>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={20}
                readonly={true}
                fractions={1}
                startingValue={props.averageNotation}
              />
            </View>
            <View style={styles.socialBarSection}>
              <View style={styles.socialBarButton}>
                <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>{props.numbercomment}</Text>
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
    fontWeight: 'bold',
    alignSelf: 'center',
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
