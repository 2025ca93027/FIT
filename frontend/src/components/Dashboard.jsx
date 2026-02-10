import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Flame, Clock, Target, TrendingUp } from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';
import './Dashboard.css';

const CATEGORY_COLORS = {
  cardio: '#00ffff',
  strength: '#ff00ff',
  flexibility: '#00ff80',
  sports: '#0080ff'
};

function Dashboard({ workouts, goals }) {
  const stats = useMemo(() => {
    const last7Days = workouts.filter(w => 
      new Date(w.workoutDate) >= subDays(new Date(), 7)
    );

    const totalCalories = last7Days.reduce((sum, w) => sum + w.calories, 0);
    const totalDuration = last7Days.reduce((sum, w) => sum + w.duration, 0);
    const totalWorkouts = last7Days.length;
    const activeGoals = goals.filter(g => g.status === 'active').length;

    return { totalCalories, totalDuration, totalWorkouts, activeGoals };
  }, [workouts, goals]);

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date: format(date, 'EEE'),
        calories: 0,
        duration: 0
      };
    });

    workouts.forEach(workout => {
      const workoutDate = new Date(workout.workoutDate);
      const daysDiff = Math.floor((new Date() - workoutDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff < 7) {
        const index = 6 - daysDiff;
        if (index >= 0 && index < 7) {
          last7Days[index].calories += workout.calories;
          last7Days[index].duration += workout.duration;
        }
      }
    });

    return last7Days;
  }, [workouts]);

  const categoryData = useMemo(() => {
    const categories = {};
    workouts.forEach(w => {
      categories[w.category] = (categories[w.category] || 0) + 1;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: CATEGORY_COLORS[name] || '#ffffff'
    }));
  }, [workouts]);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Your Fitness Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(0, 255, 255, 0.2)' }}>
            <Flame size={32} color="#00ffff" />
          </div>
          <div className="stat-content">
            <h3>Calories Burned</h3>
            <p className="stat-value" style={{ color: '#00ffff' }}>{stats.totalCalories}</p>
            <span className="stat-label">Last 7 days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(255, 0, 255, 0.2)' }}>
            <Clock size={32} color="#ff00ff" />
          </div>
          <div className="stat-content">
            <h3>Total Duration</h3>
            <p className="stat-value" style={{ color: '#ff00ff' }}>{stats.totalDuration} min</p>
            <span className="stat-label">Last 7 days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(0, 255, 128, 0.2)' }}>
            <TrendingUp size={32} color="#00ff80" />
          </div>
          <div className="stat-content">
            <h3>Workouts</h3>
            <p className="stat-value" style={{ color: '#00ff80' }}>{stats.totalWorkouts}</p>
            <span className="stat-label">Last 7 days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(0, 128, 255, 0.2)' }}>
            <Target size={32} color="#0080ff" />
          </div>
          <div className="stat-content">
            <h3>Active Goals</h3>
            <p className="stat-value" style={{ color: '#0080ff' }}>{stats.activeGoals}</p>
            <span className="stat-label">In progress</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
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
              <Bar dataKey="calories" fill="#00ffff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Workout Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(26, 0, 51, 0.9)', 
                  border: '2px solid #00ffff',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-goals">
        <h3>Active Goals</h3>
        {goals.filter(g => g.status === 'active').length === 0 ? (
          <p className="empty-state">No active goals. Create one to get started!</p>
        ) : (
          <div className="goals-list">
            {goals.filter(g => g.status === 'active').slice(0, 3).map(goal => (
              <div key={goal.id} className="goal-card-mini">
                <div className="goal-info">
                  <h4>{goal.title}</h4>
                  <div className="goal-progress-bar">
                    <div 
                      className="goal-progress-fill"
                      style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="goal-progress-text">
                    {goal.currentValue} / {goal.targetValue} {goal.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
