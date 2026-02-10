package com.fitness.tracker.service;

import com.fitness.tracker.model.Goal;
import com.fitness.tracker.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class GoalService {
    
    @Autowired
    private GoalRepository goalRepository;
    
    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }
    
    public Optional<Goal> getGoalById(Long id) {
        return goalRepository.findById(id);
    }
    
    public Goal createGoal(Goal goal) {
        return goalRepository.save(goal);
    }
    
    public Goal updateGoal(Long id, Goal goalDetails) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found with id: " + id));
        
        goal.setTitle(goalDetails.getTitle());
        goal.setType(goalDetails.getType());
        goal.setTargetValue(goalDetails.getTargetValue());
        goal.setCurrentValue(goalDetails.getCurrentValue());
        goal.setTargetDate(goalDetails.getTargetDate());
        goal.setStatus(goalDetails.getStatus());
        
        // Auto-update status based on completion
        if (goal.getCurrentValue() >= goal.getTargetValue()) {
            goal.setStatus("completed");
        } else if (goal.getTargetDate().isBefore(LocalDate.now())) {
            goal.setStatus("failed");
        }
        
        return goalRepository.save(goal);
    }
    
    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
    
    public List<Goal> getActiveGoals() {
        return goalRepository.findByStatusOrderByTargetDateAsc("active");
    }
    
    public List<Goal> getGoalsByStatus(String status) {
        return goalRepository.findByStatus(status);
    }
}
