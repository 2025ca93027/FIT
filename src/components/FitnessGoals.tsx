import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { images } from '../constants/images';
import { FITNESS_DATA } from '../constants/apiResponse';
import { Svg, Path, Circle, Line, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

type TabType = 'Daily' | 'Weekly' | 'Monthly';

const FitnessGoals = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Daily');
    const [isEditing, setIsEditing] = useState(false);

    // Initialize with Daily data
    // Access with type safety since we know 'Daily' exists
    const [goals, setGoals] = useState(FITNESS_DATA['Daily'].goals);
    const [tempGoals, setTempGoals] = useState(FITNESS_DATA['Daily'].goals);

    // Whenever activeTab changes, switch data
    useEffect(() => {
        // activeTab is strongly typed now, so this access is safe
        const newData = FITNESS_DATA[activeTab].goals;
        setGoals(newData);
        setTempGoals(newData);
        setIsEditing(false); // Exit edit mode on tab switch
    }, [activeTab]);

    // Sync tempGoals when isEditing changes
    useEffect(() => {
        if (isEditing) {
            setTempGoals(goals);
        }
    }, [isEditing]);

    const handleGoalChange = (key: string, value: string) => {
        setTempGoals((prev: any) => ({
            ...prev,
            [key]: {
                ...prev[key],
                target: Number(value) || 0
            }
        }));
    };

    const handleSave = () => {
        setGoals(tempGoals);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.title}>Fitness Goals</Text>
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

    const renderGoalItem = (icon: any, label: string, key: string, color: string) => {
        const goalData = isEditing ? (tempGoals as any)[key] : (goals as any)[key];
        if (!goalData) return null;

        return (
            <View style={styles.goalItem}>
                <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                    <Image source={icon} style={[styles.icon, { tintColor: color }]} resizeMode="contain" />
                </View>
                <View style={styles.goalInfo}>
                    <Text style={styles.goalLabel}>{label}</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.input}
                            value={String(goalData.target)}
                            keyboardType="numeric"
                            onChangeText={(text) => handleGoalChange(key, text)}
                        />
                    ) : (
                        <Text style={styles.goalValue}>{goalData.target.toLocaleString()} {goalData.unit}</Text>
                    )}
                </View>
            </View>
        );
    };

    const renderSetGoals = () => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                    {activeTab === 'Monthly' ? 'Set Monthly Goals' : activeTab === 'Weekly' ? 'Set Weekly Goals' : 'Set Daily Goals'}
                </Text>
                {!isEditing && (
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                        <Text style={styles.editButtonText}>Edit Goals</Text>
                    </TouchableOpacity>
                )}
            </View>
            {renderGoalItem(images.run, activeTab === 'Monthly' ? 'Steps per month' : 'Steps per day', 'steps', '#8A2BE2')}
            {renderGoalItem(images.burn, activeTab === 'Monthly' ? 'Calories burned per month' : 'Calories burned per day', 'calories', '#FF4500')}
            {renderGoalItem(images.active, activeTab === 'Monthly' ? 'Workouts per month' : 'Workouts per day', 'workouts', '#32CD32')}
            {renderGoalItem(images.streak, activeTab === 'Monthly' ? 'Water glasses per month' : 'Water glasses per day', 'water', '#1E90FF')}

            {isEditing && (
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Goals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    const renderProgressBar = (label: string, key: string, color: string, icon: any) => {
        const goalData = (goals as any)[key];
        if (!goalData) return null;

        const current = goalData.current;
        const target = goalData.target;
        const unit = goalData.unit;

        const progress = target > 0 ? Math.min(current / target, 1) : 0;
        const percentage = Math.round(progress * 100);

        return (
            <View style={styles.progressItem}>
                <View style={styles.progressBarContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icon} style={{ width: 15, height: 15, tintColor: color, marginRight: 5 }} resizeMode="contain" />
                            <Text style={{ color: '#555', fontSize: 12 }}>{label}</Text>
                        </View>
                        <Text style={{ color: '#555', fontSize: 12 }}>{current.toLocaleString()} / {target.toLocaleString()} {unit}</Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
                    </View>
                    <Text style={{ alignSelf: 'flex-end', fontSize: 10, color: '#999', marginTop: 2 }}>{percentage}% complete</Text>
                </View>
            </View>
        );
    };

    const renderTodaysProgress = () => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                    {activeTab === 'Monthly' ? "This Month's Progress" : "Today's Progress"}
                </Text>
            </View>

            {renderProgressBar('Steps', 'steps', '#8A2BE2', images.run)}
            {renderProgressBar('Calories', 'calories', '#FF4500', images.burn)}
            {renderProgressBar('Workouts', 'workouts', '#32CD32', images.active)}
            {renderProgressBar('Water', 'water', '#1E90FF', images.streak)}
        </View>
    );

    const LineChart = ({ data, color, title, subtitle }: { data: any[], color: string, title: string, subtitle?: string }) => {
        const chartHeight = 150;
        const chartWidth = width - 60;
        if (!data || data.length === 0) return null;

        const maxVal = Math.max(...data.map((d: any) => d.value)) * 1.2 || 1;
        const points = data.map((d: any, i: number) => {
            const x = (i / (data.length - 1)) * chartWidth;
            const y = chartHeight - (d.value / maxVal) * chartHeight;
            return `${x},${y}`;
        }).join(' ');

        return (
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>{title}</Text>
                <Svg height={chartHeight + 30} width={chartWidth}>
                    {/* Grid lines */}
                    <Line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#eee" strokeWidth="1" />
                    <Line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#eee" strokeWidth="1" />
                    <Line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#eee" strokeWidth="1" />

                    {/* Polyline */}
                    <Path d={`M ${points}`} fill="none" stroke={color} strokeWidth="2" />

                    {/* Dots */}
                    {data.map((d: any, i: number) => {
                        const x = (i / (data.length - 1)) * chartWidth;
                        const y = chartHeight - (d.value / maxVal) * chartHeight;
                        return <Circle key={i} cx={x} cy={y} r="3" fill={color} />;
                    })}

                    {/* X Axis Labels */}
                    {data.map((d: any, i: number) => {
                        const x = (i / (data.length - 1)) * chartWidth;
                        return (
                            <SvgText
                                key={i}
                                x={x}
                                y={chartHeight + 20}
                                fill="#999"
                                fontSize="10"
                                textAnchor="middle"
                            >
                                {d.day}
                            </SvgText>
                        );
                    })}
                </Svg>
            </View>
        );
    };

    const WorkoutsHydrationChart = ({ data }: { data: any[] }) => {
        const chartHeight = 150;
        const chartWidth = width - 60;
        if (!data || data.length === 0) return null;

        const maxWater = Math.max(...data.map(d => d.water)) * 1.2 || 1;
        const maxWorkouts = Math.max(...data.map(d => d.workouts)) * 1.5 || 1;
        const combinedMax = Math.max(maxWater, maxWorkouts);

        const getPoints = (key: string) => data.map((d: any, i: number) => {
            const x = (i / (data.length - 1)) * chartWidth;
            const y = chartHeight - (d[key] / combinedMax) * chartHeight;
            return `${x},${y}`;
        }).join(' ');

        const waterPoints = getPoints('water');
        const workoutsPoints = getPoints('workouts');

        return (
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Workouts & Hydration</Text>
                <Svg height={chartHeight + 30} width={chartWidth}>
                    {/* Grid lines */}
                    <Line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#eee" strokeWidth="1" />
                    <Line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#eee" strokeWidth="1" />
                    <Line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#eee" strokeWidth="1" />

                    {/* Water Line (Blue) */}
                    <Path d={`M ${waterPoints}`} fill="none" stroke="#1E90FF" strokeWidth="2" />
                    {data.map((d: any, i: number) => {
                        const x = (i / (data.length - 1)) * chartWidth;
                        const y = chartHeight - (d.water / combinedMax) * chartHeight;
                        return <Circle key={`water-${i}`} cx={x} cy={y} r="3" fill="#1E90FF" />;
                    })}

                    {/* Workouts Line (Green) */}
                    <Path d={`M ${workoutsPoints}`} fill="none" stroke="#32CD32" strokeWidth="2" />
                    {data.map((d: any, i: number) => {
                        const x = (i / (data.length - 1)) * chartWidth;
                        const y = chartHeight - (d.workouts / combinedMax) * chartHeight;
                        return <Circle key={`workouts-${i}`} cx={x} cy={y} r="3" fill="#32CD32" />;
                    })}

                    {/* X Axis Labels */}
                    {data.map((d: any, i: number) => {
                        const x = (i / (data.length - 1)) * chartWidth;
                        return (
                            <SvgText
                                key={i}
                                x={x}
                                y={chartHeight + 20}
                                fill="#999"
                                fontSize="10"
                                textAnchor="middle"
                            >
                                {d.day}
                            </SvgText>
                        );
                    })}

                </Svg>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#1E90FF', marginRight: 5 }} />
                        <Text style={{ fontSize: 10, color: '#1E90FF' }}>Water</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#32CD32', marginRight: 5 }} />
                        <Text style={{ fontSize: 10, color: '#32CD32' }}>Workouts</Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderProgressOverTime = () => {
        const chartData = FITNESS_DATA[activeTab].chartData;
        return (
            <View style={[styles.card, { marginTop: 20 }]}>
                <Text style={styles.cardTitle}>Progress Over Time</Text>
                <LineChart data={chartData.steps} color="#8A2BE2" title="Daily Steps Progress" />
                <LineChart data={chartData.calories} color="#FF4500" title="Daily Calories Burned" />
                <WorkoutsHydrationChart data={chartData.hydrationWorkouts} />
            </View>
        );
    };

    const renderFooterStats = () => {
        const averages = FITNESS_DATA[activeTab].averages;
        return (
            <View style={styles.footerStats}>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#8A2BE2' }]}>{averages.steps.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Avg Steps/Day</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#FF4500' }]}>{averages.calories.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Avg Calories/Day</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#32CD32' }]}>{averages.workouts}</Text>
                    <Text style={styles.statLabel}>Total Workouts</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#1E90FF' }]}>{averages.water}</Text>
                    <Text style={styles.statLabel}>Total Water Glasses</Text>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {renderHeader()}
            <View style={styles.row}>
                <View style={styles.halfColumn}>
                    {renderSetGoals()}
                </View>
                <View style={styles.halfColumn}>
                    {renderTodaysProgress()}
                </View>
            </View>
            {renderProgressOverTime()}
            {renderFooterStats()}
        </ScrollView>
    );
};

export default FitnessGoals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
    },
    contentContainer: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    tabsContainer: {
        flexDirection: 'row',
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#FFF',
        marginRight: 10,
    },
    activeTab: {
        backgroundColor: '#0056D2', // Blue shade
    },
    tabText: {
        color: '#666',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#FFF',
    },
    row: {
        flexDirection: 'row', // On small screens this might need to be column
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    halfColumn: {
        width: width > 500 ? '48%' : '100%', // Responsive check
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        backgroundColor: '#0056D2',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    goalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        width: 20,
        height: 20,
    },
    goalInfo: {
        flex: 1,
    },
    goalLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    goalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#000',
        backgroundColor: '#F9F9F9',
        width: '100%',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#0056D2', // Blue
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 10,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#E0E0E0', // Grey
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
    },
    progressPercentage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    totalProgressBarBg: {
        height: 10,
        backgroundColor: '#EEE',
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    totalProgressBarFill: {
        height: 10,
        borderRadius: 5,
    },
    progressItem: {
        marginBottom: 15,
    },
    progressBarContainer: {
        marginBottom: 5,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        width: '100%',
    },
    progressBarFill: {
        height: 8,
        borderRadius: 4,
    },
    chartContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    chartTitle: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        color: '#666',
    },
    footerStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 10,
        color: '#999',
    },
});
