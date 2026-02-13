import { useState, useEffect } from 'react';
import { Activity, Target, TrendingUp, Plus, X, BarChart3, Lightbulb } from 'lucide-react';
import { workoutAPI, goalAPI } from './services/api';
import Dashboard from './components/Dashboard';
import WorkoutList from './components/WorkoutList';
import GoalList from './components/GoalList';
import WorkoutForm from './components/WorkoutForm';
import GoalForm from './components/GoalForm';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import FitnessRecommendations from './components/FitnessRecommendations';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [workoutsRes, goalsRes] = await Promise.all([
        workoutAPI.getAll(),
        goalAPI.getAll()
      ]);
      setWorkouts(workoutsRes.data);
      setGoals(goalsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutSubmit = async (workout) => {
    try {
      if (editingWorkout) {
        await workoutAPI.update(editingWorkout.id, workout);
      } else {
        await workoutAPI.create(workout);
      }
      fetchData();
      setShowWorkoutForm(false);
      setEditingWorkout(null);
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const handleGoalSubmit = async (goal) => {
    try {
      if (editingGoal) {
        await goalAPI.update(editingGoal.id, goal);
      } else {
        await goalAPI.create(goal);
      }
      fetchData();
      setShowGoalForm(false);
      setEditingGoal(null);
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await workoutAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await goalAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setShowWorkoutForm(true);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowGoalForm(true);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Activity size={32} />
            <h1>FITTRACK</h1>
          </div>
          <nav className="nav">
            <button
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <TrendingUp size={20} />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-btn ${activeTab === 'workouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('workouts')}
            >
              <Activity size={20} />
              <span>Workouts</span>
            </button>
            <button
              className={`nav-btn ${activeTab === 'goals' ? 'active' : ''}`}
              onClick={() => setActiveTab('goals')}
            >
              <Target size={20} />
              <span>Goals</span>
            </button>
            <button
              className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </button>
            <button
              className={`nav-btn ${activeTab === 'tips' ? 'active' : ''}`}
              onClick={() => setActiveTab('tips')}
            >
              <Lightbulb size={20} />
              <span>Tips</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your fitness data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard workouts={workouts} goals={goals} />}
            {activeTab === 'workouts' && (
              <WorkoutList
                workouts={workouts}
                onDelete={handleDeleteWorkout}
                onEdit={handleEditWorkout}
                onAdd={() => setShowWorkoutForm(true)}
              />
            )}
            {activeTab === 'goals' && (
              <GoalList
                goals={goals}
                onDelete={handleDeleteGoal}
                onEdit={handleEditGoal}
                onAdd={() => setShowGoalForm(true)}
              />
            )}
            {activeTab === 'analytics' && <AdvancedAnalytics workouts={workouts} />}
            {activeTab === 'tips' && <FitnessRecommendations workouts={workouts} goals={goals} />}
          </>
        )}
      </main>

      {showWorkoutForm && (
        <div className="modal-overlay" onClick={() => {
          setShowWorkoutForm(false);
          setEditingWorkout(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => {
                setShowWorkoutForm(false);
                setEditingWorkout(null);
              }}
            >
              <X size={24} />
            </button>
            <WorkoutForm
              workout={editingWorkout}
              onSubmit={handleWorkoutSubmit}
              onCancel={() => {
                setShowWorkoutForm(false);
                setEditingWorkout(null);
              }}
            />
          </div>
        </div>
      )}

      {showGoalForm && (
        <div className="modal-overlay" onClick={() => {
          setShowGoalForm(false);
          setEditingGoal(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => {
                setShowGoalForm(false);
                setEditingGoal(null);
              }}
            >
              <X size={24} />
            </button>
            <GoalForm
              goal={editingGoal}
              onSubmit={handleGoalSubmit}
              onCancel={() => {
                setShowGoalForm(false);
                setEditingGoal(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
