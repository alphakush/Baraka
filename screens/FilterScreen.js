import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Switch,
  TouchableOpacity
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constant/Colors';
import FilterSwitch from '../components/FilterSwitch';
import * as BarsActions from '../store/actions/BarsActions';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


const FilterScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isDistance, setIsDistance] = useState(false);

  const [sliderOneChanging, setSliderOneChanging] = useState(false);
  const [sliderOneValue, setSliderOneValue] = useState([3]);
  const [distanceSliderValue, setdistanceSliderValue] = useState([2, 50]);
  const [priceSliderValue, setpriceSliderValue] = useState([0, 30]);
  const [noteSliderValue, setnoteSliderValue] = useState([0, 5]);
  const sliderOneValuesChange = values => setSliderOneValue(values);
  const distanceSliderValuesChange = values => setdistanceSliderValue(values);
  const noteSliderValuesChange = values => setnoteSliderValue(values);
  const priceSliderValuesChange = values => setpriceSliderValue(values);
  const [
    nonCollidingMultiSliderValue,
    setNonCollidingMultiSliderValue,
  ] = useState([0, 100]);
  const nonCollidingMultiSliderValuesChange = values => setNonCollidingMultiSliderValue(values);

  const [isPromote, setIsPromote] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHappyhourOn, setIsHappyhourOn] = useState(false);

  const username = useSelector(state => state.auth.username);
  const email = useSelector(state => state.auth.email);
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      Date: isPromote,
    };
    dispatch(BarsActions.setFilters(appliedFilters));

  }, [isPromote, dispatch]);

  resetfilters = () => {
    setIsPromote(false)
    setIsOpen(false)
    setIsHappyhourOn(false)
    setdistanceSliderValue([2, 50])
    setpriceSliderValue([0, 30])
    setnoteSliderValue([0,5])
    Alert.alert("Baraka", "Réinitialisation des filtres OK");
   }

   const Filtrer = () => {
     Alert.alert("Baraka", "Filtres sauvegardés");
   };

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

    return (
      <View style={styles.container}>
      <View style={styles.sliders}>
        <View style={styles.sliderOne}>
          <Text style={styles.text}>Note moyenne : entre {noteSliderValue[0]} <Image style={styles.icon} source={require('../images/rated.png')}/> et {noteSliderValue[1]} <Image style={styles.icon} source={require('../images/rated.png')}/></Text>
        </View>
        <MultiSlider
          values={[noteSliderValue[0], noteSliderValue[1]]}
          sliderLength={280}
          onValuesChange={noteSliderValuesChange}
          min={0}
          max={5}
          step={1}
          allowOverlap
          snapped
        />
        <View style={styles.sliderTwo}>
          <Text style={styles.text}>Distance : entre {distanceSliderValue[0]} km et {distanceSliderValue[1]} km</Text>
        </View>
        <MultiSlider
          values={[distanceSliderValue[0], distanceSliderValue[1]]}
          sliderLength={280}
          onValuesChange={distanceSliderValuesChange}
          min={0}
          max={100}
          step={1}
          allowOverlap
          snapped
        />
        <View style={styles.sliderThree}>
          <Text style={styles.text}>Prix moyen : entre {priceSliderValue[0]}€ et {priceSliderValue[1]}€</Text>
        </View>
        <MultiSlider
          values={[priceSliderValue[0], priceSliderValue[1]]}
          sliderLength={280}
          onValuesChange={priceSliderValuesChange}
          min={0}
          max={30}
          step={1}
          allowOverlap
          snapped
        />
        <View style={styles.sliderFour}>
          <Text style={styles.textavantanges}>Divers</Text>
        </View>
      </View>
      <View style={styles.Switch}>
      <FilterSwitch
          label='Uniquement avec promotions '
          state={isPromote}
          onChange={newvalue => setIsPromote(newvalue)} />
      <FilterSwitch
          label='Ouvert actuellement '
          state={isOpen}
          onChange={newvalue => setIsOpen(newvalue)} />
      <FilterSwitch
          label='Happy-hour actif '
          state={isHappyhourOn}
          onChange={newvalue => setIsHappyhourOn(newvalue)} />
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.Button} onPress={() => Filtrer()}>
          <Text style={styles.ButtonText}>Filtrer</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
};

FilterScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filtres ',
        headerLayoutPreset: 'center',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Réinitialiser"
                    onPress={() => {this.resetfilters()}}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
  header:{
    backgroundColor: Colors.Gold,
    height:150,
  },
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
  Button: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Gold,
  },
  ButtonText: {
    color: Colors.Black,
    fontSize: 20,
  },
  filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width : '80%',
      marginVertical: 15
  },
  Switch: {
    paddingTop:10,
    alignItems: 'center',
    fontSize: 20,
    },
  sliders: {
    paddingTop:30,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf : 'center',
    alignContent:'center',
    },
  switchtext: {
      fontSize: 90,
    },
  text: {
      alignSelf: 'center',
      fontSize: 20,
      alignContent:'center',
      alignItems: 'center',
    },
    textavantanges: {
      fontSize: 30,
    },
    title: {
      fontSize: 30,
    },
    sliderOne: {
      paddingTop:20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf : 'center',
      alignContent:'center',
    },
    sliderTwo: {
      paddingTop:40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf : 'center',
      alignContent:'center',

    },
    sliderThree: {
      paddingTop:40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf : 'center',
    },
    sliderFour: {
      paddingTop:40,
      flexDirection: 'row',
    },

  title: {
      fontFamily: 'open-sans-bold',
      fontSize: 22,
      margin: 20,
      textAlign: 'center'
  },
  name:{
    fontSize:22,
    color:Colors.White,
    fontWeight:'600',
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
  icon: {
    width: 18,
    height: 18,
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

export default FilterScreen;
