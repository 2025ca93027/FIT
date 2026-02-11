package com.fitness.tracker.service;

import com.fitness.tracker.model.Workout;
import com.fitness.tracker.repository.WorkoutRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("Workout Service Tests")
class WorkoutServiceTest {

    @Mock
    private WorkoutRepository workoutRepository;

    @InjectMocks
    private WorkoutService workoutService;

    private Workout testWorkout;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testWorkout = new Workout();
        testWorkout.setId(1L);
        testWorkout.setExercise("Morning Run");
        testWorkout.setDuration(30);
        testWorkout.setCalories(300);
        testWorkout.setCategory("cardio");
        testWorkout.setIntensity(7);
        testWorkout.setNotes("Felt great!");
        testWorkout.setWorkoutDate(LocalDateTime.now());
        testWorkout.setCreatedAt(LocalDateTime.now());
    }

    @Test
    @DisplayName("Should get all workouts successfully")
    void testGetAllWorkouts() {
        // Arrange
        List<Workout> workouts = Arrays.asList(testWorkout);
        when(workoutRepository.findAllOrderByDateDesc()).thenReturn(workouts);

        // Act
        List<Workout> result = workoutService.getAllWorkouts();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Morning Run", result.get(0).getExercise());
        verify(workoutRepository, times(1)).findAllOrderByDateDesc();
    }

    @Test
    @DisplayName("Should get workout by ID successfully")
    void testGetWorkoutById() {
        // Arrange
        when(workoutRepository.findById(1L)).thenReturn(Optional.of(testWorkout));

        // Act
        Optional<Workout> result = workoutService.getWorkoutById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Morning Run", result.get().getExercise());
        verify(workoutRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Should return empty when workout not found")
    void testGetWorkoutByIdNotFound() {
        // Arrange
        when(workoutRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<Workout> result = workoutService.getWorkoutById(999L);

        // Assert
        assertFalse(result.isPresent());
        verify(workoutRepository, times(1)).findById(999L);
    }

    @Test
    @DisplayName("Should create workout successfully")
    void testCreateWorkout() {
        // Arrange
        when(workoutRepository.save(any(Workout.class))).thenReturn(testWorkout);

        // Act
        Workout result = workoutService.createWorkout(testWorkout);

        // Assert
        assertNotNull(result);
        assertEquals("Morning Run", result.getExercise());
        assertEquals(300, result.getCalories());
        verify(workoutRepository, times(1)).save(testWorkout);
    }

    @Test
    @DisplayName("Should update workout successfully")
    void testUpdateWorkout() {
        // Arrange
        Workout updatedWorkout = new Workout();
        updatedWorkout.setExercise("Evening Run");
        updatedWorkout.setDuration(45);
        updatedWorkout.setCalories(450);
        updatedWorkout.setCategory("cardio");
        updatedWorkout.setIntensity(8);
        updatedWorkout.setWorkoutDate(LocalDateTime.now());

        when(workoutRepository.findById(1L)).thenReturn(Optional.of(testWorkout));
        when(workoutRepository.save(any(Workout.class))).thenReturn(updatedWorkout);

        // Act
        Workout result = workoutService.updateWorkout(1L, updatedWorkout);

        // Assert
        assertNotNull(result);
        assertEquals("Evening Run", result.getExercise());
        assertEquals(450, result.getCalories());
        verify(workoutRepository, times(1)).findById(1L);
        verify(workoutRepository, times(1)).save(any(Workout.class));
    }

    @Test
    @DisplayName("Should throw exception when updating non-existent workout")
    void testUpdateWorkoutNotFound() {
        // Arrange
        when(workoutRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            workoutService.updateWorkout(999L, testWorkout);
        });
        verify(workoutRepository, times(1)).findById(999L);
        verify(workoutRepository, never()).save(any(Workout.class));
    }

    @Test
    @DisplayName("Should delete workout successfully")
    void testDeleteWorkout() {
        // Arrange
        doNothing().when(workoutRepository).deleteById(1L);

        // Act
        workoutService.deleteWorkout(1L);

        // Assert
        verify(workoutRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Should get workouts by category")
    void testGetWorkoutsByCategory() {
        // Arrange
        List<Workout> cardioWorkouts = Arrays.asList(testWorkout);
        when(workoutRepository.findByCategory("cardio")).thenReturn(cardioWorkouts);

        // Act
        List<Workout> result = workoutService.getWorkoutsByCategory("cardio");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("cardio", result.get(0).getCategory());
        verify(workoutRepository, times(1)).findByCategory("cardio");
    }

    @Test
    @DisplayName("Should get workouts by date range")
    void testGetWorkoutsByDateRange() {
        // Arrange
        LocalDateTime start = LocalDateTime.now().minusDays(7);
        LocalDateTime end = LocalDateTime.now();
        List<Workout> workouts = Arrays.asList(testWorkout);
        
        when(workoutRepository.findByWorkoutDateBetween(start, end)).thenReturn(workouts);

        // Act
        List<Workout> result = workoutService.getWorkoutsByDateRange(start, end);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(workoutRepository, times(1)).findByWorkoutDateBetween(start, end);
    }

    @Test
    @DisplayName("Should calculate total calories correctly")
    void testGetTotalCalories() {
        // Arrange
        LocalDateTime start = LocalDateTime.now().minusDays(7);
        LocalDateTime end = LocalDateTime.now();
        when(workoutRepository.sumCaloriesBetween(start, end)).thenReturn(1500);

        // Act
        Integer result = workoutService.getTotalCalories(start, end);

        // Assert
        assertEquals(1500, result);
        verify(workoutRepository, times(1)).sumCaloriesBetween(start, end);
    }

    @Test
    @DisplayName("Should return 0 when no calories found")
    void testGetTotalCaloriesWhenNull() {
        // Arrange
        LocalDateTime start = LocalDateTime.now().minusDays(7);
        LocalDateTime end = LocalDateTime.now();
        when(workoutRepository.sumCaloriesBetween(start, end)).thenReturn(null);

        // Act
        Integer result = workoutService.getTotalCalories(start, end);

        // Assert
        assertEquals(0, result);
        verify(workoutRepository, times(1)).sumCaloriesBetween(start, end);
    }

    @Test
    @DisplayName("Should calculate total duration correctly")
    void testGetTotalDuration() {
        // Arrange
        LocalDateTime start = LocalDateTime.now().minusDays(7);
        LocalDateTime end = LocalDateTime.now();
        when(workoutRepository.sumDurationBetween(start, end)).thenReturn(180);

        // Act
        Integer result = workoutService.getTotalDuration(start, end);

        // Assert
        assertEquals(180, result);
        verify(workoutRepository, times(1)).sumDurationBetween(start, end);
    }

    @Test
    @DisplayName("Should return 0 when no duration found")
    void testGetTotalDurationWhenNull() {
        // Arrange
        LocalDateTime start = LocalDateTime.now().minusDays(7);
        LocalDateTime end = LocalDateTime.now();
        when(workoutRepository.sumDurationBetween(start, end)).thenReturn(null);

        // Act
        Integer result = workoutService.getTotalDuration(start, end);

        // Assert
        assertEquals(0, result);
        verify(workoutRepository, times(1)).sumDurationBetween(start, end);
    }
}
