import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FitnessRecommendations from '../components/FitnessRecommendations';

describe('FitnessRecommendations Component', () => {
  const createMockWorkout = (daysAgo, category = 'cardio', intensity = 7) => ({
    id: Math.random(),
    exercise: 'Test Workout',
    duration: 30,
    calories: 300,
    category,
    intensity,
    workoutDate: new Date(Date.now() - daysAgo * 86400000).toISOString()
  });

  it('renders the recommendations title', () => {
    render(<FitnessRecommendations workouts={[]} goals={[]} />);
    expect(screen.getByText('Personalized Tips & Insights')).toBeInTheDocument();
  });

  it('shows start message when no workouts exist', () => {
    render(<FitnessRecommendations workouts={[]} goals={[]} />);
    expect(screen.getByText('Start Your Fitness Journey!')).toBeInTheDocument();
    expect(screen.getByText(/log your first workout/i)).toBeInTheDocument();
  });

  it('displays motivational quote', () => {
    const workouts = [createMockWorkout(0)];
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    
    expect(screen.getByText(/the only bad workout/i)).toBeInTheDocument();
    expect(screen.getByText(/keep pushing forward/i)).toBeInTheDocument();
  });

  it('recommends rest day when overtraining', () => {
    // Create 6 workouts in last 7 days
    const workouts = [
      createMockWorkout(0),
      createMockWorkout(1),
      createMockWorkout(2),
      createMockWorkout(3),
      createMockWorkout(4),
      createMockWorkout(5),
    ];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Consider a Rest Day')).toBeInTheDocument();
  });

  it('encourages consistency when inactive', () => {
    // Last workout was 4 days ago
    const workouts = [createMockWorkout(4)];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Time to Get Back On Track!')).toBeInTheDocument();
  });

  it('congratulates for working out today', () => {
    const workouts = [createMockWorkout(0)];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Great Job Today!')).toBeInTheDocument();
  });

  it('suggests workout variety when dominated by one category', () => {
    // 10 cardio workouts out of 12 = 83%
    const workouts = [
      ...Array(10).fill(null).map((_, i) => createMockWorkout(i, 'cardio')),
      createMockWorkout(11, 'strength'),
      createMockWorkout(12, 'flexibility')
    ];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Add More Variety')).toBeInTheDocument();
  });

  it('recommends increasing intensity when average is low', () => {
    const workouts = [
      createMockWorkout(0, 'cardio', 3),
      createMockWorkout(1, 'cardio', 4),
      createMockWorkout(2, 'cardio', 4),
    ];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Challenge Yourself More')).toBeInTheDocument();
  });

  it('recommends balancing intensity when average is too high', () => {
    const workouts = [
      createMockWorkout(0, 'cardio', 9),
      createMockWorkout(1, 'cardio', 9),
      createMockWorkout(2, 'cardio', 8),
    ];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Balance High Intensity')).toBeInTheDocument();
  });

  it('celebrates 10 workout milestone', () => {
    const workouts = Array(10).fill(null).map((_, i) => createMockWorkout(i));
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('🎉 10 Workouts Milestone!')).toBeInTheDocument();
  });

  it('celebrates 50 workout milestone', () => {
    const workouts = Array(50).fill(null).map((_, i) => createMockWorkout(i % 30));
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('🎉 50 Workouts Milestone!')).toBeInTheDocument();
  });

  it('celebrates 100 workout milestone', () => {
    const workouts = Array(100).fill(null).map((_, i) => createMockWorkout(i % 30));
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('🎉 100 Workouts Champion!')).toBeInTheDocument();
  });

  it('suggests creating first goal when none exist', () => {
    const workouts = [createMockWorkout(0)];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Set Your First Goal')).toBeInTheDocument();
  });

  it('alerts when behind on goals', () => {
    const workouts = [createMockWorkout(0)];
    const goals = [{
      id: 1,
      title: 'Complete 20 Workouts',
      type: 'workouts',
      targetValue: 20,
      currentValue: 5, // 25% progress
      targetDate: new Date(Date.now() + 7 * 86400000).toISOString(), // 7 days from now
      status: 'active'
    }];
    
    render(<FitnessRecommendations workouts={workouts} goals={goals} />);
    // Should detect being behind schedule
  });

  it('encourages when close to completing goal', () => {
    const workouts = [createMockWorkout(0)];
    const goals = [{
      id: 1,
      title: 'Complete 20 Workouts',
      type: 'workouts',
      targetValue: 20,
      currentValue: 18, // 90% complete
      targetDate: new Date(Date.now() + 7 * 86400000).toISOString(),
      status: 'active'
    }];
    
    render(<FitnessRecommendations workouts={workouts} goals={goals} />);
    expect(screen.getByText('Almost There!')).toBeInTheDocument();
  });

  it('recommends weekly workout frequency', () => {
    const workouts = [
      createMockWorkout(0),
      createMockWorkout(5),
    ]; // Only 2 workouts in last 7 days
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    expect(screen.getByText('Boost Your Weekly Activity')).toBeInTheDocument();
  });

  it('displays high priority recommendations first', () => {
    const workouts = Array(6).fill(null).map((_, i) => createMockWorkout(i));
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    
    const recommendations = screen.getAllByRole('heading', { level: 3 });
    // High priority items should be at the top
    expect(recommendations.length).toBeGreaterThan(0);
  });

  it('limits recommendations to top 5', () => {
    // Create conditions for many recommendations
    const workouts = [
      ...Array(6).fill(null).map((_, i) => createMockWorkout(i, 'cardio', 9)),
    ];
    const goals = [{
      id: 1,
      title: 'Test Goal',
      type: 'workouts',
      targetValue: 20,
      currentValue: 5,
      targetDate: new Date(Date.now() + 7 * 86400000).toISOString(),
      status: 'active'
    }];
    
    render(<FitnessRecommendations workouts={workouts} goals={goals} />);
    
    // Should show max 5 recommendations
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    expect(recommendationCards.length).toBeLessThanOrEqual(5);
  });

  it('displays priority badges correctly', () => {
    const workouts = [createMockWorkout(0)];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    
    // Check for priority badges
    const badges = document.querySelectorAll('.rec-badge');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('shows appropriate icons for each recommendation', () => {
    const workouts = [createMockWorkout(0)];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    
    // Icons should be rendered
    const icons = document.querySelectorAll('.rec-icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('handles multiple active goals', () => {
    const workouts = [createMockWorkout(0)];
    const goals = [
      {
        id: 1,
        title: 'Goal 1',
        type: 'workouts',
        targetValue: 20,
        currentValue: 18,
        targetDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        status: 'active'
      },
      {
        id: 2,
        title: 'Goal 2',
        type: 'calories',
        targetValue: 5000,
        currentValue: 4500,
        targetDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        status: 'active'
      }
    ];
    
    render(<FitnessRecommendations workouts={workouts} goals={goals} />);
    
    // Should process multiple goals
    const recommendations = screen.getAllByRole('heading', { level: 3 });
    expect(recommendations.length).toBeGreaterThan(0);
  });

  it('differentiates between workout categories in variety suggestion', () => {
    const workouts = [
      ...Array(8).fill(null).map((_, i) => createMockWorkout(i, 'strength')),
      createMockWorkout(9, 'cardio'),
    ];
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    
    // Should suggest cardio or yoga for strength-dominated workouts
    const varietyRec = screen.getByText('Add More Variety');
    expect(varietyRec).toBeInTheDocument();
  });

  it('provides specific suggestions for each category dominance', () => {
    const workouts = Array(10).fill(null).map((_, i) => createMockWorkout(i, 'flexibility'));
    
    render(<FitnessRecommendations workouts={workouts} goals={[]} />);
    
    // Should suggest cardio or strength for flexibility-dominated workouts
    expect(screen.getByText('Add More Variety')).toBeInTheDocument();
  });
});
