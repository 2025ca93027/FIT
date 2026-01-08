import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface StatsFooterProps {
    averages: any;
}

const StatsFooter = ({ averages }: StatsFooterProps) => {
    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsHeader}>Key Metrics (Avg / Day)</Text>
            <View style={styles.statsGrid}>
                <View style={[styles.statBox, { borderLeftColor: '#8A2BE2' }]}>
                    <Text style={styles.statBoxValue}>{averages.steps.toLocaleString()} <Text style={styles.unit}>steps</Text></Text>
                    <Text style={styles.statBoxLabel}>Steps</Text>
                </View>
                <View style={[styles.statBox, { borderLeftColor: '#FF4500' }]}>
                    <Text style={styles.statBoxValue}>{averages.calories.toLocaleString()} <Text style={styles.unit}>kcal</Text></Text>
                    <Text style={styles.statBoxLabel}>Calories</Text>
                </View>
                <View style={[styles.statBox, { borderLeftColor: '#32CD32' }]}>
                    <Text style={styles.statBoxValue}>{averages.workouts}</Text>
                    <Text style={styles.statBoxLabel}>Workouts</Text>
                </View>
                <View style={[styles.statBox, { borderLeftColor: '#1E90FF' }]}>
                    <Text style={styles.statBoxValue}>{averages.water} <Text style={styles.unit}>gls</Text></Text>
                    <Text style={styles.statBoxLabel}>Water</Text>
                </View>
            </View>
        </View>
    );
};

export default StatsFooter;

const styles = StyleSheet.create({
    statsContainer: { marginTop: 20 },
    statsHeader: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    statBox: {
        width: '48%',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        borderLeftWidth: 4,
        shadowColor: '#000', shadowOpacity: 0.03, elevation: 1
    },
    statBoxValue: { fontSize: 18, fontWeight: '800', color: '#222', marginBottom: 4 },
    statBoxLabel: { fontSize: 12, color: '#888' },
    unit: { fontSize: 14, color: '#666', fontWeight: '600' }
});
