package com.fitness.tracker.repository;

import com.fitness.tracker.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    
    List<Goal> findByStatus(String status);
    
    List<Goal> findByType(String type);
    
    List<Goal> findByStatusOrderByTargetDateAsc(String status);
}
