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
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constant/Colors';
import HeaderButton from '../components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as BarsActions from '../store/actions/BarsActions';

const BarManagerScreen = props => {
  const connexionStatus = useSelector(state => state.auth.token);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();

  const barPicturesUrls = props.navigation.getParam('barPicturesUrls');
  const barTags = props.navigation.getParam('barTags');
  const barproducts = props.navigation.getParam('barproducts');
  const barDescription = props.navigation.getParam('barDescription');
  const barName = props.navigation.getParam('barName');
  const barAddress = props.navigation.getParam('barAddress');
  const barPhone = props.navigation.getParam('barPhone');
  const barManager = props.navigation.getParam('barManager');
  const barID = props.navigation.getParam('barID');
  const baropenhours = props.navigation.getParam('baropenhours');
  const barendhours = props.navigation.getParam('barendhours');
  const barstatut = props.navigation.getParam('barstatut');
  const barsiret = props.navigation.getParam('barsiret');

  const [namebar, setnamebar] = useState('');
  const [tags, setTags] = useState('');
  const [produit, setproduit] = useState('');
  const [siret, setSiret] = useState('');
  const [phone, setPhone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [description, setDescription] = useState('');
  const [statutname, setstatutname] = useState('');
  const [barstatutrefused, setbarstatutrefused] = useState(false);

  const [namebarmodify, setnamebarmodify] = useState(false);
  const [tagsmodify, setTagsmodify] = useState(false);
  const [produitmodify, setproduitmodify] = useState(false);
  const [siretmodify, setSiretmodify] = useState(false);
  const [phonemodify, setPhonemodify] = useState(false);
  const [adressemodify, setAdressemodify] = useState(false);
  const [descriptionmodify, setDescriptionmodify] = useState(false);
  const [statutmodify, setstatutmodify] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if (barstatut == '1'){
        setstatutname("Refusé")
        setbarstatutrefused(true)
      } else if (barstatut =='0'){
        setstatutname("En attente")
        setbarstatutrefused(false)
      } else{
        setstatutname("Accepté")
        setbarstatutrefused(false)
      }
  }, [dispatch]);

  const setBarnameHandler = (enteredText) => {
    setnamebar(enteredText);
    setnamebarmodify(true);
  };
  const setProduitHandler = (enteredText) => {
    setproduit(enteredText);
    setproduitmodify(true);
  };
  const setSiretHandler = (enteredText) => {
    setSiret(enteredText);
    setSiretmodify(true);
  };
  const setPhoneHandler = (enteredText) => {
    setPhone(enteredText);
    setPhonemodify(true);
  };
  const setTagsHandler = (enteredText) => {
    setTags(enteredText);
    setTagsmodify(true);
  };
  const setAdressHandler = (enteredText) => {
    setAdresse(enteredText);
    setAdressemodify(true);
  };
  const setDescriptionHandler = (enteredText) => {
    setDescription(enteredText);
    setDescriptionmodify(true);
  };

  const sendFormulaireHandler = async() => {

    var data = JSON.stringify({
      "barID":barID,
      "newName":namebar,
      "newTags":tags,
      "newProducts":produit,
      "newAddress":adresse,
      "newDescription":description,
      "newPhone":phone,
      "newSiret":siret
    });

    dispatch(BarsActions.updatemybarmanager(data)).then(() =>{
      {errormsg ? Alert.alert("Baraka",errormsg) : null }
      })
      Alert.alert("Baraka","Votre bar a été modifié")
      props.navigation.navigate('barManagerMainFlow');
      // Alert.alert("Baraka","Modifications envoyé avec succès")
    return;
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#F4C52B' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        extraScrollHeight={100}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); }} >
        <View style={styles.container}>
        <Text style={[styles.infostatut, {color: barstatutrefused ? Colors.Red : Colors.Black}]}>Statut : {statutname}</Text>
          <View>
          <Image resizeMode='contain' source={{ uri: `data:image/png;base64,${barPicturesUrls}` }} style={styles.avatar} />
          </View>
        <View style={styles.socialBarButton}>
          <Image style={styles.icon} source={require('../images/clock.png')}/>
          <Text style={styles.info}>Horaires : {baropenhours}h - {barendhours}h</Text>
        </View>
        <Text style={styles.infoinput}>Nom du bar</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Nom du bar"
              keyboardType="default"
              defaultValue={barName}
              underlineColorAndroid='transparent'
              onChangeText={setBarnameHandler} />
          </View>
          <Text style={styles.infoinput}>Description</Text>
          <View style={styles.inputContainermultiline}>
            <TextInput style={styles.inputsmultiline}
              multiline={true}
              editable={true}
              numberOfLines={6}
              textAlignVertical='top'
              placeholder="Description"
              keyboardType="default"
              defaultValue={barDescription}
              underlineColorAndroid='transparent'
              onChangeText={setDescriptionHandler} />
          </View>
          <Text style={styles.infoinput}>Tags</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Tags"
              keyboardType="default"
              defaultValue={barTags}
              underlineColorAndroid='transparent'
              onChangeText={setTagsHandler} />
          </View>
          <Text style={styles.infoinput}>Adresse</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Adresse"
              keyboardType="default"
              defaultValue={barAddress}
              underlineColorAndroid='transparent'
              onChangeText={setAdressHandler} />
          </View>
          <Text style={styles.infoinput}>Produits</Text>
          <View style={styles.inputContainermultiline}>
            <TextInput style={styles.inputsmultiline}
              multiline={true}
              editable={true}
              numberOfLines={6}
              textAlignVertical='top'
              placeholder="Produits"
              keyboardType="default"
              defaultValue={barproducts}
              underlineColorAndroid='transparent'
              onChangeText={setProduitHandler} />
          </View>
          <Text style={styles.infoinput}>N° Siret</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="N° SIRET"
              keyboardType="numeric"
              defaultValue={barsiret}
              underlineColorAndroid='transparent'
              onChangeText={setSiretHandler} />
          </View>
          <Text style={styles.infoinput}>Téléphone</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="N° Téléphone"
              keyboardType="numeric"
              defaultValue={barPhone}
              underlineColorAndroid='transparent'
              onChangeText={setPhoneHandler} />
          </View>
          <TouchableOpacity style={[styles.buttonContainerSend, styles.sendButton]} onPress={sendFormulaireHandler}>
            <Text style={styles.loginText}>Envoyer mes modifications</Text>
          </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
  </ScrollView>
  );
};

BarManagerScreen.navigationOptions = navData => {
  const getBarName = navData.navigation.getParam('barName');
  return {
    headerTitle: `Gérer mon bar ${getBarName}`,
    headerLayoutPreset: 'center',
  };
};

const styles = StyleSheet.create({
  infostatut: {
    color: Colors.Black,
    fontSize: 35,
    marginTop: 10,
  },
  infoinput: {
    color: Colors.Black,
    fontSize: 18,
    marginBottom: 2,
  },
  info: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    color: Colors.Black,
    fontSize: 18,
    paddingBottom: 8,
    marginBottom: 13,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 13,
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  image: {
    width: 250,
    height: 250,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: Colors.White,
    marginTop : 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Gold,
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
  inputContainermultiline: {
    borderBottomColor: Colors.LightBlue,
    backgroundColor: Colors.White,
    borderRadius: 15,
    borderBottomWidth: 1,
    width: 300,
    height: 80,
    marginBottom: 10,
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
    fontSize: 17,
    marginLeft: 16,
    borderBottomColor: Colors.White,
    flex: 1,
  },
  inputsmultiline: {
    height: 70,
    width:100,
    fontSize: 17,
    marginLeft: 16,
    borderBottomColor: Colors.White,
    flex: 1,
    textAlignVertical: "top",
  },
  errorMessage: {
    fontSize: 20,
    color: Colors.red,
    marginLeft: -80,
  },
  buttonContainerSend: {
    height: 45,
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  sendButton: {
    backgroundColor: Colors.Blue,
  },
  loginText: {
    color: 'white',
  },

});

export default BarManagerScreen;
