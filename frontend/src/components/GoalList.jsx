import { format } from 'date-fns';
import { Plus, Edit2, Trash2, Target, CheckCircle, XCircle } from 'lucide-react';
import './GoalList.css';

const GOAL_TYPE_ICONS = {
  weight: '⚖️',
  steps: '👟',
  workouts: '💪',
  calories: '🔥'
};

const STATUS_CONFIG = {
  active: { color: '#0080ff', icon: Target },
  completed: { color: '#00ff80', icon: CheckCircle },
  failed: { color: '#ff00ff', icon: XCircle }
};

function GoalList({ goals, onDelete, onEdit, onAdd }) {
  const getProgressPercentage = (goal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getDaysRemaining = (targetDate) => {
    const days = Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="goal-list">
      <div className="list-header">
        <h2>Fitness Goals</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="empty-state-large">
          <Target size={64} color="#ff00ff" />
          <h3>No goals set yet!</h3>
          <p>Set your fitness goals and track your progress.</p>
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={20} />
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="goal-grid">
          {goals.map((goal, index) => {
            const StatusIcon = STATUS_CONFIG[goal.status].icon;
            const progress = getProgressPercentage(goal);
            const daysRemaining = getDaysRemaining(goal.targetDate);

            return (
              <div 
                key={goal.id} 
                className={`goal-card ${goal.status}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="goal-header">
                  <div className="goal-status" style={{ color: STATUS_CONFIG[goal.status].color }}>
                    <StatusIcon size={20} />
                    <span>{goal.status.toUpperCase()}</span>
                  </div>
                  <div className="goal-actions">
                    <button 
                      className="action-btn edit-btn" 
                      onClick={() => onEdit(goal)}
                      title="Edit goal"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      onClick={() => onDelete(goal.id)}
                      title="Delete goal"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="goal-type">
                  <span className="type-icon">{GOAL_TYPE_ICONS[goal.type]}</span>
                  <span>{goal.type.toUpperCase()}</span>
                </div>

                <h3 className="goal-title">{goal.title}</h3>

                <div className="goal-progress">
                  <div className="progress-header">
                    <span className="progress-value">
                      {goal.currentValue} / {goal.targetValue}
                    </span>
                    <span className="progress-percentage">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${progress}%`,
                        background: STATUS_CONFIG[goal.status].color
                      }}
                    />
                  </div>
                </div>

                <div className="goal-footer">
                  <div className="goal-date">
                    <span className="date-label">Target:</span>
                    <span className="date-value">{format(new Date(goal.targetDate), 'MMM dd, yyyy')}</span>
                  </div>
                  {goal.status === 'active' && (
                    <div className={`days-remaining ${daysRemaining < 7 ? 'urgent' : ''}`}>
                      {daysRemaining > 0 
                        ? `${daysRemaining} days left`
                        : daysRemaining === 0
                        ? 'Due today!'
                        : `${Math.abs(daysRemaining)} days overdue`
                      }
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GoalList;
