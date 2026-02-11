package com.fitness.tracker.service;

import com.fitness.tracker.model.Goal;
import com.fitness.tracker.repository.GoalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("Goal Service Tests")
class GoalServiceTest {

    @Mock
    private GoalRepository goalRepository;

    @InjectMocks
    private GoalService goalService;

    private Goal testGoal;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testGoal = new Goal();
        testGoal.setId(1L);
        testGoal.setTitle("Complete 20 Workouts");
        testGoal.setType("workouts");
        testGoal.setTargetValue(20);
        testGoal.setCurrentValue(10);
        testGoal.setTargetDate(LocalDate.now().plusMonths(1));
        testGoal.setStatus("active");
        testGoal.setCreatedAt(LocalDateTime.now());
        testGoal.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    @DisplayName("Should get all goals successfully")
    void testGetAllGoals() {
        // Arrange
        List<Goal> goals = Arrays.asList(testGoal);
        when(goalRepository.findAll()).thenReturn(goals);

        // Act
        List<Goal> result = goalService.getAllGoals();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Complete 20 Workouts", result.get(0).getTitle());
        verify(goalRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should get goal by ID successfully")
    void testGetGoalById() {
        // Arrange
        when(goalRepository.findById(1L)).thenReturn(Optional.of(testGoal));

        // Act
        Optional<Goal> result = goalService.getGoalById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Complete 20 Workouts", result.get().getTitle());
        verify(goalRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Should create goal successfully")
    void testCreateGoal() {
        // Arrange
        when(goalRepository.save(any(Goal.class))).thenReturn(testGoal);

        // Act
        Goal result = goalService.createGoal(testGoal);

        // Assert
        assertNotNull(result);
        assertEquals("Complete 20 Workouts", result.getTitle());
        assertEquals(20, result.getTargetValue());
        verify(goalRepository, times(1)).save(testGoal);
    }

    @Test
    @DisplayName("Should update goal successfully")
    void testUpdateGoal() {
        // Arrange
        Goal updatedGoal = new Goal();
        updatedGoal.setTitle("Complete 20 Workouts");
        updatedGoal.setType("workouts");
        updatedGoal.setTargetValue(20);
        updatedGoal.setCurrentValue(15);
        updatedGoal.setTargetDate(LocalDate.now().plusMonths(1));
        updatedGoal.setStatus("active");

        when(goalRepository.findById(1L)).thenReturn(Optional.of(testGoal));
        when(goalRepository.save(any(Goal.class))).thenReturn(updatedGoal);

        // Act
        Goal result = goalService.updateGoal(1L, updatedGoal);

        // Assert
        assertNotNull(result);
        assertEquals(15, result.getCurrentValue());
        verify(goalRepository, times(1)).findById(1L);
        verify(goalRepository, times(1)).save(any(Goal.class));
    }

    @Test
    @DisplayName("Should auto-complete goal when target reached")
    void testAutoCompleteGoal() {
        // Arrange
        Goal completedGoal = new Goal();
        completedGoal.setTitle("Complete 20 Workouts");
        completedGoal.setType("workouts");
        completedGoal.setTargetValue(20);
        completedGoal.setCurrentValue(20); // Reached target
        completedGoal.setTargetDate(LocalDate.now().plusMonths(1));
        completedGoal.setStatus("active");

        when(goalRepository.findById(1L)).thenReturn(Optional.of(testGoal));
        when(goalRepository.save(any(Goal.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        Goal result = goalService.updateGoal(1L, completedGoal);

        // Assert
        assertEquals("completed", result.getStatus());
        verify(goalRepository, times(1)).save(any(Goal.class));
    }

    @Test
    @DisplayName("Should auto-fail goal when past target date")
    void testAutoFailGoal() {
        // Arrange
        Goal expiredGoal = new Goal();
        expiredGoal.setTitle("Complete 20 Workouts");
        expiredGoal.setType("workouts");
        expiredGoal.setTargetValue(20);
        expiredGoal.setCurrentValue(10);
        expiredGoal.setTargetDate(LocalDate.now().minusDays(1)); // Past date
        expiredGoal.setStatus("active");

        when(goalRepository.findById(1L)).thenReturn(Optional.of(testGoal));
        when(goalRepository.save(any(Goal.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        Goal result = goalService.updateGoal(1L, expiredGoal);

        // Assert
        assertEquals("failed", result.getStatus());
        verify(goalRepository, times(1)).save(any(Goal.class));
    }

    @Test
    @DisplayName("Should throw exception when updating non-existent goal")
    void testUpdateGoalNotFound() {
        // Arrange
        when(goalRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            goalService.updateGoal(999L, testGoal);
        });
        verify(goalRepository, times(1)).findById(999L);
        verify(goalRepository, never()).save(any(Goal.class));
    }

    @Test
    @DisplayName("Should delete goal successfully")
    void testDeleteGoal() {
        // Arrange
        doNothing().when(goalRepository).deleteById(1L);

        // Act
        goalService.deleteGoal(1L);

        // Assert
        verify(goalRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Should get active goals")
    void testGetActiveGoals() {
        // Arrange
        List<Goal> activeGoals = Arrays.asList(testGoal);
        when(goalRepository.findByStatusOrderByTargetDateAsc("active")).thenReturn(activeGoals);

        // Act
        List<Goal> result = goalService.getActiveGoals();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("active", result.get(0).getStatus());
        verify(goalRepository, times(1)).findByStatusOrderByTargetDateAsc("active");
    }

    @Test
    @DisplayName("Should get goals by status")
    void testGetGoalsByStatus() {
        // Arrange
        List<Goal> completedGoals = Arrays.asList(testGoal);
        when(goalRepository.findByStatus("completed")).thenReturn(completedGoals);

        // Act
        List<Goal> result = goalService.getGoalsByStatus("completed");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(goalRepository, times(1)).findByStatus("completed");
    }
}
