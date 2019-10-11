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
        Alert.alert("Baraka","Wrong email format");
        return;
      }
      if (this.state.username != ''){
        if (this.state.password != ''){
          if (this.state.password === this.state.confirmpassword){
            Alert.alert("Baraka", "Registering not available");
            return;
          }else{
            Alert.alert("Baraka","Password don't match. Try again");
            return;}
        }else{
          Alert.alert("Baraka", "Password can't be empty");
          return;}
      }else{
        Alert.alert("Baraka", "Username can't be empty");
        return;}
    }else{
      Alert.alert("Baraka", "Email can't be empty");
      return;}
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
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
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
    borderBottomColor: '#FFFFFF',
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
    color:"red",
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
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
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
    color:"white",
    fontWeight:'bold'
  }
});

export default CreateAccount;
