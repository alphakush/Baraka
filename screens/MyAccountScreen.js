import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constant/Colors';
import FilterSwitch from '../components/FilterSwitch';
import * as BarsActions from '../store/actions/BarsActions';

const MyAccountScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isDistance, setIsDistance] = useState(false);
  const [isDate, setIsDate] = useState(false);

  const username = useSelector(state => state.auth.username);
  const email = useSelector(state => state.auth.email);
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      Like: isLike,
      Distance: isDistance,
      Date: isDate,
    };
    dispatch(BarsActions.setFilters(appliedFilters));

  }, [isLike, isDistance, isDate, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

    return (
      <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.info}>Mes informations  </Text>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                  <Text style={styles.name}>{username}</Text>
                  <Text style={styles.email}>{email}</Text>
                </View>
                <Text style={styles.title} >Filtrer les bars par : </Text>
                <FilterSwitch
                    label="NOMBRE DE J'AIME"
                    state={isLike}
                    onChange={newvalue1 => setIsLike(newvalue1)}
                />
                <FilterSwitch
                    label='DISTANCE (-1KM)'
                    state={isDistance}
                    onChange={newvalue => setIsDistance(newvalue)}
                />
                <FilterSwitch
                    label='DATE (plus récent)'
                    state={isDate}
                    onChange={newvalue => setIsDate(newvalue)} />
            </View>
      </View>
    );
};

MyAccountScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Mon compte ',
        headerLayoutPreset: 'center',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Create route"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
      ),
      headerRight: (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                  title="Save"
                  iconName="ios-save"
                  onPress={ navData.navigation.getParam('save')}
              />
          </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
  header:{
    backgroundColor: Colors.Gold,
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: Colors.White,
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  title: {
      fontFamily: 'open-sans-bold',
      fontSize: 22,
      margin: 20,
      textAlign: 'center'
  },
  name:{
    fontSize:22,
    color:Colors.White,
    fontWeight:'600',
  },
  info:{
    fontSize:28,
    color:Colors.Brown,
    fontWeight:'600',
    alignSelf:'center',
    marginTop : 60,
  },
  body:{
    marginTop:90,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:32,
    color: Colors.Black,
    fontWeight: "600"
  },
  email:{
    fontSize:20,
    color: Colors.Black,
    marginTop:10
  },
});

export default MyAccountScreen;
