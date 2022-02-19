/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigator } from 'navigators/AppNavigator';
import { Provider } from 'react-redux';
import store from 'store';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
          <FlashMessage position="top" />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
