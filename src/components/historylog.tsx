import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native'
import React from 'react'
import { History, Clock, Flame, Calendar, Trash2, } from "lucide-react-native"
const historylog = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <History size={20} color="#000" />
          <Text style={styles.title}>Workout History</Text>
        </View>
        <Text style={styles.subtitle}>2 workouts logged</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Workout Item */}
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Walking</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.info}>
                <Clock size={16} color="#666" />
                <Text style={styles.infoText}>60 min</Text>
              </View>

              <View style={styles.info}>
                <Flame size={16} color="orange" />
                <Text style={styles.infoText}>100 cal</Text>
              </View>

              <View style={styles.info}>
                <Calendar size={16} color="#666" />
                <Text style={styles.infoText}>Jan 07</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <Trash2 size={18} color="red" />
          </TouchableOpacity>
        </View>

        {/* Second Item */}
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Cycling</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.info}>
                <Clock size={16} color="#666" />
                <Text style={styles.infoText}>42 min</Text>
              </View>

              <View style={styles.info}>
                <Flame size={16} color="orange" />
                <Text style={styles.infoText}>100 cal</Text>
              </View>

              <View style={styles.info}>
                <Calendar size={16} color="#666" />
                <Text style={styles.infoText}>Jan 06</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <Trash2 size={18} color="red" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default historylog

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#b2b5bbff",
    paddingBottom: 12,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontFamily:"sans-serif",
    fontWeight:"bold",
  },
  subtitle: {
    fontSize: 18,    
    color: "#6b7280",
    marginTop: 4,
  },
  content: {
    maxHeight: 400,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  itemLeft: {
    flex: 1,
  },
  badge: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 18,
    fontFamily:"sans-serif",
    fontWeight:"bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 16,
    fontFamily:"sans-serif",
    fontWeight:"bold",
  },
})