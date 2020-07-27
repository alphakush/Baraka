import React, { useState, useCallback, useEffect } from 'react';
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
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constant/Colors';
import HeaderButton from '../components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



const BarManagerScreen = props => {
  const allbars = useSelector(state => state.bars.allbars);
  //const managerBarId = useSelector(state => state.bars.managerbarid);
  const managerBarId = "5e16f77ce163d4001717d4aa";

  var bar;
  bar = getBarFromManagerBarId(allbars, managerBarId);
  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }} >
        <View style={styles.container}>
          <View style={{ marginHorizontal: 30 }}>
            <Image resizeMode='contain' style={styles.image} source={{ uri: `data:image/png;base64,${bar.image}` }} />
            <View style={{ alignItems: 'center' }}>
              <View style={styles.ContainerInformationToChange}>
                <Text style={styles.nameBar}>{bar.name}</Text>
                <View style={styles.ButtonContainer}>
                  <TouchableOpacity style={styles.Button} onPress={() => {
                    props.navigation.navigate({
                      routeName: 'ModifierInformationBarScreen',
                      params: {
                        label: "Nom du bar",
                        contenuBdd: bar.name,
                        consigne: ""
                      }
                    });
                  }}>
                    <SimpleLineIcons name="pencil" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.ContainerInformationToChange}>
              <Text style={styles.descriptionBar}>{bar.description}</Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button} onPress={() => {
                  props.navigation.navigate({
                    routeName: 'ModifierInformationBarScreen',
                    params: {
                      label: "Description du bar",
                      contenuBdd: bar.description,
                      consigne: ""
                    }
                  });
                }}>
                  <SimpleLineIcons name="pencil" size={20} />
                </TouchableOpacity>
                </View>
              </View>
              <View style={styles.ContainerInformationToChange}>
              <Text style={styles.policeStyle}>{bar.tags}</Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button} onPress={() => {
                  props.navigation.navigate({
                    routeName: 'ModifierInformationBarScreen',
                    params: {
                      label: "Tags de votre bar",
                      contenuBdd: bar.tags,
                      consigne: ""
                    }
                  });
                }}>
                  <SimpleLineIcons name="pencil" size={20} />
                </TouchableOpacity>
              </View>
              </View>
              <View style={styles.ContainerInformationToChange}>
              <Text style={styles.policeStyle}>{bar.phone}</Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button} onPress={() => {
                  props.navigation.navigate({
                    routeName: 'ModifierInformationBarScreen',
                    params: {
                      label: "Numéro de téléphone",
                      contenuBdd: bar.phone,
                      consigne: ""
                    }
                  });
                }}>
                  <SimpleLineIcons name="pencil" size={20} />
                </TouchableOpacity>
              </View>
              </View>
              <View style={styles.ContainerInformationToChange}>
              <Text style={styles.policeStyle}>{bar.address}</Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button} onPress={() => {
                  props.navigation.navigate({
                    routeName: 'ModifierInformationBarScreen',
                    params: {
                      label: "Adresse du bar",
                      contenuBdd: bar.address,
                      consigne: ""
                    }
                  });
                }}>
                  <SimpleLineIcons name="pencil" size={20} />
                </TouchableOpacity>
              </View>
              </View>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

function getBarFromManagerBarId(p_listeDesBars, p_managerBarId) {
  var barManager;
  for (let i = 0; i < Object.keys(p_listeDesBars).length; i++) {
    if (p_listeDesBars[i]._id.includes(p_managerBarId)) {
      barManager = p_listeDesBars[i];
      break;
    }
  }
  return (barManager);
}

BarManagerScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Gérer mon bar',
    headerLayoutPreset: 'center',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Create route"
        iconName="ios-menu"
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gainsboro,
  },
  ContainerInformationToChange: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: null,
  },
  btnText: {
    color: Colors.White,
    fontWeight: 'bold'
  },
  policeStyle: {
    fontSize: 18,
    marginTop: 10,
    color: Colors.Black,
  },
  ButtonText: {
    color: Colors.Black,
    fontSize: 20,
  },
  Button: {
    marginTop: 10,
    marginLeft: 30,
    marginHorizontal: '7%',
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Gold,
  },
  descriptionBar: {
    marginLeft: "10%",
    fontSize: 18,
    color: Colors.Black,
    textAlign : 'auto',
    textAlignVertical:'auto'
  },
  nameBar: {
    fontSize: 28,
    color: Colors.Black,
    fontWeight: 'bold'

  }
});

export default BarManagerScreen;
