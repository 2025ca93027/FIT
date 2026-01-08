import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useFitnessData, TabType } from '../hooks/useFitnessData';
import GoalCard from './goals/GoalCard';
import ProgressCard from './goals/ProgressCard';
import ChartsSection from './goals/ChartsSection';
import StatsFooter from './goals/StatsFooter';

const FitnessGoals = () => {
    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>('Daily');
    const { loading, frequencyData, saveGoal, isFallback } = useFitnessData();

    const currentData = frequencyData[activeTab];

    const handleSave = async (updates: any) => {
        // Iterate and save each goal
        const promises = Object.entries(updates).map(async ([key, value]: any) => {
            await saveGoal(activeTab, key, value.target, value.unit);
        });
        await Promise.all(promises);
    };

    if (loading || !currentData) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#0056D2" />
            </View>
        );
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.title}>Fitness Goals</Text>
                {isFallback && (
                    <View style={{ backgroundColor: '#FFEDD5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: '#F97316' }}>
                        <Text style={{ color: '#C2410C', fontSize: 10, fontWeight: '700' }}>OFFLINE MODE</Text>
                    </View>
                )}
            </View>
            <Text style={styles.subtitle}>Set and track your daily, weekly, and monthly fitness goals</Text>
            <View style={styles.tabsContainer}>
                {(['Daily', 'Weekly', 'Monthly'] as TabType[]).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {renderHeader()}
            <View style={styles.row}>
                <View style={[styles.halfColumn, { width: width > 500 ? '48%' : '100%' }]}>
                    <GoalCard
                        title={`${activeTab} Goals`}
                        data={currentData.goals}
                        onSave={handleSave}
                        isEditable={activeTab === 'Daily'}
                    />
                </View>
                <View style={[styles.halfColumn, { width: width > 500 ? '48%' : '100%' }]}>
                    <ProgressCard
                        title={activeTab === 'Daily' ? "Today's Progress" : `${activeTab} Progress`}
                        data={currentData.goals}
                    />
                </View>
            </View>

            <ChartsSection
                data={currentData.chartData}
                titleSuffix={activeTab}
            />

            <StatsFooter averages={currentData.averages} />
        </ScrollView>
    );
};

export default FitnessGoals;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F7' },
    center: { justifyContent: 'center', alignItems: 'center' },
    contentContainer: { padding: 20, paddingBottom: 50 },
    header: { marginBottom: 20 },
    title: { fontSize: 28, fontWeight: '800', color: '#1A1A1A', marginBottom: 5 },
    subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },

    tabsContainer: { flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 25, padding: 4, alignSelf: 'flex-start' },
    tab: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
    activeTab: { backgroundColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
    tabText: { color: '#666', fontWeight: '600' },
    activeTabText: { color: '#0056D2', fontWeight: '700' },

    row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    halfColumn: { marginBottom: 20 },
});
