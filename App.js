import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers,applyMiddleware  } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import barsReducer from './store/reducers/BarsReducer';
import AuthReducer from './store/reducers/AuthReducer';
import MainNavigator from './navigation/MainNavigation';

import { YellowBox } from 'react-native'

import { Updates } from 'expo';


YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])


enableScreens();
const rootReducer = combineReducers({
  bars: barsReducer,
  auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk) );

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store} >
      <MainNavigator />
    </Provider>

  );
}
