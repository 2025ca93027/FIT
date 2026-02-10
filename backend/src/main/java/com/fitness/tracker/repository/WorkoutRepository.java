package com.fitness.tracker.repository;

import com.fitness.tracker.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    
    List<Workout> findByCategory(String category);
    
    List<Workout> findByWorkoutDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT w FROM Workout w ORDER BY w.workoutDate DESC")
    List<Workout> findAllOrderByDateDesc();
    
    @Query("SELECT SUM(w.calories) FROM Workout w WHERE w.workoutDate BETWEEN :start AND :end")
    Integer sumCaloriesBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(w.duration) FROM Workout w WHERE w.workoutDate BETWEEN :start AND :end")
    Integer sumDurationBetween(LocalDateTime start, LocalDateTime end);
}
