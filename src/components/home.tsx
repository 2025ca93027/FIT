import { StyleSheet, Text, View ,Image, Dimensions} from 'react-native';
import React from 'react';
import  {images}  from '../constants/images';
import MyLogo from '../assets/images/logo.svg';
import { SvgUri } from 'react-native-svg';
const home = () => {
  const {height, width} = Dimensions.get('window'); //Entire screen size 
  return (
    
   <View >
     <View style={styles.container}>
      
      {/* <Image source={images.logo} style={styles.logo} alt='No Images !!'/> */}
      {/* <MyLogo height={height} width={width}/> */}
         <MyLogo width={width * 1.0} height={height * 0.5} />

    </View>
    <View>
      <Image source={images.banner} width={width*1.0} height={height*1.0} />
    </View>
   {/*  <View>
      <View style={styles.box}> <Text>1</Text></View>
      <View style={styles.box}> <Text>2</Text></View>
      <View style={styles.box}> <Text>3</Text></View>
      <View style={styles.box}> <Text>4</Text></View>
          
    </View> */}
   
   </View>
    
  );
 
}

export default home

const styles = StyleSheet.create({
    container: {
    padding: 0,
    justifyContent:'center',
    alignItems:'center',
    
  },
  // You must provide explicit width and height styles for images to render correctly
  logo: {
    width: '100%', 
    height: '100%',
    backgroundColor:'#000',
  },
  box:{
    justifyContent:'center',
    alignItems:'center',
    width:'40%',
    height:'25%',
    borderBlockColor:'#35036aff',
    borderWidth:1,
  }
})