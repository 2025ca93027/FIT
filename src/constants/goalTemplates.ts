import { GoalTrackingMode } from '../types';

export interface GoalTemplate {
    id: string;
    name: string;
    targetValue: number;
    unit: string;
    trackingMode: GoalTrackingMode;
    isRecommended?: boolean;
    description?: string;
}

export const GOAL_TEMPLATES: GoalTemplate[] = [
    {
        id: 'rec-1',
        name: 'Steps',
        targetValue: 10000,
        unit: 'steps',
        trackingMode: GoalTrackingMode.Distance,
        isRecommended: true,
        description: 'Stay active with 10k steps daily'
    },
    {
        id: 'rec-2',
        name: 'Water',
        targetValue: 8,
        unit: 'glasses',
        trackingMode: GoalTrackingMode.Manual,
        isRecommended: true,
        description: 'Stay hydrated'
    },
    {
        id: 'rec-3',
        name: 'Calories',
        targetValue: 2000,
        unit: 'cal',
        trackingMode: GoalTrackingMode.Manual,
        description: 'Maintain healthy intake'
    },
    {
        id: 'rec-4',
        name: 'Workouts',
        targetValue: 30, // minutes
        unit: 'min',
        trackingMode: GoalTrackingMode.Duration,
        description: 'Daily active minutes'
    },
    {
        id: 'rec-5',
        name: 'Running',
        targetValue: 5,
        unit: 'km',
        trackingMode: GoalTrackingMode.Distance,
        description: '5K Run'
    }
];
