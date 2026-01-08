export enum GoalTrackingMode {
    Manual = 0,
    Distance = 1,
    Workouts = 2,
    Duration = 3,
}

export enum WorkoutActivityType {
    Running = 1,
    Walking = 2,
    Cycling = 3,
    StrengthTraining = 10,
    Yoga = 11,
    Hydration = 50,
    Other = 99,
}

export interface Goal {
    id: string;
    trackingMode: GoalTrackingMode;
    targetValue: number;
    currentProgress: number;
    unit?: string | null;
    name?: string | null;
    startDate: string;
    endDate?: string | null;
    isCompleted: boolean;
}

export interface Workout {
    id: string;
    startedAtUtc: string;
    durationMinutes: number;
    distanceMeters?: number | null;
    activityType: WorkoutActivityType;
}

export interface CreateGoalRequest {
    trackingMode: GoalTrackingMode;
    targetValue: number;
    unit?: string;
    name: string;
    startDate: string; // YYYY-MM-DD
    endDate?: string;
    isCompleted: boolean;
}

export interface LogWorkoutRequest {
    startedAtUtc: string;
    durationMinutes: number;
    distanceMeters?: number;
    activityType: WorkoutActivityType;
}
