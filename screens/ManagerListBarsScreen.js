import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

import HeaderButton from '../components/HeaderButton';
import ManagerListBars from '../components/ManagerListBars';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';

import * as AuthActions from '../store/actions/AuthAction';
import * as BarsActions from '../store/actions/BarsActions';

const ManagerListBarsScreen = props => {
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const mybar = useSelector(state => state.bars.allbars);
    const errorMessage = useSelector(state => state.bars.errorMessage);
    const managerBarId = useSelector(state => state.auth.managerBarId);
    const loadmyBar = async () => {
        setIsLoading(true);
        // On vérifie qu'on n'a pas activé de filtre
        await dispatch(BarsActions.getmybarmanager(managerBarId));
        setIsLoading(false);
    }

    // Pour récupérer mon bar
    useEffect(() => {
        loadmyBar();
    }, [dispatch]);

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadmyBar);
        return () => {
            willFocusSub.remove();
        }
    },[loadmyBar]);

    //Pour ajouter un spinner en attendant que la page se charge
    if (isLoading) {
        return <View style={styles.actvityloadStyle}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return (
        <View style={styles.container}>
            <ManagerListBars data={mybar} navigation={props.navigation} />
            {err ? <Text>Merci d'activer la localisation </Text> : null}
        </View>
    );
};

ManagerListBarsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Liste de mes bars ',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1, paddingTop: 20
    },
    actvityloadStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default ManagerListBarsScreen;
