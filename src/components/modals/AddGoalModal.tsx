import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { images } from '../../constants/images';
import { GoalTrackingMode } from '../../types';

interface AddGoalModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (goals: any[]) => void;
    initialValues?: Record<string, string>;
}

const AVAILABLE_GOALS = [
    { name: 'Steps', icon: images.run, unit: 'steps', mode: GoalTrackingMode.Distance, color: '#8A2BE2' },
    { name: 'Calories', icon: images.burn, unit: 'cal', mode: GoalTrackingMode.Calories, color: '#FF4500' },
    { name: 'Workouts', icon: images.active, unit: 'workouts', mode: GoalTrackingMode.Workouts, color: '#32CD32' },
    { name: 'Water', icon: images.streak, unit: 'glasses', mode: GoalTrackingMode.Manual, color: '#1E90FF' },
];

const AddGoalModal = ({ visible, onClose, onSave, initialValues }: AddGoalModalProps) => {
    const [targets, setTargets] = useState<Record<string, string>>({});

    React.useEffect(() => {
        if (visible && initialValues) {
            setTargets(initialValues);
        } else if (visible && !initialValues) {
            setTargets({});
        }
    }, [visible, initialValues]);

    const handleTargetChange = (name: string, value: string) => {
        setTargets(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const goalsToCreate = AVAILABLE_GOALS.filter(g => targets[g.name] && parseInt(targets[g.name], 10) > 0).map(g => ({
            name: g.name,
            targetValue: parseInt(targets[g.name], 10),
            unit: g.unit,
            trackingMode: g.mode,
            startDate: new Date().toISOString().split('T')[0],
            isPublic: true
        }));

        if (goalsToCreate.length === 0) {
            Alert.alert("No Goals Set", "Please set at least one goal target.");
            return;
        }

        onSave(goalsToCreate);
        resetAndClose();
    };

    const resetAndClose = () => {
        setTargets({});
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={resetAndClose}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.headerRow}>
                            <Text style={styles.modalTitle}>Set Daily Goals</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
                            {AVAILABLE_GOALS.map((goal, index) => (
                                <View key={index} style={styles.goalRow}>
                                    <View style={[styles.iconContainer, { backgroundColor: goal.color + '20' }]}>
                                        <Image source={goal.icon} style={[styles.icon, { tintColor: goal.color }]} resizeMode="contain" />
                                    </View>
                                    <View style={styles.goalInfo}>
                                        <Text style={styles.goalName}>{goal.name}</Text>
                                        <Text style={styles.goalUnit}>{goal.unit.charAt(0).toUpperCase() + goal.unit.slice(1)}</Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={targets[goal.name] || ''}
                                        onChangeText={(text) => handleTargetChange(goal.name, text)}
                                        keyboardType="numeric"
                                        placeholder={`0 ${goal.unit}`}
                                    />
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save Goals</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default AddGoalModal;

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: '80%' },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a' },
    closeText: { color: '#666', fontSize: 16, fontWeight: '600' },

    scrollContainer: { marginBottom: 20 },

    goalRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: '#F8F9FA', padding: 12, borderRadius: 12 },
    iconContainer: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    icon: { width: 20, height: 20 },
    goalInfo: { flex: 1 },
    goalName: { fontSize: 16, fontWeight: '600', color: '#333' },
    goalUnit: { fontSize: 13, color: '#555', marginTop: 2, fontWeight: '500' },

    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: 80,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },

    saveButton: { backgroundColor: '#0056D2', padding: 16, borderRadius: 12, alignItems: 'center' },
    saveButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
