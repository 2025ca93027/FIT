import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import './GoalForm.css';

function GoalForm({ goal, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'workouts',
    targetValue: '',
    currentValue: '0',
    targetDate: '',
    status: 'active'
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        type: goal.type,
        targetValue: goal.targetValue.toString(),
        currentValue: goal.currentValue.toString(),
        targetDate: new Date(goal.targetDate).toISOString().slice(0, 10),
        status: goal.status
      });
    } else {
      // Set default target date to 30 days from now
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      setFormData(prev => ({
        ...prev,
        targetDate: defaultDate.toISOString().slice(0, 10)
      }));
    }
  }, [goal]);

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
      targetValue: parseInt(formData.targetValue),
      currentValue: parseInt(formData.currentValue),
      targetDate: formData.targetDate
    });
  };

  const getTypeLabel = (type) => {
    const labels = {
      weight: '⚖️ Weight (lbs/kg)',
      steps: '👟 Daily Steps',
      workouts: '💪 Workout Count',
      calories: '🔥 Calories Burned'
    };
    return labels[type];
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{goal ? 'Edit Goal' : 'Create New Goal'}</h2>

      <div className="form-group">
        <label htmlFor="title">Goal Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Lose 10 pounds, Run 100 miles"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Goal Type *</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="workouts">{getTypeLabel('workouts')}</option>
          <option value="calories">{getTypeLabel('calories')}</option>
          <option value="steps">{getTypeLabel('steps')}</option>
          <option value="weight">{getTypeLabel('weight')}</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="currentValue">Current Value *</label>
          <input
            type="number"
            id="currentValue"
            name="currentValue"
            value={formData.currentValue}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetValue">Target Value *</label>
          <input
            type="number"
            id="targetValue"
            name="targetValue"
            value={formData.targetValue}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="targetDate">Target Date *</label>
          <input
            type="date"
            id="targetDate"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
          />
        </div>

        {goal && (
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">🎯 Active</option>
              <option value="completed">✅ Completed</option>
              <option value="failed">❌ Failed</option>
            </select>
          </div>
        )}
      </div>

      {formData.targetValue && formData.currentValue && (
        <div className="goal-preview">
          <div className="preview-header">Goal Preview</div>
          <div className="preview-progress">
            <div className="preview-values">
              {formData.currentValue} / {formData.targetValue}
            </div>
            <div className="preview-bar">
              <div 
                className="preview-fill"
                style={{ 
                  width: `${Math.min((parseInt(formData.currentValue) / parseInt(formData.targetValue)) * 100, 100)}%` 
                }}
              />
            </div>
            <div className="preview-percentage">
              {((parseInt(formData.currentValue) / parseInt(formData.targetValue)) * 100).toFixed(0)}% Complete
            </div>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={20} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={20} />
          {goal ? 'Update Goal' : 'Create Goal'}
        </button>
      </div>
    </form>
  );
}

export default GoalForm;
