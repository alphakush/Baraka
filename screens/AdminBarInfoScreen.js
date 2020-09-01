import React, { useState, useEffect, useCallback , ActivityIndicator} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Image,
  FlatList,
  ScrollView,
  Keyboard
} from 'react-native';
import Colors from '../constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as BarsActions from '../store/actions/BarsActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AdminBarInfoScreen = props => {
  const barPicturesUrls = props.navigation.getParam('barPicturesUrls');
  const barTags = props.navigation.getParam('barTags');
  const barproducts = props.navigation.getParam('barproducts');
  const barDescription = props.navigation.getParam('barDescription');
  const barName = props.navigation.getParam('barName');
  const barAddress = props.navigation.getParam('barAddress');
  const barPhone = props.navigation.getParam('barPhone');
  const barManager = props.navigation.getParam('barManager');
  const barID = props.navigation.getParam('barID');
  const barlatitude = props.navigation.getParam('barlatitude');
  const barlongitude = props.navigation.getParam('barlongitude');
  const baropenhours = props.navigation.getParam('baropenhours');
  const barendhours = props.navigation.getParam('barendhours');
  const barstatut = props.navigation.getParam('barstatut');

  const [barstatutrefused, setbarstatutrefused] = useState(false);
  const errormsg = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    statut()
}, []);
  const statut = () => {
    if (barstatut == '1'){
      setbarstatutrefused(true)
    } else{
      setbarstatutrefused(false)
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const validateHandler = async () => {
    var data = JSON.stringify({"barName":barName});
    dispatch(BarsActions.validebaradmin(data)).then(() =>{
      {errormsg ? Alert.alert("Baraka",errormsg) : null }
      })
  };
  const refuserHandler = () => {
    if (barstatut == '1'){return;}
    var data = JSON.stringify({"barID":barID,"newStatut":1});
    dispatch(BarsActions.modifystatutbaradmin(data)).then(() =>{
      {errormsg ? Alert.alert("Baraka",errormsg) : null }
      })
  };

  return (
    <ScrollView>
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
      extraScrollHeight={100}
    >
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); }} >
      <View style={styles.container}>
        <View style={{ marginHorizontal: 30 }}>
          <Image resizeMode='contain' style={styles.image} source={{ uri: `data:image/png;base64,${barPicturesUrls}` }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.nameBar}>{barName}</Text>
            <Text style={styles.descriptionBar}>{barTags}</Text>
            <Text style={styles.descriptionBar}>{barproducts}</Text>
            <Text style={styles.descriptionBar}>{barDescription}</Text>
            <Text style={styles.descriptionBar}>{barAddress}</Text>
            <Text style={styles.descriptionBar}>{barPhone}</Text>
            <Text style={styles.descriptionBar}>{barManager}</Text>
            <View style={styles.socialBarButton}>
              <Image style={styles.icon} source={require('../images/clock.png')}/>
              <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>Horaires : {baropenhours}h - {barendhours}h</Text>
            </View>
          </View>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.Button} onPress={() => {
              props.navigation.navigate({
                routeName: 'BarRoute',
                params: {
                  barlatitude: { barlatitude },
                  barlongitude: { barlongitude },
                  barname: { barName }
                }
              });
            }}>
            <Text style={styles.ButtonText}>Voir sur la map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Buttonvalidate} onPress={validateHandler}>
            <Text style={styles.ButtonTextvalidate}>Valider le bar</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.Buttonrefuser} onPress={refuserHandler}>
              <Text style={styles.ButtonTextrefuser}>Refuser le bar</Text>
            </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    </ScrollView>
  );
};

AdminBarInfoScreen.navigationOptions = navData => {
  const getBarName = navData.navigation.getParam('barName');
  return {
    headerTitle: `Validation du bar ${getBarName}`,
    headerLayoutPreset: 'center',
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft : 40,
    width: 100,
    borderBottomRightRadius : 15,
    borderTopRightRadius : 15,
    backgroundColor: 'transparent',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  socialBarlabel: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  nameBar: {
    fontSize: 28,
    color: Colors.Black,
    fontWeight: 'bold'
  },
  descriptionBar: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: Colors.Black,
  },
  aligntext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonContainer: {
    marginHorizontal: 30
  },
  ButtonText: {
    color: Colors.Black,
    fontSize: 20,
  },
  ButtonTextvalidate: {
    color: Colors.White,
    fontSize: 20,
  },
  ButtonTextrefuser: {
    color: Colors.White,
    fontSize: 20,
  },
  Button: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Gold,
  },
  Buttonvalidate: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Green,
  },
  Buttonrefuser: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Red,
  },
  image: {
    height: 100,
    width: null,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default AdminBarInfoScreen;
