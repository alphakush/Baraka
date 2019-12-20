import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync,
    Location
  } from 'expo-location';
import HeaderButton from '../components/HeaderButton';
import BarsList from '../components/BarsList';
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux';

const FeedScreen = props => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage ] = useState('');
  const [err, setErr ] = useState(null);

  const userlatitude = useSelector(state => state.auth.userlatitude);
  const userlongitude = useSelector(state => state.auth.userlongitude);

  const TrackUser = async () => {
      try {
          await requestPermissionsAsync();
      } catch (e) {
          setErr(e);
      }
  }

  useEffect(() => {
     TrackUser();
  }, []);
  const displayAllBarsHandler =  async () => {
      try {
          const response = await api.get('/allbars');
          setResults(response.data);
      } catch (e) {
          setErrorMessage("une erreur s'est produite");
      }
  };
  useEffect(() => {
      displayAllBarsHandler();
  },[]);

    return (
        <View style={styles.container}>
          <BarsList data={results} navigation={props.navigation} />
          {err ? <Text>Merci d'activer la localisation </Text> : null }
        </View>
    );
};

FeedScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Accueil ',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      flex: 1, paddingTop: 20
    }
});

export default FeedScreen;
