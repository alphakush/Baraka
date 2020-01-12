import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as BarsActions from '../store/actions/BarsActions';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import FilterSwitch from '../components/FilterSwitch';
import Colors from '../constant/Colors';

const FiltersScreen = props => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isDistance, setIsDistance] = useState(false);
  const [isDate, setIsDate] = useState(false);

    const saveFilters = useCallback(() => {
      const appliedFilters = {
        Like: isLike,
        Distance: isDistance,
        Date: isDate,
      };
      dispatch(BarsActions.setFilters(appliedFilters));

    }, [isLike, isDistance, isDate, dispatch]);

    useEffect(() => {
      navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title} >Filtrer par</Text>
            <FilterSwitch
                label="NOMBRE DE J'AIME"
                state={isLike}
                onChange={newvalue1 => setIsLike(newvalue1)}
            />
            <FilterSwitch
                label='DISTANCE'
                state={isDistance}
                onChange={newvalue => setIsDistance(newvalue)}
            />
            <FilterSwitch
                label='DATE (plus récent)'
                state={isDate}
                onChange={newvalue => setIsDate(newvalue)} />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filtrer ',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
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
                    onPress={ navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    }
});

export default FiltersScreen;
