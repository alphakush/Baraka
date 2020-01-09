import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import * as BarsActions from '../store/actions/BarsActions';
import HeaderButton from '../components/HeaderButton';
import BarsList from '../components/BarsList';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';
import * as AuthActions from '../store/actions/AuthAction';

const FeedScreen = props => {
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const allbars = useSelector(state => state.bars.allbars);
    const errorMessage = useSelector(state => state.bars.errorMessage);
    const userlatitude = useSelector(state => state.auth.userlatitude);
    const userlongitude = useSelector(state => state.auth.userlongitude);

    const TrackUser = async () => {
        try {
            await requestPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                distanceInterval: 10
            }, (location) =>{
                dispatch(AuthActions.GetUserLocation(location.coords.latitude, location.coords.longitude));
            });
        } catch (e) {
            setErr(e);
        }
    }

    useEffect(() => {
        TrackUser();
    }, []);

    //Pour récupérer les favoris de l'utilisateur
    const loadFavorites = async () => {
        await dispatch(BarsActions.getFavoriteBar());
    }

    const loadAllBars = async () => {
        setIsLoading(true);
        await dispatch(BarsActions.getAllBar());
        setIsLoading(false);
        loadFavorites();
    }

    // Pour récupérer tous les bars
    useEffect(() => {
        loadAllBars();
    }, [dispatch]);

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadAllBars);
        return () => {
            willFocusSub.remove();
        }
    },[loadAllBars]);

    //Pour charger les favoris de l'utilsateur

    //Pour ajouter un spinner en attendant que la page se charge
    if (isLoading) {
        return <View style={styles.actvityloadStyle}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return (
        <View style={styles.container}>
            <BarsList data={allbars} navigation={props.navigation} />
            {err ? <Text>Merci d'activer la localisation </Text> : null}
        </View>
    );
};

FeedScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Accueil ',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
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

export default FeedScreen;
