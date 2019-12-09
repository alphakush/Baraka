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

import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import * as AuthActions from '../store/actions/AuthAction';

const Login = props => {

  const connexionStatus = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conntected, setConntected] = useState(false);

  const setEmailHandler = (enteredText) => {
    setEmail(enteredText);
  };

  const setPasswordHandler = (enteredText) => {
    setPassword(enteredText);
  };


  useEffect(() => {
    signinHandler();
  }, [connexionStatus]);

  const signinHandler = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email != '') {
      if (reg.test(email) === false) {
        Alert.alert("Baraka", "Format de l'e-mail est erroné");
        return;
      }
      if (password != '') {
        dispatch(AuthActions.signIn(email.toLowerCase(), password));

        if (connexionStatus !== null) {
          props.navigation.navigate('mainFlow');
        }
        return;
      } else {
        Alert.alert("Baraka", "Le mot de passe ne peut pas être vide");
      }
    } else {
      return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => 
      {Keyboard.dismiss(); }} >
    <View style={styles.container}>
      <Image style={styles.bgImage} source={{ uri: "https://r1.ilikewallpaper.net/iphone-4s-wallpapers/download/24756/Colorful-App-Tiles-Background-iphone-4s-wallpaper-ilikewallpaper_com.jpg" }} />
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="e-mail"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={setEmailHandler}
          value={email}
        />
        <Image style={styles.inputIcon} source={require('../images/email.png')} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="mot de passe"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={setPasswordHandler}
          value={password}
        />
        <Image style={styles.inputIcon} source={require('../images/password.png')} />
      </View>

      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={signinHandler}>
        <Text style={styles.loginText}>Me connecter</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}

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
  inputs: {
    height: 45,
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
    backgroundColor: "#00b5ec",

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

export default Login;
