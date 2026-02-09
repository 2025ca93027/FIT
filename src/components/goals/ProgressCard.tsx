import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { images } from '../../constants/images';
import { ProcessedGoal } from '../../hooks/useFitnessData';

interface ProgressCardProps {
    title: string;
    data: ProcessedGoal[];
}

const ProgressCard = ({ title, data }: ProgressCardProps) => {
    const getGoalDetails = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('step')) return { color: '#8A2BE2', icon: images.run };
        if (lowerName.includes('cal')) return { color: '#FF4500', icon: images.burn };
        if (lowerName.includes('workout')) return { color: '#32CD32', icon: images.active };
        if (lowerName.includes('water')) return { color: '#1E90FF', icon: images.streak };
        return { color: '#555555', icon: images.active }; // Default
    };

    const renderProgressBar = (item: ProcessedGoal) => {
        const { color, icon } = getGoalDetails(item.name);
        const progress = item.target > 0 ? Math.min(item.current / item.target, 1) : 0;
        const percentage = Math.round(progress * 100);

        return (
            <View style={styles.progressItem} key={item.id}>
                <View style={styles.progressBarContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icon} style={{ width: 14, height: 14, tintColor: color, marginRight: 6 }} resizeMode="contain" />
                            <Text style={{ color: '#555', fontSize: 12 }}>
                                {item.name} {(item.current >= item.target && item.target > 0) ? "🎉" : ""}
                            </Text>
                        </View>
                        <Text style={{ color: '#555', fontSize: 12 }}>{item.current.toLocaleString()} / {item.target.toLocaleString()} {item.unit}</Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
                    </View>
                    <Text style={{ alignSelf: 'flex-end', fontSize: 10, color: '#999', marginTop: 2 }}>{percentage}%</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>

            {data.map(renderProgressBar)}
        </View>
    );
};

export default ProgressCard;

const styles = StyleSheet.create({
    card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
    progressItem: { marginBottom: 12 },
    progressBarContainer: {},
    progressBarBackground: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, width: '100%' },
    progressBarFill: { height: 6, borderRadius: 3 },
});
