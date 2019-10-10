import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import FiltersScreen from '../screens/FiltersScreen';
import GeolocatedScreen from '../screens/GeolocatedScreen';
import FeedScreen from '../screens/FeedScreen';
import Colors from '../constant/Colors'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans',
        textAlign: 'center',
    },
    headerBackTitleStyle:  {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const LoginNavigator = createStackNavigator(
    {
        Login: LoginScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: "Se connecter"
        }
    }
);

const FeedNavigator = createStackNavigator(
    {
        Feed: FeedScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: "Accueil"
        }
    }
);

const CreateAccountNavigator = createStackNavigator(
    {
        CreateAccount: CreateAccountScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: "Créer un compte"
        }
    }
);

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: "Filtrer"
        }
    }
);

const GeolocateNavigator = createStackNavigator(
    {
        Geolocate: GeolocatedScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: "Me géolocaliser"
        }
    }
);


const MainNavigator = createDrawerNavigator({
    Home: FeedNavigator,
    Login: LoginNavigator,
    CreateAccount: CreateAccountNavigator,
    Filters: FiltersNavigator,
    Geolocate: GeolocateNavigator

},
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    })

export default createAppContainer(MainNavigator);