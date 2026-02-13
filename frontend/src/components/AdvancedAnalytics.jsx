import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Calendar, Award, Flame } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, differenceInDays } from 'date-fns';
import './AdvancedAnalytics.css';

function AdvancedAnalytics({ workouts }) {
  // Calculate workout streak
  const streakData = useMemo(() => {
    if (workouts.length === 0) return { current: 0, longest: 0, lastWorkout: null };

    const sortedDates = workouts
      .map(w => format(new Date(w.workoutDate), 'yyyy-MM-dd'))
      .sort()
      .reverse();

    const uniqueDates = [...new Set(sortedDates)];
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    // Calculate current streak
    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    
    if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
      currentStreak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const diff = differenceInDays(
          new Date(uniqueDates[i - 1]),
          new Date(uniqueDates[i])
        );
        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    for (let i = 1; i < uniqueDates.length; i++) {
      const diff = differenceInDays(
        new Date(uniqueDates[i - 1]),
        new Date(uniqueDates[i])
      );
      
      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    return {
      current: currentStreak,
      longest: longestStreak,
      lastWorkout: uniqueDates[0]
    };
  }, [workouts]);

  // Monthly trend data
  const monthlyTrend = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      return {
        date: format(date, 'MM/dd'),
        fullDate: format(date, 'yyyy-MM-dd'),
        workouts: 0,
        calories: 0,
        duration: 0
      };
    });

    workouts.forEach(workout => {
      const workoutDate = format(new Date(workout.workoutDate), 'yyyy-MM-dd');
      const dayData = last30Days.find(d => d.fullDate === workoutDate);
      if (dayData) {
        dayData.workouts += 1;
        dayData.calories += workout.calories;
        dayData.duration += workout.duration;
      }
    });

    return last30Days;
  }, [workouts]);

  // Workout frequency by day of week
  const frequencyByDay = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const frequency = days.map(day => ({ day, count: 0 }));

    workouts.forEach(workout => {
      const dayIndex = new Date(workout.workoutDate).getDay();
      frequency[dayIndex].count++;
    });

    return frequency;
  }, [workouts]);

  // Personal records
  const personalRecords = useMemo(() => {
    if (workouts.length === 0) return null;

    const maxCalories = Math.max(...workouts.map(w => w.calories));
    const maxDuration = Math.max(...workouts.map(w => w.duration));
    const maxIntensity = Math.max(...workouts.map(w => w.intensity));

    const maxCaloriesWorkout = workouts.find(w => w.calories === maxCalories);
    const maxDurationWorkout = workouts.find(w => w.duration === maxDuration);
    const maxIntensityWorkout = workouts.find(w => w.intensity === maxIntensity);

    return {
      maxCalories: { value: maxCalories, workout: maxCaloriesWorkout },
      maxDuration: { value: maxDuration, workout: maxDurationWorkout },
      maxIntensity: { value: maxIntensity, workout: maxIntensityWorkout }
    };
  }, [workouts]);

  // Average stats
  const averageStats = useMemo(() => {
    if (workouts.length === 0) return null;

    const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalIntensity = workouts.reduce((sum, w) => sum + w.intensity, 0);

    return {
      avgCalories: Math.round(totalCalories / workouts.length),
      avgDuration: Math.round(totalDuration / workouts.length),
      avgIntensity: (totalIntensity / workouts.length).toFixed(1)
    };
  }, [workouts]);

  if (workouts.length === 0) {
    return (
      <div className="advanced-analytics">
        <h2 className="analytics-title">Advanced Analytics</h2>
        <div className="empty-analytics">
          <TrendingUp size={64} color="#00ffff" />
          <p>Add more workouts to see detailed analytics and trends!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="advanced-analytics">
      <h2 className="analytics-title">Advanced Analytics</h2>

      {/* Streak Section */}
      <div className="streak-section">
        <div className="streak-card">
          <div className="streak-icon">
            <Flame size={40} color="#ff00ff" />
          </div>
          <div className="streak-info">
            <h3>Current Streak</h3>
            <p className="streak-value">{streakData.current} {streakData.current === 1 ? 'day' : 'days'}</p>
            <span className="streak-label">Keep it going!</span>
          </div>
        </div>

        <div className="streak-card">
          <div className="streak-icon">
            <Award size={40} color="#00ff80" />
          </div>
          <div className="streak-info">
            <h3>Longest Streak</h3>
            <p className="streak-value">{streakData.longest} {streakData.longest === 1 ? 'day' : 'days'}</p>
            <span className="streak-label">Personal best!</span>
          </div>
        </div>

        <div className="streak-card">
          <div className="streak-icon">
            <Calendar size={40} color="#0080ff" />
          </div>
          <div className="streak-info">
            <h3>Total Workouts</h3>
            <p className="streak-value">{workouts.length}</p>
            <span className="streak-label">All time</span>
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="chart-card">
        <h3>30-Day Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="date" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(26, 0, 51, 0.9)', 
                border: '2px solid #00ffff',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="#00ffff" 
              strokeWidth={2}
              dot={{ fill: '#00ffff', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="workouts" 
              stroke="#ff00ff" 
              strokeWidth={2}
              dot={{ fill: '#ff00ff', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Frequency by Day of Week */}
      <div className="chart-card">
        <h3>Workout Frequency by Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={frequencyByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="day" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(26, 0, 51, 0.9)', 
                border: '2px solid #00ffff',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="count" fill="#00ff80" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="chart-insight">
          Most active day: <strong>{frequencyByDay.reduce((max, day) => day.count > max.count ? day : max).day}</strong>
        </p>
      </div>

      {/* Personal Records */}
      {personalRecords && (
        <div className="records-section">
          <h3>Personal Records</h3>
          <div className="records-grid">
            <div className="record-card">
              <div className="record-header">
                <Award size={24} color="#00ffff" />
                <span>Most Calories</span>
              </div>
              <p className="record-value">{personalRecords.maxCalories.value} cal</p>
              <p className="record-workout">{personalRecords.maxCalories.workout.exercise}</p>
              <p className="record-date">
                {format(new Date(personalRecords.maxCalories.workout.workoutDate), 'MMM dd, yyyy')}
              </p>
            </div>

            <div className="record-card">
              <div className="record-header">
                <Award size={24} color="#ff00ff" />
                <span>Longest Duration</span>
              </div>
              <p className="record-value">{personalRecords.maxDuration.value} min</p>
              <p className="record-workout">{personalRecords.maxDuration.workout.exercise}</p>
              <p className="record-date">
                {format(new Date(personalRecords.maxDuration.workout.workoutDate), 'MMM dd, yyyy')}
              </p>
            </div>

            <div className="record-card">
              <div className="record-header">
                <Award size={24} color="#00ff80" />
                <span>Highest Intensity</span>
              </div>
              <p className="record-value">{personalRecords.maxIntensity.value}/10</p>
              <p className="record-workout">{personalRecords.maxIntensity.workout.exercise}</p>
              <p className="record-date">
                {format(new Date(personalRecords.maxIntensity.workout.workoutDate), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Average Stats */}
      {averageStats && (
        <div className="averages-section">
          <h3>Your Averages</h3>
          <div className="averages-grid">
            <div className="average-card">
              <p className="average-label">Avg. Calories</p>
              <p className="average-value">{averageStats.avgCalories}</p>
            </div>
            <div className="average-card">
              <p className="average-label">Avg. Duration</p>
              <p className="average-value">{averageStats.avgDuration} min</p>
            </div>
            <div className="average-card">
              <p className="average-label">Avg. Intensity</p>
              <p className="average-value">{averageStats.avgIntensity}/10</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvancedAnalytics;
