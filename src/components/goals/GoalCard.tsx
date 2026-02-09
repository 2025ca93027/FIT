import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { images } from '../../constants/images';
import { ProcessedGoal } from '../../hooks/useFitnessData';

interface GoalCardProps {
    title: string;
    data: ProcessedGoal[];
    onSave: (updates: any) => void;
    isEditable?: boolean;
}

const GoalCard = ({ title, data, onSave, isEditable = true }: GoalCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState<Record<string, number>>({});

    const startEditing = () => {
        const initialValues: Record<string, number> = {};
        data.forEach(g => {
            initialValues[g.id] = g.target;
        });
        setEditValues(initialValues);
        setIsEditing(true);
    };

    const handleChange = (id: string, value: string) => {
        setEditValues((prev) => ({
            ...prev,
            [id]: Number(value) || 0
        }));
    };

    const handleSave = () => {
        onSave(editValues);
        setIsEditing(false);
    };

    const getGoalIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('step')) return { icon: images.run, color: '#8A2BE2' };
        if (lowerName.includes('cal')) return { icon: images.burn, color: '#FF4500' };
        if (lowerName.includes('water')) return { icon: images.streak, color: '#1E90FF' };
        if (lowerName.includes('workout')) return { icon: images.active, color: '#32CD32' };
        return { icon: images.active, color: '#555555' }; // Default
    };

    const renderGoalItem = (item: ProcessedGoal) => {
        const { icon, color } = getGoalIcon(item.name);
        return (
            <View style={styles.goalItem} key={item.id}>
                <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                    <Image source={icon} style={[styles.icon, { tintColor: color }]} resizeMode="contain" />
                </View>
                <View style={styles.goalInfo}>
                    <Text style={styles.goalLabel}>{item.name}</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.input}
                            value={String(editValues[item.id] ?? item.target)}
                            keyboardType="numeric"
                            onChangeText={(text) => handleChange(item.id, text)}
                        />
                    ) : (
                        <Text style={styles.goalValue}>{item.target.toLocaleString()} {item.unit}</Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
                {!isEditing && isEditable && (
                    <TouchableOpacity style={styles.editButton} onPress={startEditing}>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                )}
            </View>

            {data.map(renderGoalItem)}

            {isEditing && (
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default GoalCard;

const styles = StyleSheet.create({
    card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
    goalItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    iconContainer: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    icon: { width: 18, height: 18 },
    goalInfo: { flex: 1 },
    goalLabel: { fontSize: 12, color: '#888', marginBottom: 2 },
    goalValue: { fontSize: 15, fontWeight: '700', color: '#222' },
    input: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 6, fontSize: 14 },
    editButton: { backgroundColor: '#F0F0F0', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6 },
    editButtonText: { fontSize: 12, fontWeight: '600', color: '#555' },
    actionButtonsContainer: { flexDirection: 'row', marginTop: 10, gap: 10 },
    saveButton: { flex: 1, backgroundColor: '#0056D2', padding: 10, borderRadius: 8, alignItems: 'center' },
    saveButtonText: { color: '#FFF', fontWeight: '600' },
    cancelButton: { flex: 1, backgroundColor: '#EEE', padding: 10, borderRadius: 8, alignItems: 'center' },
    cancelButtonText: { color: '#333', fontWeight: '600' },
});
