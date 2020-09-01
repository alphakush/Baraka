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

const MyAccountScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isDistance, setIsDistance] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const connexionStatus = useSelector(state => state.auth.token);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const username = useSelector(state => state.auth.username);
  const email = useSelector(state => state.auth.email);
  const [selectedImageuri, setSelectedImageuri] = useState('');
  const [selectedImagetype, setSelectedImagetype] = useState('');
  // const infouser = useSelector(state => state.user.userinfo);

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
        setSelectedImageuri(result.uri);
      }
  }

  useEffect(() => {
    // dispatch(UserActions.getinfouser(email));
    // console.log(infouser)
  }, []);
  saveprofile = () => {
    const data = new FormData();
    let mimetype = selectedImageuri.slice((selectedImageuri.lastIndexOf('.') - 1 >>> 0) + 2);
    data.append('uploaduser', {
      uri:
      Platform.OS === "android" ? selectedImageuri : selectedImageuri.replace("file://", ""),
      type: mimetype,
      name:username+".jpg"
    });
    return;
    dispatch(UserActions.updatepictureprofileuser(data)).then(() =>{
      {errormsg ? Alert.alert("Baraka",errormsg) : null }
      })
    return;
   }

    return (
      <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.info}>Mes informations  </Text>
          </View>
          {selectedImageuri ? ( selectedImageuri &&
            <Image source={{ uri: selectedImageuri }} style={styles.avatar} /> ) :
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/> }
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                  <Text style={styles.name}>{username}</Text>
                  <Text style={styles.email}>{email}</Text>
                  <View>
                    <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonimage}>
                      <Text style={styles.buttonTextimage}>Changer ma photo</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                  </View>
                </View>
            </View>
      </View>
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
  buttonimage: {
    backgroundColor: Colors.Blue,
    padding: 10,
    borderRadius: 5,
    marginBottom:10,
    marginTop:10,
    borderRadius: 30,
  },
  buttonTextimage: {
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
});

export default MyAccountScreen;
