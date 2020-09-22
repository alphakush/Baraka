import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    RefreshControl,

} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';

import * as BarsActions from '../store/actions/BarsActions';
import { ScrollView } from 'react-native-gesture-handler';

import HeaderButton from '../components/HeaderButton';
import UserRow from '../components/UserRow';
import Colors from '../constant/Colors';

const ListOfAllUsers = props => {

    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.bars.allusers);

    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    
    const loadAllUsers = async () => {
        setIsLoading(true);
        dispatch(BarsActions.getAllUsersAdmin());
        setIsLoading(false);
    }
    
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        loadAllUsers();
        setRefreshing(false);
      }, [refreshing]);

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

    // Pour ajouter un spinner en attendant que la page se charge
    if (isLoading) {
        return <View style={styles.actvityloadStyle}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    const _renderItem = itemData => {
        return (
            <ScrollView>
                <UserRow
                    image={itemData.item.image}
                    username={itemData.item.username}
                    email={itemData.item.email}
                    accessLevel={itemData.item.accessLevel}
                />
            </ScrollView>
        );
    };


    return (
        <View >
            <FlatList
                data={allUsers}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item._id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
            />
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
