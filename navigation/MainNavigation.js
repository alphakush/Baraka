import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, SafeAreaView, Button, View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../store/actions/AuthAction';

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
import BarManagerScreen from '../screens/BarManagerScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import tryLocalSigninScreen from '../screens/TryLocalSigninScreen';
import BarRouteScreen from '../screens/BarRoute';
import ModifierInformationBarScreen from '../screens/ModifierInformationBarScreen';
import PromotionScreen from '../screens/PromotionScreen';
import FilterScreen from '../screens/FilterScreen';
import FormulaireBarScreen from '../screens/FormulaireCreationBarScreen';
import AdministrationBarScreen from '../screens/AdministrationBarScreen';
import AdminBarInfoScreen from '../screens/AdminBarInfoScreen';
import BarManagerScreen from '../screens/BarManagerScreen';

import Colors from '../constant/Colors';

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
        },
        BarRoute: {
          screen: BarRouteScreen
        },
        FilterScreen :{
          screen: FilterScreen,
        },
        ModifierInformationBarScreen: {
            screen: ModifierInformationBarScreen
        },
        BarManagerScreen: {
            screen: BarManagerScreen
        }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Accueil ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="home"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);

const BarInfoNavigator = createStackNavigator(
    {
        BarInfo: {
          screen: BarInfoScreen
        },
        BarRoute: {
          screen: BarRouteScreen
        }
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
            drawerLabel: 'Me connecter   ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="login"
                    size={20}
                    color={drawerConfig.tintColor}
                />
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
            drawerLabel: 'Créer mon compte    ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="user-follow"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);

const FormulaireBarNavigator = createStackNavigator(
    {
        FormulaireBar: {
            screen: FormulaireBarScreen
        },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Creation de bar    ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="plus"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);
const AdministrationBarScreenNavigator = createStackNavigator(
    {
        AdministrationBar: {
            screen: AdministrationBarScreen
        },
        AdminBarInfo: {
            screen: AdminBarInfoScreen
        },
        BarRoute: {
          screen: BarRouteScreen
        }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Administration des bars    ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="shield"
                    size={20}
                    color={drawerConfig.tintColor}
                />
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
            drawerLabel: 'Me déconnecter  ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="logout"
                    size={20}
                    color={drawerConfig.tintColor}
                />
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
            drawerLabel: 'Filtrer ',
            drawerIcon: drawerConfig =>
                <AntDesign
                    name="filter"
                    size={20}
                    color={drawerConfig.tintColor}
                />
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
            drawerLabel: 'Me géolocaliser ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="globe"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);
const BarRouteNavigator = createStackNavigator(
    {
        BarRoute: BarRouteScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Itinéraire',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="globe"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);


const TryLocalSignNavigator = createStackNavigator(
    {
        TryLocal: tryLocalSigninScreen,
    },
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
            drawerLabel: 'Trouver un bar ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="magnifier"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);

const FavoriteNavigator = createStackNavigator(
    {
        Favorite: {
            screen : FavoritesScreen
        },
        BarInfo: {
            screen: BarInfoScreen
        }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Mes Favoris ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="heart"
                    size={20}
                    color={drawerConfig.tintColor}
                />
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
            drawerLabel: 'Mon compte   ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="user"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);

const MyFilterScreenNavigator = createStackNavigator(
    {
        MyFilterScreen: FilterScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Filtres  ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="user"
                    size={20}

                />
        }
    }
);

const PromotionNavigator = createStackNavigator(
    {
        Logout: {
            screen: PromotionScreen
        },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Mes Promotions  ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="present"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);
const BarManagerNavigator = createStackNavigator(
    {
        BarManager: BarManagerScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Gérer mon bar',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="settings"
                    size={20}
                    color={drawerConfig.tintColor}
                />
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
            drawerLabel: 'Nous contacter  ',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="note"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);

const BarManagerNavigation = createStackNavigator(
    {
        BarManager: BarManagerScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        navigationOptions: {
            drawerLabel: 'Gérer mon bar',
            drawerIcon: drawerConfig =>
                <SimpleLineIcons
                    name="settings"
                    size={20}
                    color={drawerConfig.tintColor}
                />
        }
    }
);

export const DrawerWithLogoutButton = props => {
    const dispatch = useDispatch();
    return(
    <ScrollView contentContainerStyle={{ flex: 1, paddingTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props} />
        </SafeAreaView>
        <TouchableOpacity onPress={() => {
            dispatch(AuthActions.SignOut())
            props.navigation.navigate('loginFlow');
            }}>
            <View style={styles.item}>
                <View style={styles.iconContainer}>
                    <SimpleLineIcons
                        name="logout"
                        size={20}
                        style={styles.icon}
                    />
                </View>
                <Text style={styles.label}>Me déconnecter  </Text>
            </View>
        </TouchableOpacity>
    </ScrollView>
    )};

const switchNavigator = createSwitchNavigator({
    localSign: createSwitchNavigator({
        localSign: TryLocalSignNavigator
    }),
    loginFlow: createDrawerNavigator(
        {
            Home: FeedNavigator,
            Login: LoginNavigator,
            CreateAccount: CreateAccountNavigator,
            Filters: FiltersNavigator,
            Geolocate: GeolocateNavigator,
        }, {
        drawerWidth: 220,
    }),
    mainFlow: createDrawerNavigator(
        {
            Home: FeedNavigator,
            Myaccount: MyAccountNavigator,
            Favorite: FavoriteNavigator,
            Findbar: FindBarNavigator,
            Geolocate: GeolocateNavigator,
            Contact: ContactNavigator,
            Promotions: PromotionNavigator,
            FormulaireBar: FormulaireBarNavigator,
            AdministrationBar: AdministrationBarScreenNavigator,
            BarManagerScreen: BarManagerNavigator
        }, {
        contentOptions: {
            activeTintColor: Colors.primary,
        },
        drawerWidth: 220,
        contentComponent: DrawerWithLogoutButton
    }),
    barManagerMainFlow: createDrawerNavigator(
        {
            Home: FeedNavigator,
            Myaccount: MyAccountNavigator,
            Favorite: FavoriteNavigator,
            Findbar: FindBarNavigator,
            Geolocate: GeolocateNavigator,
            Contact: ContactNavigator,
            Promotions: PromotionNavigator,
            BarManager: BarManagerNavigation
        }, {
        contentOptions: {
            activeTintColor: Colors.primary,
        },
        drawerWidth: 220,
        contentComponent: DrawerWithLogoutButton
    })
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 20
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        margin: 16,
        fontWeight: 'bold',
        color: Colors.Black,
    },
    iconContainer: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,

    }
});

export default createAppContainer(switchNavigator);
