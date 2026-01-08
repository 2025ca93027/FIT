import { Dimensions, Image, StyleSheet, Text, View,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import MyLogo from '../assets/images/logo.svg';
import  {images}  from '../constants/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Bold, Trophy,History } from 'lucide-react-native';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
const dashboard = () => {
  const navigation = useNavigation<NavProp>();    
  const {height, width} = Dimensions.get('window');
  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Top Vertical Section */}
      <View style={styles.topSection}>       
        <View style={styles.rowOneTopSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('History')}>
            <View style={styles.box2}>
               <History size={35} color="#2b2be2ff" strokeWidth={2.7}/>
              {/* <Text style={styles.text}>History</Text> */}
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FitnessGoals')}>
            <View style={styles.box2}>
              <Trophy size={35} color="#8A2BE2" strokeWidth={2.7} />
              {/* <Text style={styles.text}>History</Text> */}
            </View>

          </TouchableOpacity>
        </View>
         <View style={styles.rowTwoTopSection}>
           <MyLogo width={width * 0.4} height={height * 0.2} />
        </View>
      </View>

      {/* Bottom Vertical Section */}
      <View style={styles.bottomSection}>
        <View style={styles.row}>
          <View style={styles.box}>
            <View><Image source={images.run} width={5} height={5}/></View>
            <Text style={styles.subtextH}>Total Workouts</Text>
            <Text style={styles.subtext}>27565   -Steps</Text>
          </View>
          <View style={styles.box}>
            <View><Image source={images.burn} width={5} height={5}/></View>
            <Text style={styles.subtextH}>Calories Burned</Text>
            <Text style={styles.subtext}>560  -Kilo.Cal</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.box}>
            <View><Image source={images.active} width={5} height={5}/></View>
            <Text style={styles.subtextH}>Active Minutes</Text>
             <Text style={styles.subtext}>544  -Minutes</Text>
          </View>
          <View style={styles.box}>
            <View><Image source={images.streak} width={5} height={5}/></View>
             <Text style={styles.subtextH}>Current Streak</Text>
             <Text style={styles.subtext}>20  -Days</Text>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default dashboard

const styles = StyleSheet.create({

    container: {
    flex: 1,
    height:"auto",
    marginTop: '8%'
  },

  topSection: {
    flex: 1,
    backgroundColor: "#F5F5F5",
   /*  justifyContent: "center",
    alignItems: "center", */
  },

  bottomSection: {
    flex: 2,
    backgroundColor: "#F5F5F5",
    justifyContent:"center",
    alignContent:"center",
    
  },

  row: {
    flex: 1,
    flexDirection: "row",
    margin:"1%",
    // justifyContent:"center",
    alignItems:"center",
    height: 230,
   marginTop:20,
  },

  box: {
    flex: 1,
    backgroundColor: "#039148ff",
    justifyContent: "center",
    alignItems: "center",
    margin:"1%",
    borderRadius: 8,
    height:"100%",
    padding:"4%",
  },
  box2:{flex: 1,
    //backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 8,},

  text: {
    fontSize: 18,
    fontWeight: "bold",
    color:'#fff',
    paddingLeft:20,
    paddingRight:20,
    flexDirection:"row"
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
    textAlign:"center",
  },
   rowOneTopSection: {
    flex: 1, 
    flexDirection: "row",
    color:'red',
    marginHorizontal:5,
                 // 2/3 of topSection
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  rowTwoTopSection: {
    flex: 3,
    flexDirection: "row",               // 1/3 of topSection
    justifyContent: 'center',
    alignItems: 'center'
  },
})