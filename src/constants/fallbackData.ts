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
    {
        id: '44444444-4444-4444-4444-444444444444',
        trackingMode: GoalTrackingMode.Manual,
        targetValue: 8,
        currentProgress: 0,
        unit: 'glasses',
        name: 'Daily Water',
        startDate: '2025-01-01',
        isCompleted: false,
    },
    {
        id: '55555555-5555-5555-5555-555555555555',
        trackingMode: GoalTrackingMode.Distance,
        targetValue: 5,
        currentProgress: 2.5,
        unit: 'km',
        name: 'Weekly Run',
        startDate: '2025-01-01',
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
        id: 'fallback-w-3',
        startedAtUtc: new Date().toISOString(),
        durationMinutes: 0,
        distanceMeters: 8, // 8 glasses today
        activityType: WorkoutActivityType.Hydration,
    },
    {
        id: 'fallback-w-4',
        startedAtUtc: new Date(Date.now() - 86400000 * 1).toISOString(), // Yesterday
        durationMinutes: 0,
        distanceMeters: 8,
        activityType: WorkoutActivityType.Hydration,
    },
    {
        id: 'fallback-w-5',
        startedAtUtc: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        durationMinutes: 0,
        distanceMeters: 8,
        activityType: WorkoutActivityType.Hydration,
    },
    {
        id: 'fallback-w-2',
        startedAtUtc: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        durationMinutes: 60,
        activityType: WorkoutActivityType.StrengthTraining,
    },
];
