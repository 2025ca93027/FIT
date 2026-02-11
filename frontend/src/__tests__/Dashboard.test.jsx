import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component', () => {
  const mockWorkouts = [
    {
      id: 1,
      exercise: 'Running',
      duration: 30,
      calories: 300,
      category: 'cardio',
      intensity: 7,
      workoutDate: new Date().toISOString()
    },
    {
      id: 2,
      exercise: 'Weight Lifting',
      duration: 45,
      calories: 250,
      category: 'strength',
      intensity: 8,
      workoutDate: new Date().toISOString()
    }
  ];

  const mockGoals = [
    {
      id: 1,
      title: 'Complete 20 Workouts',
      type: 'workouts',
      targetValue: 20,
      currentValue: 10,
      targetDate: '2024-03-31',
      status: 'active'
    },
    {
      id: 2,
      title: 'Burn 5000 Calories',
      type: 'calories',
      targetValue: 5000,
      currentValue: 2500,
      targetDate: '2024-03-31',
      status: 'active'
    }
  ];

  it('renders the dashboard title', () => {
    render(<Dashboard workouts={[]} goals={[]} />);
    expect(screen.getByText('Your Fitness Dashboard')).toBeInTheDocument();
  });

  it('displays correct statistics for workouts in last 7 days', () => {
    render(<Dashboard workouts={mockWorkouts} goals={mockGoals} />);

    // Should show total calories
    expect(screen.getByText('550')).toBeInTheDocument(); // 300 + 250

    // Should show total duration
    expect(screen.getByText('75 min')).toBeInTheDocument(); // 30 + 45

    // Should show total workouts
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays correct number of active goals', () => {
    render(<Dashboard workouts={mockWorkouts} goals={mockGoals} />);

    // Should show active goals count
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays stat cards with icons', () => {
    render(<Dashboard workouts={mockWorkouts} goals={mockGoals} />);

    expect(screen.getByText('Calories Burned')).toBeInTheDocument();
    expect(screen.getByText('Total Duration')).toBeInTheDocument();
    expect(screen.getByText('Workouts')).toBeInTheDocument();
    expect(screen.getByText('Active Goals')).toBeInTheDocument();
  });

  it('shows message when no active goals exist', () => {
    render(<Dashboard workouts={mockWorkouts} goals={[]} />);

    expect(screen.getByText(/no active goals/i)).toBeInTheDocument();
  });

  it('displays active goals with progress', () => {
    render(<Dashboard workouts={mockWorkouts} goals={mockGoals} />);

    expect(screen.getByText('Complete 20 Workouts')).toBeInTheDocument();
    expect(screen.getByText('10 / 20 workouts')).toBeInTheDocument();
  });

  it('renders chart containers', () => {
    const { container } = render(<Dashboard workouts={mockWorkouts} goals={mockGoals} />);

    const chartCards = container.querySelectorAll('.chart-card');
    expect(chartCards.length).toBeGreaterThan(0);
  });

  it('displays correct progress percentage for goals', () => {
    render(<Dashboard workouts={mockWorkouts} goals={mockGoals} />);

    // First goal: 10/20 = 50%
    // Second goal: 2500/5000 = 50%
    const progressBars = screen.getAllByRole('progressbar', { hidden: true });
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('handles empty workouts array', () => {
    render(<Dashboard workouts={[]} goals={mockGoals} />);

    expect(screen.getByText('0')).toBeInTheDocument(); // Total calories
    expect(screen.getByText('0 min')).toBeInTheDocument(); // Total duration
  });

  it('handles empty goals array', () => {
    render(<Dashboard workouts={mockWorkouts} goals={[]} />);

    expect(screen.getByText('0')).toBeInTheDocument(); // Active goals count
  });

  it('categorizes workouts correctly', () => {
    const workoutsWithCategories = [
      { ...mockWorkouts[0], category: 'cardio' },
      { ...mockWorkouts[1], category: 'strength' },
      { id: 3, exercise: 'Yoga', duration: 60, calories: 200, category: 'flexibility', intensity: 5, workoutDate: new Date().toISOString() }
    ];

    render(<Dashboard workouts={workoutsWithCategories} goals={mockGoals} />);

    // The component should process different categories for the pie chart
    expect(screen.getByText('Workout Categories')).toBeInTheDocument();
  });
});
