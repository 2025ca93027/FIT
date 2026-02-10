# 🧪 API Testing Guide

Test your Fitness Tracker API using cURL, Postman, or your browser.

## Base URL

```
http://localhost:8080/api
```

## Workout API Examples

### 1. Create a Workout

```bash
curl -X POST http://localhost:8080/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "Morning Run",
    "duration": 30,
    "calories": 300,
    "category": "cardio",
    "intensity": 7,
    "notes": "Felt great! Beautiful weather.",
    "workoutDate": "2024-02-09T08:00:00"
  }'
```

### 2. Get All Workouts

```bash
curl http://localhost:8080/api/workouts
```

### 3. Get Workout by ID

```bash
curl http://localhost:8080/api/workouts/1
```

### 4. Update a Workout

```bash
curl -X PUT http://localhost:8080/api/workouts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "Evening Run",
    "duration": 45,
    "calories": 450,
    "category": "cardio",
    "intensity": 8,
    "notes": "Increased distance today!",
    "workoutDate": "2024-02-09T18:00:00"
  }'
```

### 5. Delete a Workout

```bash
curl -X DELETE http://localhost:8080/api/workouts/1
```

### 6. Get Workouts by Category

```bash
curl http://localhost:8080/api/workouts/category/cardio
```

### 7. Get Workout Statistics

```bash
curl "http://localhost:8080/api/workouts/stats?start=2024-02-01T00:00:00&end=2024-02-09T23:59:59"
```

## Goal API Examples

### 1. Create a Goal

```bash
curl -X POST http://localhost:8080/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete 20 Workouts This Month",
    "type": "workouts",
    "targetValue": 20,
    "currentValue": 5,
    "targetDate": "2024-02-29",
    "status": "active"
  }'
```

### 2. Get All Goals

```bash
curl http://localhost:8080/api/goals
```

### 3. Get Goal by ID

```bash
curl http://localhost:8080/api/goals/1
```

### 4. Update a Goal

```bash
curl -X PUT http://localhost:8080/api/goals/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete 20 Workouts This Month",
    "type": "workouts",
    "targetValue": 20,
    "currentValue": 12,
    "targetDate": "2024-02-29",
    "status": "active"
  }'
```

### 5. Delete a Goal

```bash
curl -X DELETE http://localhost:8080/api/goals/1
```

### 6. Get Active Goals

```bash
curl http://localhost:8080/api/goals/active
```

### 7. Get Goals by Status

```bash
curl http://localhost:8080/api/goals/status/completed
```

## Sample Data for Testing

### Multiple Workouts

```bash
# Cardio Workout
curl -X POST http://localhost:8080/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "Cycling",
    "duration": 60,
    "calories": 500,
    "category": "cardio",
    "intensity": 6,
    "workoutDate": "2024-02-08T10:00:00"
  }'

# Strength Workout
curl -X POST http://localhost:8080/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "Bench Press",
    "duration": 45,
    "calories": 250,
    "category": "strength",
    "intensity": 8,
    "workoutDate": "2024-02-07T16:00:00"
  }'

# Flexibility Workout
curl -X POST http://localhost:8080/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "Yoga Session",
    "duration": 50,
    "calories": 200,
    "category": "flexibility",
    "intensity": 5,
    "workoutDate": "2024-02-06T08:00:00"
  }'

# Sports Workout
curl -X POST http://localhost:8080/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "Basketball Game",
    "duration": 90,
    "calories": 600,
    "category": "sports",
    "intensity": 9,
    "workoutDate": "2024-02-05T18:00:00"
  }'
```

### Multiple Goals

```bash
# Weight Goal
curl -X POST http://localhost:8080/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lose 10 Pounds",
    "type": "weight",
    "targetValue": 10,
    "currentValue": 3,
    "targetDate": "2024-03-31",
    "status": "active"
  }'

# Steps Goal
curl -X POST http://localhost:8080/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Walk 10,000 Steps Daily",
    "type": "steps",
    "targetValue": 10000,
    "currentValue": 7500,
    "targetDate": "2024-02-29",
    "status": "active"
  }'

# Calories Goal
curl -X POST http://localhost:8080/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Burn 5000 Calories This Week",
    "type": "calories",
    "targetValue": 5000,
    "currentValue": 2800,
    "targetDate": "2024-02-15",
    "status": "active"
  }'
```

## Postman Collection

Import this JSON into Postman for easier testing:

```json
{
  "info": {
    "name": "Fitness Tracker API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Workouts",
      "item": [
        {
          "name": "Get All Workouts",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/api/workouts"
          }
        },
        {
          "name": "Create Workout",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"exercise\": \"Morning Run\",\n  \"duration\": 30,\n  \"calories\": 300,\n  \"category\": \"cardio\",\n  \"intensity\": 7,\n  \"workoutDate\": \"2024-02-09T08:00:00\"\n}"
            },
            "url": "http://localhost:8080/api/workouts"
          }
        }
      ]
    },
    {
      "name": "Goals",
      "item": [
        {
          "name": "Get All Goals",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/api/goals"
          }
        },
        {
          "name": "Create Goal",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Complete 20 Workouts\",\n  \"type\": \"workouts\",\n  \"targetValue\": 20,\n  \"currentValue\": 5,\n  \"targetDate\": \"2024-02-29\",\n  \"status\": \"active\"\n}"
            },
            "url": "http://localhost:8080/api/goals"
          }
        }
      ]
    }
  ]
}
```

## Response Examples

### Successful Workout Creation (201 Created)

```json
{
  "id": 1,
  "exercise": "Morning Run",
  "duration": 30,
  "calories": 300,
  "category": "cardio",
  "intensity": 7,
  "notes": "Felt great! Beautiful weather.",
  "workoutDate": "2024-02-09T08:00:00",
  "createdAt": "2024-02-09T10:30:00"
}
```

### Successful Goal Creation (201 Created)

```json
{
  "id": 1,
  "title": "Complete 20 Workouts This Month",
  "type": "workouts",
  "targetValue": 20,
  "currentValue": 5,
  "targetDate": "2024-02-29",
  "status": "active",
  "createdAt": "2024-02-09T10:30:00",
  "updatedAt": "2024-02-09T10:30:00"
}
```

### Error Response (400 Bad Request)

```json
{
  "timestamp": "2024-02-09T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/workouts"
}
```

## Testing Workflow

1. **Create Sample Data**: Use the multiple workouts/goals examples
2. **Test Retrieval**: Get all workouts and goals
3. **Test Updates**: Modify existing records
4. **Test Statistics**: Check the stats endpoint with date ranges
5. **Test Deletion**: Clean up test data
6. **Test Validation**: Try creating invalid data to test error handling

## Validation Rules

### Workouts
- `exercise`: Required, not blank
- `duration`: Required, minimum 1 minute
- `calories`: Required, minimum 0
- `category`: Required (cardio, strength, flexibility, sports)
- `intensity`: Required, 1-10
- `workoutDate`: Required

### Goals
- `title`: Required, not blank
- `type`: Required (weight, steps, workouts, calories)
- `targetValue`: Required, minimum 1
- `currentValue`: Required, minimum 0
- `targetDate`: Required
- `status`: Required (active, completed, failed)

---

**Happy Testing! 🧪✅**
