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
  KeyboardAvoidingView
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import * as AuthActions from '../store/actions/AuthAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import DateTimePicker from '@react-native-community/datetimepicker';

const FormulaireBar = props => {

  const connexionStatus = useSelector(state => state.auth.token);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();
  const [namebar, setnamebar] = useState('');
  const [tags, setTags] = useState('');
  const [produit, setproduit] = useState('');
  const [siret, setSiret] = useState('');
  const [coordonneesgps, setCoordonneesgps] = useState('');
  const [description, setDescription] = useState('');
  const [conntected, setConntected] = useState(false);

  const [textCaptchaHolder, settextCaptchaHolder] = useState(0);
  const [captchaHolder, setcaptchaHolder] = useState(0);
  const [randomNumberOne, setrandomNumberOne] = useState(0);


   const [openHours, setopenHours] = useState(new Date(1598051730000));
   const [endHours, setendHours] = useState(new Date(1598051730000));
   const [barOpenHours, setbarOpenHours] = useState('');
   const [barEndHours, setbarEndHours] = useState('');
   const [showOpen, setShowOpen] = useState(false);
   const [showEnd, setShowEnd] = useState(false);

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

  const setTagsHandler = (enteredText) => {
    setTags(enteredText);
  };
  const setCoordonneesgpsHandler = (enteredText) => {
    setCoordonneesgps(enteredText);
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
    if (coordonneesgps == ''){Alert.alert("Baraka", "Coordonnées GPS obligatoire"); return;}
    if (description == ''){Alert.alert("Baraka", "Description obligatoire"); return;}
    if (barOpenHours == '' || barEndHours == ''){Alert.alert("Baraka", "Horaires obligatoire"); return;}
    // on insert en base, il faut créer la route
    Alert.alert("Récapitulatif","Nom du bar: "+namebar+"\n"+"Description: "+description+"\n"+"Tags: "+tags+"\n"+"Produit: "+produit+"\n"+"GPS: "+coordonneesgps+"\n"+"Siret: "+siret+"\n"+"Heure ouverture: "+barOpenHours+"\n"+"Heure fermeture: "+barEndHours);
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
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#F4C52B' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); }} >
    <View style={styles.container}>
    <Text style={styles.TitlePage}>Formulaire création de bar</Text>
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
          placeholder="Coordonnées GPS"
          keyboardType="default"
          underlineColorAndroid='transparent'
          onChangeText={setCoordonneesgpsHandler} />
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

        <View>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={showTimepickerOpen}>
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
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={showTimepickerEnd}>
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
         <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={sendFormulaireHandler}>
           <Text style={styles.loginText}>Envoyer le formulaire</Text>
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

    alignItems: 'center',
    backgroundColor: Colors.Gold,
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
  Timerpicker: {

    alignItems: 'center',
    shadowColor: Colors.Grey,
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
