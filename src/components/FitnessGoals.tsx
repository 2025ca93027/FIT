import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useFitnessData, TabType } from '../hooks/useFitnessData';
import { GOAL_TEMPLATES, GoalTemplate } from '../constants/goalTemplates';
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
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [initialModalValues, setInitialModalValues] = useState<Record<string, string> | undefined>(undefined);

    const currentData = frequencyData[activeTab];

    const handleSave = async (updates: any) => {
        await updateGoals(updates);
    };

    const handleAddGoal = async (goalsData: any[]) => {
        await addGoals(goalsData);
    };

    const openModalWithTemplate = (template: GoalTemplate) => {
        setInitialModalValues({ [template.name]: template.targetValue.toString() });
        setIsAddGoalVisible(true);
        setShowRecommendations(false);
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
            </View>
            <Text style={styles.subtitle}>Set and track your daily, weekly, and monthly fitness goals</Text>

            <View style={{ zIndex: 10 }}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        setInitialModalValues(undefined);
                        setIsAddGoalVisible(true);
                    }}
                >
                    <Text style={styles.addButtonText}>+ New Goal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.dropdownTrigger}
                    onPress={() => setShowRecommendations(!showRecommendations)}
                >
                    <Text style={styles.dropdownText}>
                        {showRecommendations ? 'Hide Recommendations' : 'Show Recommended Goals'}
                    </Text>
                </TouchableOpacity>

                {showRecommendations && (
                    <View style={styles.dropdownContent}>
                        {GOAL_TEMPLATES.map((template) => (
                            <TouchableOpacity
                                key={template.id}
                                style={[styles.dropdownItem, template.isRecommended && styles.recommendedItem]}
                                onPress={() => openModalWithTemplate(template)}
                            >
                                <View>
                                    <Text style={styles.templateName}>
                                        {template.name} {template.isRecommended && <Text style={styles.recommendedBadge}>★</Text>}
                                    </Text>
                                    <Text style={styles.templateDesc}>{template.description}</Text>
                                </View>
                                <Text style={styles.templateValue}>{template.targetValue} {template.unit}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

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
                initialValues={initialModalValues}
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

    addButton: { backgroundColor: '#0056D2', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, alignSelf: 'flex-start', marginBottom: 10 },
    addButtonText: { color: '#FFF', fontWeight: '700', fontSize: 14 },

    dropdownTrigger: { marginBottom: 15, paddingLeft: 5 },
    dropdownText: { color: '#0056D2', fontWeight: '600', fontSize: 13 },
    dropdownContent: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 5,
        marginTop: 5,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    recommendedItem: { backgroundColor: '#F0F9FF' },
    templateName: { fontWeight: '600', color: '#333', fontSize: 14 },
    templateDesc: { color: '#666', fontSize: 11, marginTop: 2 },
    templateValue: { fontWeight: '700', color: '#0056D2', fontSize: 14 },
    recommendedBadge: { color: '#F59E0B', fontSize: 14 },
});
