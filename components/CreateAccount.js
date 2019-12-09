import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import * as AuthActions from '../store/actions/AuthAction';


const CreateAccount = props => {

  const connexionStatus = useSelector(state => state.auth.token);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [username, setUsername] = useState('');
  const [conntected, setConntected] = useState(false);

  const setUsernameHandler = (enteredText) => {
    setUsername(enteredText);
  };

  const setEmailHandler = (enteredText) => {
    setEmail(enteredText);
  };

  const setPasswordHandler = (enteredText) => {
    setPassword(enteredText);
  };

  useEffect(() => {
    signUpHandler();
  }, [connexionStatus]);

  const signUpHandler = () => {
    if (email != '') {
      if (username != '') {
        if (password != '') {
          if (password === confirmpassword) {
            dispatch(AuthActions.signUp(username, email, password));
            if (connexionStatus !== null) {
              props.navigation.navigate('mainFlow');
            }
            return;
          } else {
            Alert.alert("Baraka", "Les mots de passe ne sont pas identique");
            return;
          }
        } else {
          Alert.alert("Baraka", "Veuillez rentrer un mot de passe");
          return;
        }
      } else {
        Alert.alert("Baraka", "Veuillez rentrer un nom d'utilisateur");
        return;
      }
    } else {
      return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();
    }}>
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require('../images/background.png')} />
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="e-mail"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={setEmailHandler} />
        <Image style={styles.inputIcon} source={require('../images/email.png')} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="nom d'utilisateur"
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={setUsernameHandler} />
        <Image style={styles.inputIcon} source={require('../images/username.png')} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="mot de passe"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={setPasswordHandler} />
        <Image style={styles.inputIcon} source={require('../images/password.png')} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="confirmation du mot de passe"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={setConfirmpassword} />
        <Image style={styles.inputIcon} source={require('../images/password.png')} />
      </View>

      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={signUpHandler}>
        <Text style={styles.loginText}>Créer un compte</Text>
      </TouchableOpacity>
      {errormsg ? Alert.alert("Baraka",errormsg) : null }
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
    borderBottomColor: Colors.BlueSky,
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
  errorMessage: {
    fontSize: 20,
    color: Colors.red,
    marginLeft: -80,
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
    color: 'white',
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

export default CreateAccount;
