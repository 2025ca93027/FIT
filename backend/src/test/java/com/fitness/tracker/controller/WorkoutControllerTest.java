package com.fitness.tracker.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.tracker.model.Workout;
import com.fitness.tracker.service.WorkoutService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@WebMvcTest(WorkoutController.class)
@DisplayName("Workout Controller Integration Tests")
class WorkoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private WorkoutService workoutService;

    private Workout testWorkout;

    @BeforeEach
    void setUp() {
        testWorkout = new Workout();
        testWorkout.setId(1L);
        testWorkout.setExercise("Morning Run");
        testWorkout.setDuration(30);
        testWorkout.setCalories(300);
        testWorkout.setCategory("cardio");
        testWorkout.setIntensity(7);
        testWorkout.setNotes("Felt great!");
        testWorkout.setWorkoutDate(LocalDateTime.now());
    }

    @Test
    @DisplayName("GET /api/workouts - Should return all workouts")
    void testGetAllWorkouts() throws Exception {
        // Arrange
        when(workoutService.getAllWorkouts()).thenReturn(Arrays.asList(testWorkout));

        // Act & Assert
        mockMvc.perform(get("/api/workouts"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].exercise", is("Morning Run")))
                .andExpect(jsonPath("$[0].calories", is(300)));

        verify(workoutService, times(1)).getAllWorkouts();
    }

    @Test
    @DisplayName("GET /api/workouts/{id} - Should return workout by ID")
    void testGetWorkoutById() throws Exception {
        // Arrange
        when(workoutService.getWorkoutById(1L)).thenReturn(Optional.of(testWorkout));

        // Act & Assert
        mockMvc.perform(get("/api/workouts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exercise", is("Morning Run")))
                .andExpect(jsonPath("$.duration", is(30)))
                .andExpect(jsonPath("$.intensity", is(7)));

        verify(workoutService, times(1)).getWorkoutById(1L);
    }

    @Test
    @DisplayName("GET /api/workouts/{id} - Should return 404 when not found")
    void testGetWorkoutByIdNotFound() throws Exception {
        // Arrange
        when(workoutService.getWorkoutById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/workouts/999"))
                .andExpect(status().isNotFound());

        verify(workoutService, times(1)).getWorkoutById(999L);
    }

    @Test
    @DisplayName("POST /api/workouts - Should create new workout")
    void testCreateWorkout() throws Exception {
        // Arrange
        when(workoutService.createWorkout(any(Workout.class))).thenReturn(testWorkout);

        // Act & Assert
        mockMvc.perform(post("/api/workouts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testWorkout)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.exercise", is("Morning Run")))
                .andExpect(jsonPath("$.calories", is(300)));

        verify(workoutService, times(1)).createWorkout(any(Workout.class));
    }

    @Test
    @DisplayName("POST /api/workouts - Should validate required fields")
    void testCreateWorkoutValidation() throws Exception {
        // Arrange - Invalid workout (missing required fields)
        Workout invalidWorkout = new Workout();
        invalidWorkout.setExercise(""); // Empty exercise
        invalidWorkout.setDuration(0); // Invalid duration

        // Act & Assert
        mockMvc.perform(post("/api/workouts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidWorkout)))
                .andExpect(status().isBadRequest());

        verify(workoutService, never()).createWorkout(any(Workout.class));
    }

    @Test
    @DisplayName("PUT /api/workouts/{id} - Should update workout")
    void testUpdateWorkout() throws Exception {
        // Arrange
        Workout updatedWorkout = new Workout();
        updatedWorkout.setExercise("Evening Run");
        updatedWorkout.setDuration(45);
        updatedWorkout.setCalories(450);
        updatedWorkout.setCategory("cardio");
        updatedWorkout.setIntensity(8);
        updatedWorkout.setWorkoutDate(LocalDateTime.now());

        when(workoutService.updateWorkout(eq(1L), any(Workout.class))).thenReturn(updatedWorkout);

        // Act & Assert
        mockMvc.perform(put("/api/workouts/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedWorkout)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exercise", is("Evening Run")))
                .andExpect(jsonPath("$.calories", is(450)));

        verify(workoutService, times(1)).updateWorkout(eq(1L), any(Workout.class));
    }

    @Test
    @DisplayName("PUT /api/workouts/{id} - Should return 404 when updating non-existent workout")
    void testUpdateWorkoutNotFound() throws Exception {
        // Arrange
        when(workoutService.updateWorkout(eq(999L), any(Workout.class)))
                .thenThrow(new RuntimeException("Workout not found"));

        // Act & Assert
        mockMvc.perform(put("/api/workouts/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testWorkout)))
                .andExpect(status().isNotFound());

        verify(workoutService, times(1)).updateWorkout(eq(999L), any(Workout.class));
    }

    @Test
    @DisplayName("DELETE /api/workouts/{id} - Should delete workout")
    void testDeleteWorkout() throws Exception {
        // Arrange
        doNothing().when(workoutService).deleteWorkout(1L);

        // Act & Assert
        mockMvc.perform(delete("/api/workouts/1"))
                .andExpect(status().isNoContent());

        verify(workoutService, times(1)).deleteWorkout(1L);
    }

    @Test
    @DisplayName("GET /api/workouts/category/{category} - Should return workouts by category")
    void testGetWorkoutsByCategory() throws Exception {
        // Arrange
        when(workoutService.getWorkoutsByCategory("cardio"))
                .thenReturn(Arrays.asList(testWorkout));

        // Act & Assert
        mockMvc.perform(get("/api/workouts/category/cardio"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].category", is("cardio")));

        verify(workoutService, times(1)).getWorkoutsByCategory("cardio");
    }
}
