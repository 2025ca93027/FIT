export const FITNESS_DATA = {
    Daily: {
        goals: {
            steps: { current: 6500, target: 10000, unit: 'steps' },
            calories: { current: 1200, target: 2000, unit: 'cal' },
            workouts: { current: 0, target: 1, unit: 'workouts' },
            water: { current: 5, target: 8, unit: 'glasses' },
        },
        chartData: {
            steps: [
                { day: '6am', value: 0 },
                { day: '9am', value: 2000 },
                { day: '12pm', value: 4500 },
                { day: '3pm', value: 5000 },
                { day: '6pm', value: 6000 },
                { day: '9pm', value: 6500 },
            ],
            calories: [
                { day: '6am', value: 0 },
                { day: '9am', value: 400 },
                { day: '12pm', value: 800 },
                { day: '3pm', value: 1000 },
                { day: '6pm', value: 1100 },
                { day: '9pm', value: 1200 },
            ],
            hydrationWorkouts: [
                { day: '6am', water: 1, workouts: 0 },
                { day: '9am', water: 2, workouts: 0 },
                { day: '12pm', water: 3, workouts: 0 },
                { day: '3pm', water: 4, workouts: 0 },
                { day: '6pm', water: 4, workouts: 1 },
                { day: '9pm', water: 5, workouts: 1 },
            ]
        },
        averages: {
            steps: 6500,
            calories: 1200,
            workouts: 1,
            water: 5,
        },
    },
    Weekly: {
        goals: {
            steps: { current: 45000, target: 70000, unit: 'steps' },
            calories: { current: 12000, target: 14000, unit: 'cal' },
            workouts: { current: 3, target: 5, unit: 'workouts' },
            water: { current: 35, target: 56, unit: 'glasses' },
        },
        chartData: {
            steps: [
                { day: 'Mon', value: 7000 },
                { day: 'Tue', value: 8000 },
                { day: 'Wed', value: 6500 },
                { day: 'Thu', value: 9000 },
                { day: 'Fri', value: 7500 },
                { day: 'Sat', value: 10000 },
                { day: 'Sun', value: 4000 },
            ],
            calories: [
                { day: 'Mon', value: 2200 },
                { day: 'Tue', value: 2100 },
                { day: 'Wed', value: 1800 },
                { day: 'Thu', value: 2400 },
                { day: 'Fri', value: 2000 },
                { day: 'Sat', value: 2500 },
                { day: 'Sun', value: 1500 },
            ],
            hydrationWorkouts: [
                { day: 'Mon', water: 7, workouts: 1 },
                { day: 'Tue', water: 8, workouts: 1 },
                { day: 'Wed', water: 6, workouts: 0 },
                { day: 'Thu', water: 9, workouts: 1 },
                { day: 'Fri', water: 7, workouts: 0 },
                { day: 'Sat', water: 8, workouts: 1 },
                { day: 'Sun', water: 5, workouts: 0 },
            ]
        },
        averages: {
            steps: 7428,
            calories: 2071,
            workouts: 4,
            water: 50,
        },
    },
    Monthly: {
        goals: {
            steps: { current: 180000, target: 300000, unit: 'steps' },
            calories: { current: 50000, target: 60000, unit: 'cal' },
            workouts: { current: 15, target: 20, unit: 'workouts' },
            water: { current: 150, target: 240, unit: 'glasses' },
        },
        chartData: {
            steps: [
                { day: 'Week 1', value: 45000 },
                { day: 'Week 2', value: 48000 },
                { day: 'Week 3', value: 50000 },
                { day: 'Week 4', value: 37000 },
            ],
            calories: [
                { day: 'Week 1', value: 14000 },
                { day: 'Week 2', value: 15000 },
                { day: 'Week 3', value: 16000 },
                { day: 'Week 4', value: 5000 },
            ],
            hydrationWorkouts: [
                { day: 'Week 1', water: 50, workouts: 4 },
                { day: 'Week 2', water: 55, workouts: 5 },
                { day: 'Week 3', water: 52, workouts: 5 },
                { day: 'Week 4', water: 40, workouts: 1 },
            ]
        },
        averages: {
            steps: 45000,
            calories: 12500,
            workouts: 15,
            water: 197,
        },
    }
};
