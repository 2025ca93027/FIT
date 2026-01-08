import { Goal, GoalTrackingMode, Workout, WorkoutActivityType } from '../types';

export const FALLBACK_GOALS: Goal[] = [
    {
        id: '11111111-1111-1111-1111-111111111111',
        trackingMode: GoalTrackingMode.Manual,
        targetValue: 10000,
        currentProgress: 5000,
        unit: 'steps',
        name: 'Daily Steps',
        startDate: '2025-01-01',
        isCompleted: false,
    },
    {
        id: '22222222-2222-2222-2222-222222222222',
        trackingMode: GoalTrackingMode.Manual,
        targetValue: 2500,
        currentProgress: 1800,
        unit: 'cal',
        name: 'Daily Calories',
        startDate: '2025-01-01',
        isCompleted: false,
    },
    {
        id: '33333333-3333-3333-3333-333333333333',
        trackingMode: GoalTrackingMode.Workouts,
        targetValue: 4,
        currentProgress: 2,
        name: 'Weekly Workouts',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
        isCompleted: false,
    },
];

export const FALLBACK_WORKOUTS: Workout[] = [
    {
        id: 'fallback-w-1',
        startedAtUtc: new Date().toISOString(),
        durationMinutes: 45,
        distanceMeters: 5000,
        activityType: WorkoutActivityType.Running,
    },
    {
        id: 'fallback-w-2',
        startedAtUtc: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        durationMinutes: 60,
        activityType: WorkoutActivityType.StrengthTraining,
    },
];
