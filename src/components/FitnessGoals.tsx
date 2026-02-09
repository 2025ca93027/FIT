import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useFitnessData, TabType } from '../hooks/useFitnessData';
import GoalCard from './goals/GoalCard';
import ProgressCard from './goals/ProgressCard';
import ChartsSection from './goals/ChartsSection';
import StatsFooter from './goals/StatsFooter';
import AddGoalModal from './modals/AddGoalModal';

const FitnessGoals = () => {
    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>('Daily');
    const { loading, frequencyData, updateGoals, addGoal, addGoals, isFallback } = useFitnessData();
    const [isAddGoalVisible, setIsAddGoalVisible] = useState(false);

    const currentData = frequencyData[activeTab];

    const handleSave = async (updates: any) => {
        await updateGoals(updates);
    };

    const handleAddGoal = async (goalsData: any[]) => {
        await addGoals(goalsData);
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

            <TouchableOpacity style={styles.addButton} onPress={() => setIsAddGoalVisible(true)}>
                <Text style={styles.addButtonText}>+ New Goal</Text>
            </TouchableOpacity>

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

            <AddGoalModal
                visible={isAddGoalVisible}
                onClose={() => setIsAddGoalVisible(false)}
                onSave={handleAddGoal}
            />
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
    subtitle: { fontSize: 14, color: '#666', marginBottom: 15 },

    tabsContainer: { flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 25, padding: 4, alignSelf: 'flex-start' },
    tab: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
    activeTab: { backgroundColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
    tabText: { color: '#666', fontWeight: '600' },
    activeTabText: { color: '#0056D2', fontWeight: '700' },

    row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    halfColumn: { marginBottom: 20 },

    addButton: { backgroundColor: '#0056D2', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, alignSelf: 'flex-start', marginBottom: 15 },
    addButtonText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
});
