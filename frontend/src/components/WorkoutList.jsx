import { format } from 'date-fns';
import { Plus, Edit2, Trash2, Zap } from 'lucide-react';
import ShareButton from './ShareButton';
import './WorkoutList.css';

const CATEGORY_COLORS = {
  cardio: '#00ffff',
  strength: '#ff00ff',
  flexibility: '#00ff80',
  sports: '#0080ff'
};

const CATEGORY_ICONS = {
  cardio: '🏃',
  strength: '💪',
  flexibility: '🧘',
  sports: '⚽'
};

function WorkoutList({ workouts, onDelete, onEdit, onAdd }) {
  const getIntensityColor = (intensity) => {
    if (intensity >= 8) return '#ff00ff';
    if (intensity >= 5) return '#0080ff';
    return '#00ff80';
  };

  return (
    <div className="workout-list">
      <div className="list-header">
        <h2>Workout History</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={20} />
          Add Workout
        </button>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state-large">
          <Zap size={64} color="#00ffff" />
          <h3>No workouts yet!</h3>
          <p>Start tracking your fitness journey by adding your first workout.</p>
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={20} />
            Add Your First Workout
          </button>
        </div>
      ) : (
        <div className="workout-grid">
          {workouts.map((workout, index) => (
            <div 
              key={workout.id} 
              className="workout-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="workout-header">
                <div className="workout-category" style={{ color: CATEGORY_COLORS[workout.category] }}>
                  <span className="category-icon">{CATEGORY_ICONS[workout.category]}</span>
                  <span>{workout.category.toUpperCase()}</span>
                </div>
                <div className="workout-actions">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => onEdit(workout)}
                    title="Edit workout"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => onDelete(workout.id)}
                    title="Delete workout"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="workout-title">{workout.exercise}</h3>
              
              <div className="workout-stats">
                <div className="stat-item">
                  <span className="stat-label">Duration</span>
                  <span className="stat-value">{workout.duration} min</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Calories</span>
                  <span className="stat-value">{workout.calories}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Intensity</span>
                  <span 
                    className="stat-value intensity-badge"
                    style={{ 
                      background: getIntensityColor(workout.intensity),
                      color: '#0a0a1a'
                    }}
                  >
                    {workout.intensity}/10
                  </span>
                </div>
              </div>

              {workout.notes && (
                <div className="workout-notes">
                  <p>{workout.notes}</p>
                </div>
              )}

              <div className="workout-date">
                {format(new Date(workout.workoutDate), 'MMM dd, yyyy • HH:mm')}
              </div>

              <div className="workout-share">
                <ShareButton type="workout" data={workout} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
