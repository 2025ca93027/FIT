/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View ,Text} from 'react-native';
import Home from './src/components/home';
import Logo from './src/components/mylogo';
import Dashbaord from './src/components/dashboard';
const App = () => {
  
  return (
    <View style={{flex:1, backgroundColor:'rgba(195, 195, 205, 0.14)'}}>
    <Dashbaord/> 
    
    </View>
  );
}
  export default App;
  const styles = StyleSheet.create({})
