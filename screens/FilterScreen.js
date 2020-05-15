import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Switch,
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
  const [sliderOneValue, setSliderOneValue] = useState([5]);
  const [distanceSliderValue, setdistanceSliderValue] = useState([0, 100]);
  const [priceSliderValue, setpriceSliderValue] = useState([0, 30]);
  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
  const sliderOneValuesChange = values => setSliderOneValue(values);
  const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);
  const distanceSliderValuesChange = values => setdistanceSliderValue(values);
  const priceSliderValuesChange = values => setpriceSliderValue(values);
  const [
    nonCollidingMultiSliderValue,
    setNonCollidingMultiSliderValue,
  ] = useState([0, 100]);
  const nonCollidingMultiSliderValuesChange = values => setNonCollidingMultiSliderValue(values);

  const [isPromote, setIsPromote] = useState(false);

  const username = useSelector(state => state.auth.username);
  const email = useSelector(state => state.auth.email);
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      Date: isPromote,
    };
    dispatch(BarsActions.setFilters(appliedFilters));

  }, [isPromote, dispatch]);

  resetfilters = () => {
    Alert.alert("Baraka", "Réinitialisation des filtres OK");
   }

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

    return (
      <View style={styles.container}>
      <View style={styles.sliders}>
        <View style={styles.sliderOne}>
          <Text style={styles.text}>Note moyenne :   </Text>
          <Text style={[styles.text, sliderOneChanging]}>
            {sliderOneValue}
          </Text>
        </View>
        <MultiSlider
          values={sliderOneValue}
          sliderLength={280}
          min={0}
          max={5}
          onValuesChangeStart={sliderOneValuesChangeStart}
          onValuesChange={sliderOneValuesChange}
          onValuesChangeFinish={sliderOneValuesChangeFinish}
        />
        <View style={styles.sliderTwo}>
          <Text style={styles.text}>Distance :  entre {distanceSliderValue[0]} km et {distanceSliderValue[1]} km</Text>
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
          <Text style={styles.text}>Prix moyen :  entre {priceSliderValue[0]}€ et {priceSliderValue[1]}€</Text>
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
          <Text style={styles.textavantanges}>Avantanges</Text>
        </View>
      </View>
      <FilterSwitch
          label='Uniquement avec promotions '
          state={isPromote}
          onChange={newvalue => setIsPromote(newvalue)} />
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
  filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width : '80%',
      marginVertical: 15
  },
  sliders: {
    paddingTop:30,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf : 'center',
    alignContent:'center',
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
      justifyContent: 'flex-start',
      alignSelf : 'flex-start',
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
