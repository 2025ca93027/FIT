import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Goal, WorkoutActivityType, Workout } from '../types';
import { FALLBACK_GOALS } from '../constants/fallbackData';

export type TabType = 'Daily' | 'Weekly' | 'Monthly';

// Constants
const CALORIES_PER_MIN = {
    [WorkoutActivityType.Running]: 12,
    [WorkoutActivityType.Walking]: 5,
    [WorkoutActivityType.Cycling]: 10,
    [WorkoutActivityType.StrengthTraining]: 8,
    [WorkoutActivityType.Yoga]: 4,
    [WorkoutActivityType.Hydration]: 0,
    DEFAULT: 6
};

const DEFAULT_GOALS = { steps: 5000, cal: 1200, workouts: 5, water: 6 };

// Structured Object for Validated Data
export interface ProcessedFrequencyData {
    goals: {
        steps: { target: number; current: number; unit: string; name: string };
        calories: { target: number; current: number; unit: string; name: string };
        workouts: { target: number; current: number; unit: string; name: string };
        water: { target: number; current: number; unit: string; name: string };
    };
    chartData: {
        steps: { day: string; value: number }[];
        calories: { day: string; value: number }[];
        hydrationWorkouts: { day: string; water: number; workouts: number }[];
    };
    averages: {
        steps: number;
        calories: number;
        workouts: number;
        water: number;
    };
}

// Helper: Calculate Calories
const calculateCalories = (type: number, duration: number) => {
    // Cast to any/Record to avoid implicit any errors with Enum keys mixed with string keys
    const rate = (CALORIES_PER_MIN as unknown as Record<number, number>)[type] || CALORIES_PER_MIN.DEFAULT;
    return duration * rate;
};

// Helper: Aggregate Stats
const aggregateStats = (workouts: Workout[], dateStr: string) => {
    const stats = { steps: 0, calories: 0, workouts: 0, water: 0 };
    const dayWorkouts = workouts.filter(w => w.startedAtUtc.startsWith(dateStr));

    dayWorkouts.forEach(w => {
        if (w.activityType === WorkoutActivityType.Hydration) {
            stats.water += (w.distanceMeters || 0);
            return;
        }

        if ([WorkoutActivityType.Running, WorkoutActivityType.Walking, WorkoutActivityType.Cycling].includes(w.activityType)) {
            stats.steps += (w.distanceMeters || 0);
        }

        stats.calories += calculateCalories(w.activityType, w.durationMinutes || 0);
        stats.workouts += 1;
    });
    return stats;
};

// Helper: Get Reference Date
const getReferenceDate = (workouts: Workout[], freq: TabType) => {
    const today = new Date();
    if (freq !== 'Daily') return today;

    const todayKey = today.toISOString().split('T')[0];
    const hasTodayData = workouts.some(w => w.startedAtUtc.startsWith(todayKey));

    if (!hasTodayData && workouts.length > 0) {
        const maxDate = Math.max(...workouts.map(w => new Date(w.startedAtUtc).getTime()));
        return new Date(maxDate);
    }
    return today;
};

// Helper: Calculate Goal Targets
const calculateGoalTargets = (allGoals: Goal[], freq: TabType) => {
    const multiplier = freq === 'Daily' ? 1 : freq === 'Weekly' ? 7 : 30;
    const findGoal = (k: string) => allGoals.find(g => g.name?.toLowerCase().includes(k.toLowerCase()));

    return {
        steps: { target: (findGoal('Steps')?.targetValue || DEFAULT_GOALS.steps) * multiplier, current: 0, unit: 'steps', name: 'Steps' },
        calories: { target: (findGoal('Calories')?.targetValue || DEFAULT_GOALS.cal) * multiplier, current: 0, unit: 'cal', name: 'Calories' },
        workouts: { target: (findGoal('Workouts')?.targetValue || DEFAULT_GOALS.workouts) * multiplier, current: 0, unit: 'workouts', name: 'Workouts' },
        water: { target: (findGoal('Water')?.targetValue || DEFAULT_GOALS.water) * multiplier, current: 0, unit: 'glasses', name: 'Water' }
    };
};

// Helper: Generate Chart Data
const generateChartData = (workouts: Workout[], freq: TabType, referenceDate: Date) => {
    const viewData: any[] = [];
    const today = new Date();

    if (freq === 'Daily') {
        for (let i = 6; i >= 0; i--) {
            const d = new Date(referenceDate);
            d.setDate(d.getDate() - i);
            const data = aggregateStats(workouts, d.toISOString().split('T')[0]);
            viewData.push({ ...data, label: d.toLocaleDateString('en-US', { weekday: 'short' }) });
        }
    } else if (freq === 'Weekly') {
        for (let i = 3; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - (i * 7));
            const startOfWeek = new Date(d);
            startOfWeek.setDate(d.getDate() - d.getDay());

            let wSum = { steps: 0, calories: 0, workouts: 0, water: 0 };
            for (let k = 0; k < 7; k++) {
                const cd = new Date(startOfWeek);
                cd.setDate(startOfWeek.getDate() + k);
                const data = aggregateStats(workouts, cd.toISOString().split('T')[0]);
                wSum.steps += data.steps;
                wSum.calories += data.calories;
                wSum.workouts += data.workouts;
                wSum.water += data.water;
            }
            viewData.push({ ...wSum, label: `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1}` });
        }
    } else {
        for (let i = 5; i >= 0; i--) {
            const monthDate = new Date(today);
            monthDate.setMonth(monthDate.getMonth() - i);
            const year = monthDate.getFullYear();
            const month = monthDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            let mSum = { steps: 0, calories: 0, workouts: 0, water: 0 };
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                const k = date.toISOString().split('T')[0];
                if (i === 0 && date > today) continue;

                const data = aggregateStats(workouts, k);
                mSum.steps += data.steps;
                mSum.calories += data.calories;
                mSum.workouts += data.workouts;
                mSum.water += data.water;
            }
            viewData.push({ ...mSum, label: monthDate.toLocaleDateString('en-US', { month: 'short' }) });
        }
    }
    return viewData;
};

// Helper: Calculate 30-Day Averages
const calculateAverages = (workouts: Workout[]) => {
    const today = new Date();
    const last30DaysData: any[] = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        last30DaysData.push(aggregateStats(workouts, d.toISOString().split('T')[0]));
    }

    return {
        steps: Math.round(last30DaysData.reduce((a, b) => a + b.steps, 0) / 30),
        calories: Math.round(last30DaysData.reduce((a, b) => a + b.calories, 0) / 30),
        workouts: Math.round((last30DaysData.reduce((a, b) => a + b.workouts, 0) / 30) * 10) / 10,
        water: Math.round(last30DaysData.reduce((a, b) => a + b.water, 0) / 30)
    };
};

// Helper: Calculate Current Progress
const calculateCurrentProgress = (workouts: Workout[], freq: TabType, referenceDate: Date) => {
    let currentProgress = { steps: 0, calories: 0, workouts: 0, water: 0 };

    if (freq === 'Daily') {
        const refKey = referenceDate.toISOString().split('T')[0];
        currentProgress = aggregateStats(workouts, refKey);
    } else {
        const today = new Date();
        if (freq === 'Weekly') {
            for (let i = 0; i < 7; i++) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                const stats = aggregateStats(workouts, d.toISOString().split('T')[0]);
                currentProgress.steps += stats.steps;
                currentProgress.calories += stats.calories;
                currentProgress.workouts += stats.workouts;
                currentProgress.water += stats.water;
            }
        } else {
            const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            for (let d = new Date(currentMonthStart); d <= today; d.setDate(d.getDate() + 1)) {
                const stats = aggregateStats(workouts, d.toISOString().split('T')[0]);
                currentProgress.steps += stats.steps;
                currentProgress.calories += stats.calories;
                currentProgress.workouts += stats.workouts;
                currentProgress.water += stats.water;
            }
        }
    }
    return currentProgress;
};

export const useFitnessData = () => {
    const [loading, setLoading] = useState(true);
    const [allGoals, setAllGoals] = useState<Goal[]>([]);
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
    const [isFallback, setIsFallback] = useState(false);

    const [frequencyData, setFrequencyData] = useState<Record<TabType, ProcessedFrequencyData | null>>({
        Daily: null,
        Weekly: null,
        Monthly: null
    });

    const fetchData = useCallback(async () => {
        try {
            const [goalsData, workoutsData] = await Promise.all([
                api.goals.get(),
                api.workouts.get(
                    new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    new Date().toISOString().split('T')[0]
                )
            ]);
            setAllGoals(goalsData);
            setAllWorkouts(workoutsData);
            setIsFallback(goalsData === FALLBACK_GOALS);
        } catch (e) {
            console.error("Failed to fetch data", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const processFrequency = useCallback((freq: TabType): ProcessedFrequencyData => {
        const referenceDate = getReferenceDate(allWorkouts, freq);
        const goalObj = calculateGoalTargets(allGoals, freq);
        const chartDataRaw = generateChartData(allWorkouts, freq, referenceDate);
        const averages = calculateAverages(allWorkouts);
        const currentProgress = calculateCurrentProgress(allWorkouts, freq, referenceDate);

        // Apply Limits
        goalObj.steps.current = Math.min(Math.round(currentProgress.steps), goalObj.steps.target);
        goalObj.calories.current = Math.min(Math.round(currentProgress.calories), goalObj.calories.target);
        goalObj.workouts.current = Math.min(currentProgress.workouts, goalObj.workouts.target);
        goalObj.water.current = Math.min(currentProgress.water, goalObj.water.target);

        return {
            goals: goalObj,
            chartData: {
                steps: chartDataRaw.map(d => ({ day: d.label, value: Math.round(d.steps) })),
                calories: chartDataRaw.map(d => ({ day: d.label, value: Math.round(d.calories) })),
                hydrationWorkouts: chartDataRaw.map(d => ({ day: d.label, water: d.water, workouts: d.workouts }))
            },
            averages
        };
    }, [allGoals, allWorkouts]);

    useEffect(() => {
        if (!loading) {
            setFrequencyData({
                Daily: processFrequency('Daily'),
                Weekly: processFrequency('Weekly'),
                Monthly: processFrequency('Monthly')
            });
        }
    }, [loading, processFrequency]);

    const saveGoal = async (activeTab: TabType, key: string, targetValue: number, unit?: string) => {
        setLoading(true);
        try {
            const latestGoals = await api.goals.get();

            if (latestGoals === FALLBACK_GOALS) {
                console.warn("Save aborted: Using fallback data (Offline/Unstable Connection)");
                return;
            }

            setAllGoals(latestGoals);

            const keyword = key === 'steps' ? 'Steps'
                : key === 'calories' ? 'Calories'
                    : key === 'workouts' ? 'Workouts'
                        : 'Water';

            const existingGoal = latestGoals.find(g =>
                g.name?.toLowerCase().includes(keyword.toLowerCase())
            );

            if (existingGoal) {
                await api.goals.update(existingGoal.id, {
                    targetValue,
                    name: existingGoal.name || keyword,
                    unit: existingGoal.unit || undefined,
                    endDate: existingGoal.endDate || undefined
                });
            }

            await fetchData();

        } catch (e) {
            console.error("Failed to save goals", e);
        } finally {
            setLoading(false);
        }
    };

    return { loading, frequencyData, saveGoal, reload: fetchData, isFallback };
};
