import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyLogo from '../assets/images/logo.svg';
import  {images}  from '../constants/images';

const dashboard = () => {
    const {height, width} = Dimensions.get('window');
  return (
    <View style={styles.container}>
      {/* Top Vertical Section */}
      <View style={styles.topSection}>
        
        <MyLogo width={width * 1.0} height={height * 0.5} />
      </View>

      {/* Bottom Vertical Section */}
      <View style={styles.bottomSection}>
        <View style={styles.row}>
          <View style={styles.box}>
            <View><Image source={images.run} width={5} height={5}/></View>
            <Text style={styles.subtextH}>Total Workouts</Text>
            <View > <Text style={styles.subtext}>27565   -Steps</Text></View>
          </View>
          <View style={styles.box}>
            <View><Image source={images.burn} width={5} height={5}/></View>
            <Text style={styles.subtextH}>Calories Burned</Text>
            <View> <Text style={styles.subtext}>560  -Kilo.Cal</Text></View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.box}>
            <View><Image source={images.active} width={5} height={5}/></View>
            <Text style={styles.subtextH}>Active Minutes</Text>
            <View> <Text style={styles.subtext}>544  -Minutes</Text></View>
          </View>
          <View style={styles.box}>
            <View><Image source={images.streak} width={5} height={5}/></View>
             <Text style={styles.subtextH}>Current Streak</Text>
            <View> <Text style={styles.subtext}>20  -Days</Text></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default dashboard

const styles = StyleSheet.create({

    container: {
    flex: 1,
  },

  topSection: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomSection: {
    flex: 2,
    backgroundColor: "#F5F5F5",
  },

  row: {
    flex: 1,
    flexDirection: "row",
  },

  box: {
    flex: 1,
    backgroundColor: "#039148ff",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 8,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 16,
    fontFamily:"sans-serif",
    fontWeight:"bold",
    color:"#ffff",
    paddingLeft:2,
  },
  subtextH: {
    fontSize: 20,
    fontFamily:"sans-serif",
    fontWeight:"bold",
    color:"#ffff",
    paddingLeft:5,
    paddingTop:5,
  },
})