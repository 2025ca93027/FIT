import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import Dashboard from '../components/dashboard';
import Historylog from '../components/historylog';
import FitnessGoals from '../components/FitnessGoals';

/* import FitnessGoals from '../components/FitnessGoals';
import Workout from '../components/workout';
import Sleep from '../components/sleep';
import GymWorkout, {  } from "../screens/gymWorkout";
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerTitleStyle: 
          {color:'#039148ff',fontWeight:'bold',fontSize:24, },}} />
        <Stack.Screen name="History" component={Historylog} options={{ headerTitleStyle: 
          {color:'#039148ff',fontWeight:'bold',fontSize:24, },}}/>
        <Stack.Screen name="FitnessGoals" component={FitnessGoals} options={{ headerTitleStyle: 
          {color:'#039148ff',fontWeight:'bold',fontSize:24, },}}/>
       {/*  <Stack.Screen name="StepsCounter" component={StepsScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Sleep" component={SleepScreen} />
        <Stack.Screen name="GymWorkOut" component={GymWorkoutScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
