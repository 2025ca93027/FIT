import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { images } from '../../constants/images';

interface ProgressCardProps {
    title: string;
    data: any;
}

const ProgressCard = ({ title, data }: ProgressCardProps) => {
    const renderProgressBar = (label: string, item: any, color: string, icon: any) => {
        const progress = item.target > 0 ? Math.min(item.current / item.target, 1) : 0;
        const percentage = Math.round(progress * 100);

        return (
            <View style={styles.progressItem} key={label}>
                <View style={styles.progressBarContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icon} style={{ width: 14, height: 14, tintColor: color, marginRight: 6 }} resizeMode="contain" />
                            <Text style={{ color: '#555', fontSize: 12 }}>
                                {label} {(item.current >= item.target && item.target > 0) ? "🎉" : ""}
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

            {renderProgressBar('Steps', data.steps, '#8A2BE2', images.run)}
            {renderProgressBar('Calories', data.calories, '#FF4500', images.burn)}
            {renderProgressBar('Workouts', data.workouts, '#32CD32', images.active)}
            {renderProgressBar('Water', data.water, '#1E90FF', images.streak)}
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
