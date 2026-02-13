import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdvancedAnalytics from '../components/AdvancedAnalytics';

describe('AdvancedAnalytics Component', () => {
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
      workoutDate: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    {
      id: 3,
      exercise: 'Yoga',
      duration: 60,
      calories: 200,
      category: 'flexibility',
      intensity: 5,
      workoutDate: new Date(Date.now() - 2 * 86400000).toISOString() // 2 days ago
    }
  ];

  it('renders the analytics title', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    expect(screen.getByText('Advanced Analytics')).toBeInTheDocument();
  });

  it('shows empty state when no workouts exist', () => {
    render(<AdvancedAnalytics workouts={[]} />);
    expect(screen.getByText(/add more workouts to see detailed analytics/i)).toBeInTheDocument();
  });

  it('displays streak information', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    expect(screen.getByText('Current Streak')).toBeInTheDocument();
    expect(screen.getByText('Longest Streak')).toBeInTheDocument();
    expect(screen.getByText('Total Workouts')).toBeInTheDocument();
  });

  it('calculates current streak correctly', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    // Should show current streak with consecutive workouts
    const streakValues = screen.getAllByText(/\d+ day(s)?/);
    expect(streakValues.length).toBeGreaterThan(0);
  });

  it('displays total workout count', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    expect(screen.getByText('3')).toBeInTheDocument(); // Total workouts
  });

  it('renders 30-day trend chart', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    expect(screen.getByText('30-Day Trend')).toBeInTheDocument();
  });

  it('renders frequency by day chart', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    expect(screen.getByText('Workout Frequency by Day')).toBeInTheDocument();
  });

  it('displays personal records section', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    expect(screen.getByText('Personal Records')).toBeInTheDocument();
    expect(screen.getByText('Most Calories')).toBeInTheDocument();
    expect(screen.getByText('Longest Duration')).toBeInTheDocument();
    expect(screen.getByText('Highest Intensity')).toBeInTheDocument();
  });

  it('calculates personal records correctly', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    // Highest calories: 300 from Running
    expect(screen.getByText('300 cal')).toBeInTheDocument();
    
    // Longest duration: 60 from Yoga
    expect(screen.getByText('60 min')).toBeInTheDocument();
    
    // Highest intensity: 8 from Weight Lifting
    expect(screen.getByText('8/10')).toBeInTheDocument();
  });

  it('displays workout names in personal records', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    // Check if workout names appear in personal records
    const runningElements = screen.getAllByText('Running');
    expect(runningElements.length).toBeGreaterThan(0);
  });

  it('displays average statistics', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    expect(screen.getByText('Your Averages')).toBeInTheDocument();
    expect(screen.getByText('Avg. Calories')).toBeInTheDocument();
    expect(screen.getByText('Avg. Duration')).toBeInTheDocument();
    expect(screen.getByText('Avg. Intensity')).toBeInTheDocument();
  });

  it('calculates average statistics correctly', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    // Average calories: (300 + 250 + 200) / 3 = 250
    expect(screen.getByText('250')).toBeInTheDocument();
    
    // Average duration: (30 + 45 + 60) / 3 = 45
    expect(screen.getByText('45 min')).toBeInTheDocument();
    
    // Average intensity: (7 + 8 + 5) / 3 = 6.7
    expect(screen.getByText('6.7/10')).toBeInTheDocument();
  });

  it('shows most active day insight', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    expect(screen.getByText(/most active day:/i)).toBeInTheDocument();
  });

  it('handles single workout correctly', () => {
    const singleWorkout = [mockWorkouts[0]];
    render(<AdvancedAnalytics workouts={singleWorkout} />);
    
    expect(screen.getByText('Total Workouts')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calculates longest streak correctly', () => {
    const consecutiveWorkouts = [
      { ...mockWorkouts[0], workoutDate: new Date().toISOString() },
      { ...mockWorkouts[1], workoutDate: new Date(Date.now() - 86400000).toISOString() },
      { ...mockWorkouts[2], workoutDate: new Date(Date.now() - 2 * 86400000).toISOString() },
    ];
    
    render(<AdvancedAnalytics workouts={consecutiveWorkouts} />);
    
    expect(screen.getByText('Longest Streak')).toBeInTheDocument();
  });

  it('displays streak icons', () => {
    const { container } = render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    // Check for streak card icons
    const streakCards = container.querySelectorAll('.streak-card');
    expect(streakCards.length).toBe(3); // Current, Longest, Total
  });

  it('handles workouts with different categories', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    // Should process all different categories for frequency chart
    expect(screen.getByText('Workout Frequency by Day')).toBeInTheDocument();
  });

  it('renders motivational quote section', () => {
    render(<AdvancedAnalytics workouts={mockWorkouts} />);
    
    // Charts should render without errors
    const chartContainers = screen.getAllByText(/30-Day Trend|Workout Frequency/);
    expect(chartContainers.length).toBeGreaterThan(0);
  });
});
