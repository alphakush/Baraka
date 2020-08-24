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

import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import * as AuthActions from '../store/actions/AuthAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as BarsActions from '../store/actions/BarsActions';
const FormulaireBar = props => {

  const connexionStatus = useSelector(state => state.auth.token);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();
  const [namebar, setnamebar] = useState('');
  const [tags, setTags] = useState('');
  const [produit, setproduit] = useState('');
  const [siret, setSiret] = useState('');
  const [phone, setPhone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [description, setDescription] = useState('');

  const [textCaptchaHolder, settextCaptchaHolder] = useState(0);
  const [captchaHolder, setcaptchaHolder] = useState(0);
  const [randomNumberOne, setrandomNumberOne] = useState(0);

  const [openHours, setopenHours] = useState(new Date(1598051730000));
  const [endHours, setendHours] = useState(new Date(1598051730000));
  const [barOpenHours, setbarOpenHours] = useState('');
  const [barEndHours, setbarEndHours] = useState('');
  const [showOpen, setShowOpen] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [selectedImage, setSelectedImage] = useState('');

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
  }
  const onChangeOpen = (event, selectedTime) => {
    const currentOpenHours = selectedTime;
    setShowOpen(Platform.OS === 'ios');
    setbarOpenHours(currentOpenHours.toString().substring(16, 21));
    setopenHours(currentOpenHours);
  };
   const onChangeEnd = (event, selectedTime) => {
    const currentEndHours = selectedTime;
    setShowEnd(Platform.OS === 'ios');
    setbarEndHours(currentEndHours.toString().substring(16, 21));
    setendHours(currentEndHours);
  };

    const showModeOpen = currentMode => {
      if (showOpen){ setShowOpen(false);
      } else{ setShowOpen(true);
      }
    };
    const showModeEnd = currentMode => {
      if (showEnd){ setShowEnd(false);
      } else{ setShowEnd(true);
      }
    };

   const showTimepickerOpen = () => { showModeOpen('time'); };
   const showTimepickerEnd = () => { showModeEnd('time'); };

  const setDescriptionHandler = (enteredText) => {
    setDescription(enteredText);
  };

  const setBarnameHandler = (enteredText) => {
    setnamebar(enteredText);
  };
  const setProduitHandler = (enteredText) => {
    setproduit(enteredText);
  };
  const setSiretHandler = (enteredText) => {
    setSiret(enteredText);
  };
  const setPhoneHandler = (enteredText) => {
    setPhone(enteredText);
  };
  const setTagsHandler = (enteredText) => {
    setTags(enteredText);
  };
  const setAdressHandler = (enteredText) => {
    setAdresse(enteredText);
  };

  useEffect(() => {
    generateCaptcha();
  }, [connexionStatus]);

  const sendFormulaireHandler = () => {
    var temp = randomNumberOne;
    if (textCaptchaHolder == ''){
      Alert.alert("Baraka","Le Captcha ne peut être vide");
      generateCaptcha();
      return;
    }
    if (textCaptchaHolder != '') {
      if (textCaptchaHolder != temp) {
        Alert.alert("Captcha incorrecte");
        generateCaptcha();
        return;
      }
    }

    if (namebar == ''){Alert.alert("Baraka", "Nom de bar obligatoire"); return; }
    if (tags == ''){Alert.alert("Baraka", "Tags obligatoire"); return;}
    if (produit == ''){Alert.alert("Baraka", "Produit obligatoire"); return;}
    if (adresse == ''){Alert.alert("Baraka", "Adresse obligatoire"); return;}
    if (description == ''){Alert.alert("Baraka", "Description obligatoire"); return;}
    if (barOpenHours == '' || barEndHours == ''){Alert.alert("Baraka", "Horaires obligatoire"); return;}
    // on insert en base, il faut créer la route
    Alert.alert("Récapitulatif","Nom du bar: "+namebar+"\n"+"Description: "+description+"\n"+"Tags: "+tags+"\n"+"Produit: "+produit+"\n"+"GPS: "+adresse+"\n"+"Siret: "+siret+"\n"+"Heure ouverture: "+barOpenHours+"\n"+"Heure fermeture: "+barEndHours);
    return;
  };

  const generateCaptcha = () => {
      var numberOne = Math.floor(Math.random() * 1000000) + 1;
      var captchaCode = numberOne ;
      setrandomNumberOne(numberOne);
      setcaptchaHolder(captchaCode);
  };
  const validateCaptchaCode = () => {
    var temp = randomNumberOne;
    if (textCaptchaHolder == temp) {
      Alert.alert("Captcha Matched");
    }
    else {
      Alert.alert("Captcha NOT Matched");
    }
    generateCaptcha();
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
      extraScrollHeight={100}
    >
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); }} >
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonimage}>
          <Text style={styles.buttonTextimage}>Choisir une photo</Text>
        </TouchableOpacity>
        </View>
        <View>
          {selectedImage ? ( selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} /> ) : <View /> }
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Nom du bar"
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={setBarnameHandler} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Description"
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={setDescriptionHandler} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Tags"
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={setTagsHandler} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Adresse"
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={setAdressHandler} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Produits"
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={setProduitHandler} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="N° SIRET"
          keyboardType="numeric"
          underlineColorAndroid='transparent'
          onChangeText={setSiretHandler} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="N° Téléphone"
          keyboardType="numeric"
          underlineColorAndroid='transparent'
          onChangeText={setPhoneHandler} />
      </View>
        <View>
        <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={showTimepickerOpen}>
          <Text style={styles.openHoursText}>Horaires d'ouverture : {barOpenHours}</Text>
        </TouchableOpacity>
          {showOpen && (
            <DateTimePicker
              testID="dateTimePickerOpen"
              value={openHours}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeOpen}
            />
          )}
        </View>
        <View>
        <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={showTimepickerEnd}>
          <Text style={styles.openHoursText}>Horaires de fermeture : {barEndHours}</Text>
        </TouchableOpacity>
          {showEnd && (
            <DateTimePicker
              testID="dateTimePickerend"
              value={endHours}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeEnd}
            />
          )}
        </View>
      <View style={styles.captchaContainerView}>
         <View style={ styles.captchaChildContainer}>
           <Image
             style={{ width: 130, height: 60, resizeMode: 'contain' }}
             source={{ uri: 'https://dummyimage.com/150x40/0091ea/fafafa.png&text=' + randomNumberOne }}
           />
           <TouchableOpacity onPress={generateCaptcha} >
             <Image source={require('../images/refresh.png')}
               style={{ width: 40, height: 35, resizeMode: 'contain'}} />
           </TouchableOpacity>
         </View>
         <View style={styles.inputContainer}>
           <TextInput style={styles.inputs}
             placeholder="Entrer le Captcha"
             underlineColorAndroid='transparent'
             onChangeText={settextCaptchaHolder} />
         </View>
       </View>
       <TouchableOpacity style={[styles.buttonContainerSend, styles.sendButton]} onPress={sendFormulaireHandler}>
         <Text style={styles.loginText}>Envoyer le formulaire</Text>
       </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Gold,
  },
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
  captchaContainerView: {
    height: 100,
  },
  captchaChildContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: Colors.BlueSky,
    backgroundColor: Colors.White,
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  Timerpicker: {
    alignItems: 'center',
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
  sendButton: {
    backgroundColor: Colors.Blue,
  },
  loginText: {
    color: 'white',
  },
  openHoursText: {
    fontSize : 20,
    color: 'white',
  },
  TitlePage: {
    fontSize : 30,
    fontWeight: 'bold',
    textDecorationLine : 'underline',
    color: Colors.Burgudy,
    marginTop:20,
    marginBottom: 20,
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

export default FormulaireBar;
