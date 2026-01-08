import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';

interface ChartsSectionProps {
    data: any;
    titleSuffix: string;
}


const LineChart = ({ chartData, color, title, width }: { chartData: any[], color: string, title: string, width: number }) => {
    if (!chartData || chartData.length === 0) return null;
    const chartHeight = 120;
    const chartWidth = width - 80;
    const maxVal = Math.max(...chartData.map((d: any) => d.value)) * 1.1 || 10;

    const points = chartData.map((d: any, i: number) => {
        const x = (i / (chartData.length - 1)) * chartWidth;
        const y = chartHeight - (d.value / maxVal) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    return (
        <View style={styles.chartWrapper}>
            <Text style={styles.miniChartTitle}>{title}</Text>
            <Svg height={chartHeight + 20} width={chartWidth}>
                <Line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#EEE" strokeWidth="1" />
                <Path d={`M ${points}`} fill="none" stroke={color} strokeWidth="2.5" />
                {chartData.map((d: any, i: number) => (
                    <Circle key={i} cx={(i / (chartData.length - 1)) * chartWidth} cy={chartHeight - (d.value / maxVal) * chartHeight} r="3" fill={color} />
                ))}
                {chartData.map((d: any, i: number) => (
                    <SvgText key={i} x={(i / (chartData.length - 1)) * chartWidth} y={chartHeight + 15} fill="#AAA" fontSize="9" textAnchor="middle">{d.day}</SvgText>
                ))}
            </Svg>
        </View>
    );
};

const WorkoutsHydrationChart = ({ chartData, width }: { chartData: any[], width: number }) => {
    if (!chartData || chartData.length === 0) return null;
    const chartHeight = 120;
    const chartWidth = width - 80;
    const maxVal = Math.max(...chartData.map(d => Math.max(d.water, d.workouts))) * 1.2 || 10;

    const getPath = (key: string) => chartData.map((d: any, i: number) => {
        const x = (i / (chartData.length - 1)) * chartWidth;
        const y = chartHeight - (d[key] / maxVal) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    return (
        <View style={styles.chartWrapper}>
            <Text style={styles.miniChartTitle}>Hydration vs Workouts</Text>
            <Svg height={chartHeight + 20} width={chartWidth}>
                <Line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#EEE" strokeWidth="1" />
                <Path d={`M ${getPath('water')}`} fill="none" stroke="#1E90FF" strokeWidth="2" strokeDasharray="4,4" />
                <Path d={`M ${getPath('workouts')}`} fill="none" stroke="#32CD32" strokeWidth="2" />
                {chartData.map((d: any, i: number) => (
                    <SvgText key={i} x={(i / (chartData.length - 1)) * chartWidth} y={chartHeight + 15} fill="#AAA" fontSize="9" textAnchor="middle">{d.day}</SvgText>
                ))}
            </Svg>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ color: '#1E90FF', fontSize: 10, marginRight: 10 }}> Water</Text>
                <Text style={{ color: '#32CD32', fontSize: 10 }}> Workouts</Text>
            </View>
        </View>
    );
};

const ChartsSection = ({ data, titleSuffix }: ChartsSectionProps) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.card, { marginTop: 20 }]}>
            <Text style={styles.cardTitle}>Progress Over Time ({titleSuffix})</Text>
            <LineChart chartData={data.steps} color="#8A2BE2" title="Steps History" width={width} />
            <LineChart chartData={data.calories} color="#FF4500" title="Calories History" width={width} />
            <WorkoutsHydrationChart chartData={data.hydrationWorkouts} width={width} />
        </View>
    );
};


export default ChartsSection;

const styles = StyleSheet.create({
    card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
    chartWrapper: { marginVertical: 15, alignItems: 'center' },
    miniChartTitle: { fontSize: 12, color: '#999', marginBottom: 10, alignSelf: 'flex-start' },
});
