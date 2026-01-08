import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyLogo from '../assets/images/logo.svg';

const mylogo = () => {
    const {height, width} = Dimensions.get('window');
  return (
    <View>
      <MyLogo width={width * 1.0} height={height * 0.5} />
    </View>
  )
}

export default mylogo

const styles = StyleSheet.create({})