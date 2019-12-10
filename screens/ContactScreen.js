import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constant/Colors';
import HeaderButton from '../components/HeaderButton';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/AuthAction';

const ContactScreen = props => {
  const [email, setEmail] = useState('');
  const [msg, setmsg] = useState('');
  const dispatch = useDispatch();

  const setEmailHandler = (enteredText) => {
    setEmail(enteredText);
  };
  const setmsgHandler = (enteredText) => {
    setmsg(enteredText);
  };

  const sendmessage = () => {
    dispatch(AuthActions.contactEmail(email, msg));
  };

    return (
      <TouchableWithoutFeedback onPress={() =>
        {Keyboard.dismiss(); }} >
        <View style={styles.container}>
          <Image style={styles.bgImage} source={require('../images/contact.png')} />

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="e-mail"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={setEmailHandler}
              value={email}
            />
            </View>
            <View style={styles.inputContainermsg}>
              <TextInput style={styles.inputsmsg}
                multiline
                editable
                numberOfLines={6}
                placeholder="message"
                underlineColorAndroid='transparent'
                onChangeText={setmsgHandler}
                value={msg}
              />
              </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={sendmessage}>
            <Text style={styles.loginText}>Envoyer</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    );
};

ContactScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Nous contacter',
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
  inputContainer: {
    borderBottomColor: Colors.LightBlue,
    backgroundColor: Colors.White,
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.Grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainermsg: {
    borderBottomColor: Colors.LightBlue,
    backgroundColor: Colors.White,
    borderRadius: 15,
    borderBottomWidth: 1,
    width: 300,
    height: 150,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.Grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: Colors.White,
    flex: 1,
  },
  inputsmsg: {
    height: 45,
    width:100,
    marginLeft: 16,
    borderBottomColor: Colors.White,
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent'
  },
  loginButton: {
    backgroundColor: Colors.Blue,
    shadowColor: Colors.Grey,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
  },
  loginText: {
    color: Colors.White,
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.White,
    fontWeight: 'bold'
  }
});

export default ContactScreen;
