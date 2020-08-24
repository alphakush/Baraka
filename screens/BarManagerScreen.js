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
          <View style={styles.informationsCard}>
            <View>
              <View style={styles.containerSeparator}>
                <View style={styles.containerLeftPart}>
                  <View style={styles.dataName}>
                    <Text style={{ marginLeft: 10, fontSize: 18, color: "#808080" }}>
                      Nom du bar
                    </Text>
                  </View>
                  <View style={styles.containCircleContent}>
                    <View style={styles.circle}>
                      <SimpleLineIcons style={styles.iconsInCircle} name="user" size={20} />
                    </View>
                    <Text style={styles.nameBar}>{bar.name}</Text>
                  </View>
                </View>
                <View style={styles.ButtonContainer}>
                  <TouchableOpacity style={styles.Button} onPress={() => {
                    props.navigation.navigate({
                      routeName: 'ModifierInformationBar',
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
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 20
              }}
            />
          </View>
          <View style={styles.informationsCard}>
            <View style={styles.ContainerInformationToChange}>
              <View style={styles.containerSeparator}>
                <View style={styles.containerLeftPart}>
                  <View style={styles.dataName}>
                    <Text style={{ marginLeft: 10, fontSize: 18, color: "#808080" }}>
                      Description
                    </Text>
                  </View>
                  <View style={styles.containCircleContent}>
                    <View style={styles.circle}>
                      <SimpleLineIcons style={styles.iconsInCircle} name="options" size={20} />
                    </View>
                    <Text style={styles.textFromBdd}>{bar.description}</Text>
                  </View>
                </View>
                <View style={styles.ButtonContainer}>
                  <TouchableOpacity style={styles.Button} onPress={() => {
                    props.navigation.navigate({
                      routeName: 'ModifierInformationBar',
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
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 20
              }}
            />
          </View>
          <View style={styles.informationsCard}>
            <View style={styles.ContainerInformationToChange}>
              <View style={styles.containerSeparator}>
                <View style={styles.containerLeftPart}>
                  <View style={styles.dataName}>
                    <Text style={{ marginLeft: 10, fontSize: 18, color: "#808080" }}>
                      Tags
                    </Text>
                  </View>
                  <View style={styles.containCircleContent}>
                    <View style={styles.circle}>
                      <SimpleLineIcons style={styles.iconsInCircle} name="tag" size={20} />
                    </View>
                    <Text style={styles.textFromBdd}>{bar.tags}</Text>
                  </View>
                </View>
                <View style={styles.ButtonContainer}>
                  <TouchableOpacity style={styles.Button} onPress={() => {
                    props.navigation.navigate({
                      routeName: 'ModifierInformationBar',
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
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 20
              }}
            />
          </View>
          <View style={styles.informationsCard}>
            <View style={styles.ContainerInformationToChange}>
              <View style={styles.containerSeparator}>
                <View style={styles.containerLeftPart}>
                  <View style={styles.dataName}>
                    <Text style={{ marginLeft: 10, fontSize: 18, color: "#808080" }}>
                      Numéro de téléphone
                    </Text>
                  </View>
                  <View style={styles.containCircleContent}>
                    <View style={styles.circle}>
                      <SimpleLineIcons style={styles.iconsInCircle} name="phone" size={20} />
                    </View>
                    <Text style={styles.textFromBdd}>{bar.phone}</Text>
                  </View>
                </View>
                <View style={styles.ButtonContainer}>
                  <TouchableOpacity style={styles.Button} onPress={() => {
                    props.navigation.navigate({
                      routeName: 'ModifierInformationBar',
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
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  marginTop: 20
                }}
              />
            </View>
          </View>
          <View style={styles.informationsCard}>
            <View style={styles.ContainerInformationToChange}>
              <View style={styles.containerSeparator}>
                <View style={styles.containerLeftPart}>
                  <View style={styles.dataName}>
                    <Text style={{ marginLeft: 10, fontSize: 18, color: "#808080" }}>
                      Adresse
                    </Text>
                  </View>
                  <View style={styles.containCircleContent}>
                    <View style={styles.circle}>
                      <SimpleLineIcons style={styles.iconsInCircle} name="map" size={20} />
                    </View>
                    <Text style={styles.textFromBdd}>{bar.address}</Text>
                  </View>
                </View>
                <View style={styles.ButtonContainer}>
                  <TouchableOpacity style={styles.Button} onPress={() => {
                    props.navigation.navigate({
                      routeName: 'ModifierInformationBar',
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
  console.log(p_listeDesBars);
  console.log(p_managerBarId);
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
  },
  informationsCard: {
  },
  ContainerInformationToChange: {
    flexDirection: 'column',
    marginTop: 30,
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
  ButtonText: {
    color: Colors.Black,
    fontSize: 20,
  },
  Button: {
    marginTop: 50,
    marginLeft: 20,
    marginHorizontal: '7%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.Gold,
  },
  textFromBdd: {
    alignSelf: "center",
    maxWidth: '80%',
    fontSize: 18,
    color: Colors.Black,
  },
  nameBar: {
    alignSelf : 'center',
    fontSize: 28,
    color: Colors.Black,
    fontWeight: 'bold'

  },
  circle: {
    flexDirection: "row",
    justifyContent: "center",
    width: 45,
    height: 45,
    borderRadius: 100 / 2,
    backgroundColor: '#e4e5ea',
    marginRight: 15
  },
  iconsInCircle: {
    alignSelf: "center",
  },
  containCircleContent: {
    marginLeft:5,
    marginTop: 10,
    flexDirection: "row",
  },
  dataName: {
    height: 30,
  },
  containerLeftPart: {
    width: "80%"
  },
  containerSeparator: {
    flexDirection: "row"
  }
});

export default BarManagerScreen;
