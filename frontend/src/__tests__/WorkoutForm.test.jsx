import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkoutForm from '../components/WorkoutForm';

describe('WorkoutForm Component', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders the form with all fields', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/exercise name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/calories/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/intensity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
  });

  it('displays "Add New Workout" title when no workout is provided', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByText('Add New Workout')).toBeInTheDocument();
  });

  it('displays "Edit Workout" title when workout is provided', () => {
    const workout = {
      id: 1,
      exercise: 'Running',
      duration: 30,
      calories: 300,
      category: 'cardio',
      intensity: 7,
      notes: 'Good run',
      workoutDate: new Date().toISOString()
    };

    render(<WorkoutForm workout={workout} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByText('Edit Workout')).toBeInTheDocument();
  });

  it('populates form fields when workout is provided', () => {
    const workout = {
      id: 1,
      exercise: 'Running',
      duration: 30,
      calories: 300,
      category: 'cardio',
      intensity: 7,
      notes: 'Good run',
      workoutDate: '2024-02-09T10:00:00'
    };

    render(<WorkoutForm workout={workout} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByDisplayValue('Running')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
    expect(screen.getByDisplayValue('300')).toBeInTheDocument();
    expect(screen.getByDisplayValue('7')).toBeInTheDocument();
  });

  it('validates required fields before submission', async () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const submitButton = screen.getByText(/save workout/i);
    fireEvent.click(submitButton);

    // Form should not submit if required fields are empty
    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('submits form with correct data', async () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/exercise name/i), {
      target: { value: 'Morning Run' }
    });
    fireEvent.change(screen.getByLabelText(/duration/i), {
      target: { value: '30' }
    });
    fireEvent.change(screen.getByLabelText(/calories/i), {
      target: { value: '300' }
    });
    fireEvent.change(screen.getByLabelText(/intensity/i), {
      target: { value: '7' }
    });

    // Submit the form
    const submitButton = screen.getByText(/save workout/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          exercise: 'Morning Run',
          duration: 30,
          calories: 300,
          intensity: 7
        })
      );
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('updates intensity indicator when intensity value changes', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const intensityInput = screen.getByLabelText(/intensity/i);
    
    // Change intensity to 8
    fireEvent.change(intensityInput, { target: { value: '8' } });

    // Check if the value is updated
    expect(intensityInput).toHaveValue(8);
  });

  it('allows selecting different workout categories', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const categorySelect = screen.getByLabelText(/category/i);
    
    fireEvent.change(categorySelect, { target: { value: 'strength' } });
    expect(categorySelect).toHaveValue('strength');

    fireEvent.change(categorySelect, { target: { value: 'flexibility' } });
    expect(categorySelect).toHaveValue('flexibility');
  });

  it('enforces minimum values for duration and calories', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const durationInput = screen.getByLabelText(/duration/i);
    const caloriesInput = screen.getByLabelText(/calories/i);

    expect(durationInput).toHaveAttribute('min', '1');
    expect(caloriesInput).toHaveAttribute('min', '0');
  });

  it('enforces intensity range between 1 and 10', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const intensityInput = screen.getByLabelText(/intensity/i);

    expect(intensityInput).toHaveAttribute('min', '1');
    expect(intensityInput).toHaveAttribute('max', '10');
  });
});
