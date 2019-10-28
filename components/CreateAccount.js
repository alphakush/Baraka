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


class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      email : '',
      password: '',
      confirmpassword : '',
    }
  }
  CheckTextInput (){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (this.state.email != ''){
      if(reg.test(this.state.email) === false){
        Alert.alert("Baraka","Format de l'email incorrect");
        return;
      }
      if (this.state.username != ''){
        if (this.state.password != ''){
          if (this.state.password === this.state.confirmpassword){
            Alert.alert("Baraka", "Registering not available");
            // faire la requête API pour inscription ici
            return;
          }else{
            Alert.alert("Baraka","Les mots de passe ne sont pas identique");
            return;}
        }else{
          Alert.alert("Baraka", "Veuillez rentrer un mot de passe");
          return;}
      }else{
        Alert.alert("Baraka", "Veuillez rentrer un nom d'utilisateur");
        return;}
    }else{
      Alert.alert("Baraka", "Veuillez rentrer une adresse email");
      return;}
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={require('../images/background.png')}/>
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
              placeholder="nom d'utilisateur"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({username})}/>
          <Image style={styles.inputIcon} source={require('../images/username.png')}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="mot de passe"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={password => this.setState({password})}/>
          <Image style={styles.inputIcon} source={require('../images/password.png')}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="confirmation du mot de passe"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={confirmpassword => this.setState({confirmpassword})}/>
          <Image style={styles.inputIcon} source={require('../images/password.png')}/>
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={()=> this.CheckTextInput()}>
          <Text style={styles.loginText}>Créer un compte</Text>
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
    borderBottomColor: Colors.BlueSky,
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
  errorMessage: {
    fontSize: 20,
    color: Colors.red,
    marginLeft:-80,
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
    backgroundColor: Colors.Grey,
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

export default CreateAccount;
