import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import './WorkoutForm.css';

function WorkoutForm({ workout, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    exercise: '',
    duration: '',
    calories: '',
    category: 'cardio',
    intensity: '5',
    notes: '',
    workoutDate: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    if (workout) {
      setFormData({
        exercise: workout.exercise,
        duration: workout.duration.toString(),
        calories: workout.calories.toString(),
        category: workout.category,
        intensity: workout.intensity.toString(),
        notes: workout.notes || '',
        workoutDate: new Date(workout.workoutDate).toISOString().slice(0, 16)
      });
    }
  }, [workout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories),
      intensity: parseInt(formData.intensity),
      workoutDate: new Date(formData.workoutDate).toISOString()
    });
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{workout ? 'Edit Workout' : 'Add New Workout'}</h2>

      <div className="form-group">
        <label htmlFor="exercise">Exercise Name *</label>
        <input
          type="text"
          id="exercise"
          name="exercise"
          value={formData.exercise}
          onChange={handleChange}
          placeholder="e.g., Morning Run, Bench Press"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes) *</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            placeholder="30"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="calories">Calories Burned *</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            min="0"
            placeholder="250"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="cardio">🏃 Cardio</option>
            <option value="strength">💪 Strength</option>
            <option value="flexibility">🧘 Flexibility</option>
            <option value="sports">⚽ Sports</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="intensity">Intensity (1-10) *</label>
          <input
            type="number"
            id="intensity"
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
          <div className="intensity-indicator">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`intensity-bar ${i < formData.intensity ? 'active' : ''}`}
                style={{
                  background: i < formData.intensity
                    ? formData.intensity >= 8
                      ? '#ff00ff'
                      : formData.intensity >= 5
                      ? '#0080ff'
                      : '#00ff80'
                    : 'rgba(255, 255, 255, 0.1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="workoutDate">Workout Date & Time *</label>
        <input
          type="datetime-local"
          id="workoutDate"
          name="workoutDate"
          value={formData.workoutDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="How did you feel? Any achievements or observations..."
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={20} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={20} />
          {workout ? 'Update Workout' : 'Save Workout'}
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
