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
  Keyboard,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import * as AuthActions from '../store/actions/AuthAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateAccount = props => {

  const connexionStatus = useSelector(state => state.auth.token);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const accessLevel = useSelector(state => state.auth.accessLevel);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [username, setUsername] = useState('');
  const [conntected, setConntected] = useState(false);

  const [textInputHolder, settextInputHolder] = useState(0);
  const [captchaHolder, setcaptchaHolder] = useState(0);
  const [randomNumberOne, setrandomNumberOne] = useState(0);

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
    generateCaptcha();
  }, [connexionStatus]);

  const signUpHandler = () => {
    var temp = randomNumberOne;
    if (textInputHolder != temp) {
      Alert.alert("Captcha incorrecte");
      generateCaptcha();
      return;
    }
    if (email != '') {
      var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(email)){
        Alert.alert("Barak","Ceci n'est pas une adresse mail valide")
      }
      if (username != '') {
        if (password != '') {
          if (password === confirmpassword) {
            dispatch(AuthActions.signUp(username, email, password));
            {errormsg ? Alert.alert("Baraka",errormsg) : null }
            if (connexionStatus !== null) {
              if(accessLevel == "1") { //L'utilisateur est un responsable de bar si accessLevel est égal à 1
                props.navigation.navigate('barManagerMainFlow');
              }
              else if(accessLevel == "2") { //L'utilisateur est Administrateur si accessLevel est égal à 2
                props.navigation.navigate('baradminMainFlow');
              }
              else {
                props.navigation.navigate('mainFlow');
              }
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

  const generateCaptcha = () => {
      var numberOne = Math.floor(Math.random() * 1000000) + 1;
      var captchaCode = numberOne ;
      setrandomNumberOne(numberOne);
      setcaptchaHolder(captchaCode);
  };
  const validateCaptchaCode = () => {
    var temp = randomNumberOne;
    if (textInputHolder == temp) {
      Alert.alert("Captcha Matched");
    }
    else {
      Alert.alert("Captcha NOT Matched");
    }
    generateCaptcha();
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#F4C52B' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
      extraScrollHeight={100}
    >
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); }} >
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
      <View style={styles.captchaContainerView}>
         <View style={ styles.captchaChildContainer}>
           <Image
             style={{ width: 180, height: 60, resizeMode: 'contain' }}
             source={{ uri: 'https://dummyimage.com/150x40/0091ea/fafafa.png&text=' + randomNumberOne }}
           />
           <TouchableOpacity onPress={generateCaptcha} >
             <Image source={require('../images/refresh.png')}
               style={{ width: 40, height: 35, resizeMode: 'contain', margin: 20 }} />
           </TouchableOpacity>
         </View>
         <View style={styles.inputContainer}>
           <TextInput style={styles.inputs}
             placeholder="Entrer le Captcha"
             underlineColorAndroid='transparent'
             onChangeText={settextInputHolder} />
         </View>
         <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={signUpHandler}>
           <Text style={styles.loginText}>Créer un compte</Text>
         </TouchableOpacity>
       </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gainsboro,
  },

  captchaContainerView: {
    height: 100,
  },
  captchaChildContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
