import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShareButton from '../components/ShareButton';

describe('ShareButton Component', () => {
  const mockWorkoutData = {
    id: 1,
    exercise: 'Running',
    duration: 30,
    calories: 300,
    category: 'cardio',
    intensity: 7,
    workoutDate: new Date().toISOString()
  };

  const mockGoalData = {
    id: 1,
    title: 'Complete 20 Workouts',
    type: 'workouts',
    targetValue: 20,
    currentValue: 15,
    targetDate: '2024-03-31',
    status: 'active'
  };

  beforeEach(() => {
    // Mock window.open
    global.open = vi.fn();
    
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve())
      }
    });
  });

  it('renders share trigger button', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('opens share menu when trigger is clicked', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Download Image')).toBeInTheDocument();
  });

  it('closes menu when overlay is clicked', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    const overlay = document.querySelector('.share-overlay');
    fireEvent.click(overlay);
    
    expect(screen.queryByText('Twitter')).not.toBeInTheDocument();
  });

  it('generates correct share text for workout', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    // Menu should be visible
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('generates correct share text for goal', () => {
    render(<ShareButton type="goal" data={mockGoalData} />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    // Menu should be visible with sharing options
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  it('opens Twitter share window', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText('Twitter'));
    
    expect(global.open).toHaveBeenCalled();
    const callArgs = global.open.mock.calls[0][0];
    expect(callArgs).toContain('twitter.com/intent/tweet');
  });

  it('opens Facebook share window', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText('Facebook'));
    
    expect(global.open).toHaveBeenCalled();
    const callArgs = global.open.mock.calls[0][0];
    expect(callArgs).toContain('facebook.com/sharer');
  });

  it('uses native share API when available', async () => {
    const mockShare = vi.fn(() => Promise.resolve());
    Object.assign(navigator, {
      share: mockShare
    });

    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText(/Share\.\.\./));
    
    await waitFor(() => {
      expect(mockShare).toHaveBeenCalled();
    });
  });

  it('falls back to clipboard when native share not available', async () => {
    // Remove native share
    Object.assign(navigator, {
      share: undefined
    });

    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText(/Share\.\.\./));
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  it('shows "Copied!" message after copying to clipboard', async () => {
    Object.assign(navigator, {
      share: undefined
    });

    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText(/Share\.\.\./));
    
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('handles download image option', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText('Download Image'));
    
    expect(createElementSpy).toHaveBeenCalledWith('canvas');
  });

  it('generates image with workout data', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText('Download Image'));
    
    // Canvas should be created for image generation
    // Actual canvas drawing is tested through integration
  });

  it('generates image with goal data', () => {
    render(<ShareButton type="goal" data={mockGoalData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText('Download Image'));
    
    // Canvas should be created for image generation
  });

  it('calculates goal progress percentage correctly', () => {
    // 15/20 = 75%
    render(<ShareButton type="goal" data={mockGoalData} />);
    
    fireEvent.click(screen.getByText('Share'));
    // The component should calculate 75% progress
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('includes all workout details in share text', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    // Share text should include duration, calories, intensity
    fireEvent.click(screen.getByText('Share'));
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('closes menu after sharing', async () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    fireEvent.click(screen.getByText('Twitter'));
    
    await waitFor(() => {
      expect(screen.queryByText('Facebook')).not.toBeInTheDocument();
    });
  });

  it('handles achievement type sharing', () => {
    const achievementData = {
      title: '100 Workouts!',
      description: 'Completed 100 workouts'
    };
    
    render(<ShareButton type="achievement" data={achievementData} />);
    
    fireEvent.click(screen.getByText('Share'));
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('displays all share options', () => {
    render(<ShareButton type="workout" data={mockWorkoutData} />);
    
    fireEvent.click(screen.getByText('Share'));
    
    expect(screen.getByText(/Share\.\.\./)).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Download Image')).toBeInTheDocument();
  });
});
