import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  Button,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  FlatList
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constant/Colors';
import FilterSwitch from '../components/FilterSwitch';
import * as BarsActions from '../store/actions/BarsActions';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MyAccountScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isDistance, setIsDistance] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const connexionStatus = useSelector(state => state.auth.token);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const email = useSelector(state => state.auth.email);
  const [selectedImageuri, setSelectedImageuri] = useState('');
  const [selectedImagetype, setSelectedImagetype] = useState('');
  const userInfo = useSelector(state => state.bars.userinfo);
  const [grade,setgrade] = useState('');
  const [username, setusername] = useState('');
  const [emailu, setemailu] = useState('');
  const [imagefinal, setimagefinal] = useState();



  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result.type)
        setSelectedImageuri(result.uri);
      }
  }

  useEffect(() => {
    if (userInfo.accessLevel == "-1"){
      setgrade('Utilisateur')
    } else if (userInfo.accessLevel == "1"){
      setgrade('Manager')
    } else if (userInfo.accessLevel == "2"){
      setgrade('Administrateur')
    }

    setimagefinal(userInfo.image)
  }, []);

  saveprofile = () => {
    Alert.alert("Barak","Boutton non fonctionnel")
   }

   const changerphotoprofile = () => {
     console.log("username"+username)
     console.log("email"+emailu)

     if (selectedImageuri == "") {Alert.alert("Baraka", "Image obligatoire pour le changement"); return; }
     if (username == "" && emailu == "") {Alert.alert("Baraka", "Username/email obligatoire pour le changement"); return; }
     var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if (!regexEmail.test(email)){ Alert.alert("Barak","Ceci n'est pas une adresse mail valide"); return;}

     let mimetype = selectedImageuri.slice((selectedImageuri.lastIndexOf('.') - 1 >>> 0) + 2);
     const data = new FormData();
     data.append('uploaduser', {
       uri:
       Platform.OS === "android" ? selectedImageuri : selectedImageuri.replace("file://", ""),
       type: mimetype,
       name:userInfo.username+".jpg"
     });

     data.append('newUsername',username);
     data.append('newEmail',emailu);

     dispatch(BarsActions.updateuserinfo(data)).then(() =>{
       {errormsg ? Alert.alert("Baraka",errormsg) : null }
       })
       Alert.alert("Baraka","Modifications envoyé avec succès")
     return;
    }

    const setUsernameHandler = (enteredText) => {
      setusername(enteredText);
    };
    const setEmailuHandler = (enteredText) => {
      setemailu(enteredText);
    };

    return (
      <ScrollView>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
          enableOnAndroid={true}
          enableAutomaticScroll={(Platform.OS === 'ios')}
          extraScrollHeight={100}>
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); }} >
      <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.info}>{grade}</Text>
          </View>
          {selectedImageuri ?
          <Image resizeMode='contain' style={styles.avatar} source={{ uri: selectedImageuri }}/>
        :
       <Image resizeMode='contain' style={styles.avatar} source={{ uri: `data:image/png;base64,${imagefinal}` }} />}
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonimageprofile}>
                  <Text style={styles.buttonTextimageProfil}>Changer ma photo de profil</Text>
                </TouchableOpacity>
                <Text style={styles.infoinput}>Nom d'utilisateur</Text>
                  <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                      placeholder="Username"
                      keyboardType="default"
                      defaultValue={userInfo.username}
                      underlineColorAndroid='transparent'
                      onChangeText={setUsernameHandler} />
                  </View>
                  <Text style={styles.infoinput}>Email</Text>
                  <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                      placeholder="Email"
                      keyboardType="default"
                      defaultValue={userInfo.email}
                      underlineColorAndroid='transparent'
                      onChangeText={setEmailuHandler} />
                  </View>
                  <View>
                    <TouchableOpacity onPress={changerphotoprofile}
                    style={styles.buttonimage}>
                      <Text style={styles.buttonTextimage}>Enregistrer mon profil</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                  </View>
                </View>
            </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
</ScrollView>
    );
};

MyAccountScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Mon compte ',
        headerLayoutPreset: 'center',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Create route"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
      ),
      headerRight: (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                  title="Save"
                  iconName="ios-save"
                  onPress={() => {this.saveprofile()}}
              />
          </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom:10,
  },
  inputs: {
    height: 45,
    fontSize: 17,
    marginLeft: 16,
    borderBottomColor: Colors.White,
    flex: 1,
  },
  infoinput: {
    color: Colors.Black,
    fontSize: 18,
    marginBottom: 2,
  },
  inputContainer: {
    borderBottomColor: Colors.BlueSky,
    backgroundColor: Colors.White,
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonimage: {
    backgroundColor: Colors.Blue,
    padding: 10,
    borderRadius: 5,
    marginBottom:10,
    marginTop:10,
    borderRadius: 30,
  },
  buttonimageprofile: {
    backgroundColor: Colors.Blue,
    padding: 10,
    borderRadius: 5,
    marginBottom:20,
    borderRadius: 30,
  },
  buttonTextimage: {
    fontSize: 28,
    color: '#fff',
  },
  buttonTextimageProfil: {
    fontSize: 20,
    color: '#fff',
  },
  header:{
    backgroundColor: Colors.Gold,
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: Colors.White,
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  title: {
      fontFamily: 'open-sans-bold',
      fontSize: 22,
      margin: 20,
      textAlign: 'center'
  },
  info:{
    fontSize:28,
    color:Colors.Brown,
    fontWeight:'600',
    alignSelf:'center',
    marginTop : 60,
  },
  body:{
    marginTop:90,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:32,
    color: Colors.Black,
    fontWeight: "600"
  },
  email:{
    fontSize:20,
    color: Colors.Black,
    marginTop:10
  },
  grade:{
    fontSize:20,
    color: Colors.Black,
    marginTop:10
  },
});

export default MyAccountScreen;
