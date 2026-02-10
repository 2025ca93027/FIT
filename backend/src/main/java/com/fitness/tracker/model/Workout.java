package com.fitness.tracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Exercise name is required")
    @Column(nullable = false)
    private String exercise;
    
    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1 minute")
    private Integer duration; // in minutes
    
    @NotNull(message = "Calories burned is required")
    @Min(value = 0, message = "Calories must be non-negative")
    private Integer calories;
    
    @NotBlank(message = "Category is required")
    private String category; // cardio, strength, flexibility, sports
    
    @NotNull(message = "Intensity is required")
    @Min(value = 1, message = "Intensity must be between 1 and 10")
    @Max(value = 10, message = "Intensity must be between 1 and 10")
    private Integer intensity;
    
    private String notes;
    
    @Column(name = "workout_date", nullable = false)
    private LocalDateTime workoutDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (workoutDate == null) {
            workoutDate = LocalDateTime.now();
        }
    }
}
