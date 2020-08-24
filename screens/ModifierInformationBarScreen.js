import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  label,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import Colors from '../constant/Colors';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as BarsActions from '../store/actions/BarsActions';


const ModifierInformationBarScreen = props => {
  const pLabel = props.navigation.getParam('label');
  const pContenuBdd = props.navigation.getParam('contenuBdd');
  const pBarId = props.navigation.getParam('barId');
  const pValueName = props.navigation.getParam('valueName');

  const dispatch = useDispatch();

  const [contentValue, setContentValue] = useState('');

  const setContentHandler = (enteredText) => {
    setContentValue(enteredText);
  };
  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }} >
        <View style={styles.container}>
          <View style={{ marginHorizontal: 30 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textLabel} multiline={true}>{pLabel}</Text>
              <Text style={styles.textLabelContenu}>Informations enregistrées en base </Text>
              <View style={styles.textContenuContainer1} multiline={true}>
                <Text style={styles.textContenu} multiline={true}>{pContenuBdd}</Text>
              </View>
              <Text style={styles.textLabelContenu}>Informations après modification</Text>
              <View style={styles.textContenuContainer2} multiline={true}>
                <TextInput
                  style={styles.textChange}
                  multiline={true}
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  autoFocus='true'
                  onChangeText={setContentHandler}>{pContenuBdd}</TextInput>
              </View>
            </View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity style={styles.Button} onPress={() => {
                mettreAJourBdd(pBarId, pValueName, contentValue)
              }}>
                <Text>Valider</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );

  function mettreAJourBdd(barId, nomVariable, contenu) {
    if (contenu == "") {
      contenu = pContenuBdd;
    }
    dispatch(BarsActions.updateContentBar(barId, nomVariable, contenu));
  }

};


const styles = StyleSheet.create({
  textLabel: {
    fontSize: 20,
    marginTop: 10,
    color: Colors.Black,
    fontWeight: 'bold',
    alignSelf: 'stretch'
  },
  textLabelContenu: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    color: '#808080',
    alignSelf: 'stretch'
  },
  textContenuContainer1: {
    borderRadius: 20,
    alignSelf: 'stretch'
  },
  textContenuContainer2: {
    backgroundColor: "floralwhite",
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'stretch'
  },
  textContenu: {
    marginLeft: 10,
    justifyContent: 'center',
    fontSize: 20,
    color: Colors.Black,
    alignSelf: 'stretch'
  },
  textChange: {
    fontSize: 20,
    marginLeft: 10,
    color: Colors.Black,
    alignSelf: 'stretch',

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "stretch"
  },
  ButtonContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 100,
    borderRadius: 15,
    backgroundColor: Colors.Gold,
    alignSelf: 'center'
  }
});

export default ModifierInformationBarScreen;
