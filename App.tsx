/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/home';
import FitnessGoals from './src/components/FitnessGoals';
import Dashboard from './src/components/dashboard';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="FitnessGoals" component={FitnessGoals} options={{ title: 'Fitness Goals' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
