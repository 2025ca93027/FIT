import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import MyLogo from '../assets/images/logo.svg';
import { images } from '../constants/images';

const Dashboard = () => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top Vertical Section */}
        <View style={[styles.topSection, { height: height * 0.55 }]}>
          <MyLogo width={width * 1.0} height={height * 0.5} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FitnessGoals')}
          >
            <Text style={styles.buttonText}>My Fitness Goals</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Vertical Section */}
        <View style={[styles.bottomSection, { height: height * 0.6 }]}>
          <View style={styles.row}>
            <View style={styles.box}>
              <View><Image source={images.run} width={5} height={5} /></View>
              <Text style={styles.subtextH}>Total Workouts</Text>
              <View><Text style={styles.subtext}>27565   -Steps</Text></View>
            </View>
            <View style={styles.box}>
              <View><Image source={images.burn} width={5} height={5} /></View>
              <Text style={styles.subtextH}>Calories Burned</Text>
              <View><Text style={styles.subtext}>560  -Kilo.Cal</Text></View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.box}>
              <View><Image source={images.active} width={5} height={5} /></View>
              <Text style={styles.subtextH}>Active Minutes</Text>
              <View><Text style={styles.subtext}>544  -Minutes</Text></View>
            </View>
            <View style={styles.box}>
              <View><Image source={images.streak} width={5} height={5} /></View>
              <Text style={styles.subtextH}>Current Streak</Text>
              <View><Text style={styles.subtext}>20  -Days</Text></View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },

  topSection: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: '#039148ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomSection: {
    // Removed flex: 2
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
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#ffff",
    paddingLeft: 2,
  },
  subtextH: {
    fontSize: 20,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#ffff",
    paddingLeft: 5,
    paddingTop: 5,
  },
})