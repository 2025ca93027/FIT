package com.fitness.tracker.service;

import com.fitness.tracker.model.Workout;
import com.fitness.tracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {
    
    @Autowired
    private WorkoutRepository workoutRepository;
    
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAllOrderByDateDesc();
    }
    
    public Optional<Workout> getWorkoutById(Long id) {
        return workoutRepository.findById(id);
    }
    
    public Workout createWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }
    
    public Workout updateWorkout(Long id, Workout workoutDetails) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found with id: " + id));
        
        workout.setExercise(workoutDetails.getExercise());
        workout.setDuration(workoutDetails.getDuration());
        workout.setCalories(workoutDetails.getCalories());
        workout.setCategory(workoutDetails.getCategory());
        workout.setIntensity(workoutDetails.getIntensity());
        workout.setNotes(workoutDetails.getNotes());
        workout.setWorkoutDate(workoutDetails.getWorkoutDate());
        
        return workoutRepository.save(workout);
    }
    
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }
    
    public List<Workout> getWorkoutsByCategory(String category) {
        return workoutRepository.findByCategory(category);
    }
    
    public List<Workout> getWorkoutsByDateRange(LocalDateTime start, LocalDateTime end) {
        return workoutRepository.findByWorkoutDateBetween(start, end);
    }
    
    public Integer getTotalCalories(LocalDateTime start, LocalDateTime end) {
        Integer total = workoutRepository.sumCaloriesBetween(start, end);
        return total != null ? total : 0;
    }
    
    public Integer getTotalDuration(LocalDateTime start, LocalDateTime end) {
        Integer total = workoutRepository.sumDurationBetween(start, end);
        return total != null ? total : 0;
    }
}
