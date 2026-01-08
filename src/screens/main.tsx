import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../components/dashboard';
import Historylog from '../components/historylog';

const Stack=createNativeStackNavigator();
const main = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen name='Home' component={main}/> */}
        <Stack.Screen name='Dashboard' component={Dashboard}/>
        <Stack.Screen name='History' component={Historylog}/>  
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default main

const styles = StyleSheet.create({})