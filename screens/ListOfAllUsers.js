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
import UserItem from '../components/UserItem';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';

import * as AuthActions from '../store/actions/AuthAction';
import * as BarsActions from '../store/actions/BarsActions';

const ListOfAllUsers = props => {
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const allUsers = useSelector(state => state.bars.allusers);
    const errorMessage = useSelector(state => state.bars.errorMessage);

    const userlatitude = useSelector(state => state.auth.userlatitude);
    const userlongitude = useSelector(state => state.auth.userlongitude);

    const loadAllUsers = async () => {
        setIsLoading(true);
        await dispatch(BarsActions.getAllUsersAdmin());
        setIsLoading(false);
    }

    // Pour récupérer tous les utilisateurs
    useEffect(() => {
        loadAllUsers();
    }, [dispatch]);

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadAllUsers);
        return () => {
            willFocusSub.remove();
        }
    },[loadAllUsers]);

    //Pour ajouter un spinner en attendant que la page se charge
    if (isLoading) {
        return <View style={styles.actvityloadStyle}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return (
        <View style={styles.container}>
            <UserItem data={allUsers}/>
            {err ? <Text>Merci d'activer la localisation </Text> : null}
        </View>
    );
};

ListOfAllUsers.navigationOptions = navData => {
    return {
        headerTitle: 'Liste des utilisateurs',
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

export default ListOfAllUsers;
