import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import FiltersScreen from '../screens/FiltersScreen';
import GeolocatedScreen from '../screens/GeolocatedScreen';
import FeedScreen from '../screens/FeedScreen';
import BarInfoScreen from '../screens/BarInformationScreen';
import FindBarScreen from '../screens/FindBarsScreen';
import ContactScreen from '../screens/ContactScreen';
import TryLocalSigninScreen from '../screens/TryLocalSigninScreen';

import Colors from '../constant/Colors'
import FavoritesScreen from '../screens/FavoritesScreen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans',
        textAlign: 'center',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const FeedNavigator = createStackNavigator(
    {
        Feed: {
            screen: FeedScreen
        },
        BarInfo: {
            screen: BarInfoScreen
        }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Accueil '
        }
    }
);

const BarInfoNavigator = createStackNavigator(
    {
        BarInfo: BarInfoScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const LoginNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Me connecter   '
        }
    }
);

const CreateAccountNavigator = createStackNavigator(
    {
        CreateAccount: {
            screen: CreateAccountScreen
        },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Créer mon compte    '
        }
    }
);

const LogoutNavigator = createStackNavigator(
    {
        Logout: {
            screen: LogoutScreen
        },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Me déconnecter  '
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
            drawerLabel: 'Filtrer '
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
            drawerLabel: 'Me géolocaliser '
        }
    }
);

const FindBarNavigator = createStackNavigator(
    {
        FindBar: {
            screen: FindBarScreen
        },
        BarInfo: {
            screen: BarInfoScreen
        }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Trouver un bar '
        }
    }
);

const FavoriteNavigator = createStackNavigator(
    {
        Favorite: FavoritesScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Mes Favoris '
        }
    }
);

const MyAccountNavigator = createStackNavigator(
    {
        Myaccount: MyAccountScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Mon compte   '
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: ContactScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Nous contacter  '
        }
    }
);

const LocalSignNavigator = createStackNavigator(
    {
        LocalSign: TryLocalSigninScreen,
    }
);

const switchNavigator = createSwitchNavigator({
    
    loginFlow: createDrawerNavigator({
        Home: FeedNavigator,
        Login: LoginNavigator,
        CreateAccount: CreateAccountNavigator,
        Filters: FiltersNavigator,
        Geolocate: GeolocateNavigator,
    }),
    mainFlow: createDrawerNavigator({
        Home: FeedNavigator,
        Myaccount: MyAccountNavigator,
        Favorite: FavoriteNavigator,
        Findbar: FindBarNavigator,
        Contact: ContactNavigator,
        Logout: LogoutNavigator
    })
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(switchNavigator);
