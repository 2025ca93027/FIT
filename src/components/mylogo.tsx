import { Dimensions, View } from 'react-native'
import React from 'react'
import MyLogoSvg from '../assets/images/logo.svg';

const MyLogo = () => {
  const { height, width } = Dimensions.get('window');
  return (
    <View>
      <MyLogoSvg width={width * 1.0} height={height * 0.5} />
    </View>
  )
}

export default MyLogo
