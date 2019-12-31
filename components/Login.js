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
import Dialog from 'react-native-dialog';

const Login = props => {

  const errormsg = useSelector(state => state.auth.errorMessage);
  const connexionStatus = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [emailreset,setEmailReset] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conntected, setConntected] = useState(false);
  const [dialogvisible, setdialogvisible] = useState(false);

  const setEmailHandler = (enteredText) => {
    setEmail(enteredText);
  };

  const setEmailResetHandler = (enteredText) => {
    setEmailReset(enteredText);
  };

  const setPasswordHandler = (enteredText) => {
    setPassword(enteredText);
  };

  showDialog = () => {
    setdialogvisible(true);
  };

  handleCancel = () => {
    setdialogvisible(false);
  };

  handleReset = () => {
    //Envoi d'email pour le reset du mot de passe
    Alert.alert("Baraka","Reset du mot de passe du compte : "+emailreset)
  };

  useEffect(() => {
    signinHandler();
  }, [connexionStatus]);

  const signinHandler = () => {
    if (email != '') {
      if (password != '') {
        dispatch(AuthActions.signIn(email.toLowerCase(), password));
        {errormsg ? Alert.alert("Baraka",errormsg) : null }
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

  const ForgotPassword = () => {
    Alert.alert("Baraka", "Un email vous a été envoyé");
  };

  return (
    <TouchableWithoutFeedback onPress={() =>
      {Keyboard.dismiss(); }} >
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require('../images/background.png')} />
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

      <TouchableWithoutFeedback onPress={() =>
        {Keyboard.dismiss(); }} >
      <Dialog.Container visible={dialogvisible}>
        <Dialog.Title>Réinitialisation du mot de passe</Dialog.Title>
        <Dialog.Description>
          Entrez votre adresse email pour réinitialiser votre mot de passe
        </Dialog.Description>
        <Dialog.Input  placeholder="e-mail" value={emailreset} onChangeText={setEmailResetHandler}>
        </Dialog.Input>
        <Dialog.Button label="Annuler" onPress={handleCancel} />
        <Dialog.Button label="Réinitialiser" onPress={handleReset} />
      </Dialog.Container>
      </TouchableWithoutFeedback>

      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={showDialog}>
        <Text style={styles.loginText}>Mot de passe oublié</Text>
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
});

export default Login;
