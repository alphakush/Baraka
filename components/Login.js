import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import Colors from '../constant/Colors';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }

  CheckTextInput (){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (this.state.email != ''){
      if(reg.test(this.state.email) === false){
        Alert.alert("Baraka","Wrong email format");
        return;
      }
        if (this.state.password != ''){
          Alert.alert("Baraka","Login not available");
          // faire requête api connexion ici
          return;
    }else{
      Alert.alert("Baraka","Password can't be empty");
    }
    }else{
      Alert.alert("Baraka","Email can't be empty");
      return;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={{ uri: "https://r1.ilikewallpaper.net/iphone-4s-wallpapers/download/24756/Colorful-App-Tiles-Background-iphone-4s-wallpaper-ilikewallpaper_com.jpg" }}/>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="e-mail"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={email => this.setState({email})}/>
          <Image style={styles.inputIcon} source={require('../images/email.png')}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="mot de passe"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={password => this.setState({password})}/>
          <Image style={styles.inputIcon} source={require('../images/password.png')}/>
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.CheckTextInput()}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: Colors.Grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: Colors.White,
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent'
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
  bgImage:{
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText:{
    color: Colors.White,
    fontWeight:'bold'
  }
});

export default Login;
