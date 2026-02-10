package com.fitness.tracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "goals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Goal title is required")
    @Column(nullable = false)
    private String title;
    
    @NotBlank(message = "Goal type is required")
    private String type; // weight, steps, workouts, calories
    
    @NotNull(message = "Target value is required")
    @Min(value = 1, message = "Target must be positive")
    private Integer targetValue;
    
    @NotNull(message = "Current value is required")
    @Min(value = 0, message = "Current value must be non-negative")
    private Integer currentValue;
    
    @NotNull(message = "Target date is required")
    private LocalDate targetDate;
    
    @NotBlank(message = "Status is required")
    private String status; // active, completed, failed
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = "active";
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
