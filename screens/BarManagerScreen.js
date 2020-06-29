import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  label,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constant/Colors';
import HeaderButton from '../components/HeaderButton';
import { useDispatch,useSelector } from 'react-redux';
import * as AuthActions from '../store/actions/AuthAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BarManagerScreen = props => {

    return (
      <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); }} >
            <View style={styles.container}>
            <Image style={styles.bgImage} source={require('../images/background_without_words.png')} />
            <Image resizeMode='contain' style={styles.image} source={require("../images/wallace_bar.png")} />
              <View style={styles.policeStyle}>
                <Text style={styles.policeStyle}>Nom : Wallace Bar</Text>
                <Text style={styles.policeStyle}>Description : Le meilleur bar pour prendre une bière à Lyon !</Text>
                <Text style={styles.policeStyle}>Tags : Cool, sympa, magnifique</Text>
              </View>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button} onPress={() => {
                 alert("Feature dispo prochainement :D")
                }}>
            <Text style={styles.ButtonText}>Modifier les informations du bar </Text>
          </TouchableOpacity>
        </View>
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
};

BarManagerScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Gérer mon bar',
        headerLayoutPreset: 'center',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Create route"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gainsboro,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: '100%',
  },
  btnText: {
    color: Colors.White,
    fontWeight: 'bold'
  },
  policeStyle: {
    fontSize: 18,
    marginTop: 10,
    color: Colors.Black,
  },
  ButtonText: {
    color: Colors.Black,
    fontSize: 20,
  },
  Button: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Gold,
  }
});

export default BarManagerScreen;
