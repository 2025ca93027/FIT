# Manual Test Cases - Fitness Tracker Application

## Test Environment
- **Backend URL**: http://localhost:8080
- **Frontend URL**: http://localhost:3000
- **Database**: H2 in-memory
- **Browser**: Chrome, Firefox, Safari, Edge

---

## Test Case 1: Create New Workout

**Test ID**: TC-001  
**Priority**: High  
**Module**: Workout Management

### Preconditions
- Application is running
- User is on the Workouts page

### Test Steps
1. Click "Add Workout" button
2. Fill in the form:
   - Exercise Name: "Morning Run"
   - Duration: 30
   - Calories: 300
   - Category: Cardio
   - Intensity: 7
   - Notes: "Felt great today"
   - Date/Time: Current date and time
3. Click "Save Workout"

### Expected Results
- ✅ Modal closes
- ✅ New workout appears in the workout list
- ✅ Workout card shows all entered information
- ✅ Dashboard stats update with new workout data

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 2: Edit Existing Workout

**Test ID**: TC-002  
**Priority**: High  
**Module**: Workout Management

### Preconditions
- At least one workout exists in the system

### Test Steps
1. Click the Edit icon on any workout card
2. Modify the exercise name to "Evening Run"
3. Change duration to 45 minutes
4. Change calories to 450
5. Click "Update Workout"

### Expected Results
- ✅ Modal closes
- ✅ Workout card updates with new information
- ✅ Stats recalculate correctly
- ✅ No duplicate workouts created

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 3: Delete Workout

**Test ID**: TC-003  
**Priority**: High  
**Module**: Workout Management

### Preconditions
- At least one workout exists in the system

### Test Steps
1. Click the Delete icon on a workout card
2. (Optional) Confirm deletion if prompted

### Expected Results
- ✅ Workout is removed from the list
- ✅ Dashboard stats update accordingly
- ✅ Total workout count decreases by 1

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 4: Form Validation - Empty Fields

**Test ID**: TC-004  
**Priority**: High  
**Module**: Workout Management

### Preconditions
- User is on Add Workout form

### Test Steps
1. Click "Add Workout" button
2. Leave all fields empty
3. Click "Save Workout"

### Expected Results
- ✅ Form does not submit
- ✅ Required field validation messages appear
- ✅ Fields are highlighted in red
- ✅ User remains on the form

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 5: Form Validation - Invalid Values

**Test ID**: TC-005  
**Priority**: Medium  
**Module**: Workout Management

### Preconditions
- User is on Add Workout form

### Test Steps
1. Click "Add Workout" button
2. Enter:
   - Exercise Name: "Test"
   - Duration: 0 (or negative)
   - Calories: -100
   - Intensity: 15 (exceeds max of 10)
3. Click "Save Workout"

### Expected Results
- ✅ Form validates constraints
- ✅ Error messages for invalid values
- ✅ Duration minimum is 1 minute
- ✅ Calories minimum is 0
- ✅ Intensity range is 1-10

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 6: Create New Goal

**Test ID**: TC-006  
**Priority**: High  
**Module**: Goal Management

### Preconditions
- User is on the Goals page

### Test Steps
1. Click "Add Goal" button
2. Fill in the form:
   - Title: "Complete 20 Workouts"
   - Type: Workouts
   - Current Value: 5
   - Target Value: 20
   - Target Date: 30 days from today
3. Click "Create Goal"

### Expected Results
- ✅ Modal closes
- ✅ Goal appears in goals list
- ✅ Progress bar shows 25% (5/20)
- ✅ Status shows "Active"
- ✅ Days remaining calculated correctly

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 7: Update Goal Progress

**Test ID**: TC-007  
**Priority**: High  
**Module**: Goal Management

### Preconditions
- At least one active goal exists

### Test Steps
1. Click Edit on an active goal
2. Increase current value closer to target
3. Click "Update Goal"

### Expected Results
- ✅ Progress bar updates
- ✅ Percentage recalculates
- ✅ If target reached, status changes to "Completed"

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 8: Dashboard Statistics Display

**Test ID**: TC-008  
**Priority**: High  
**Module**: Dashboard

### Preconditions
- Multiple workouts added in the last 7 days
- At least 2 active goals

### Test Steps
1. Navigate to Dashboard tab
2. Verify statistics cards display

### Expected Results
- ✅ "Calories Burned" shows sum of last 7 days
- ✅ "Total Duration" shows sum of last 7 days
- ✅ "Workouts" shows count of last 7 days
- ✅ "Active Goals" shows correct count
- ✅ Weekly chart displays correctly
- ✅ Category pie chart shows distribution

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 9: Filter Workouts by Category

**Test ID**: TC-009  
**Priority**: Medium  
**Module**: Workout Management

### Preconditions
- Workouts of different categories exist

### Test Steps
1. Navigate to Workouts page
2. Observe different workout categories (Cardio, Strength, Flexibility, Sports)

### Expected Results
- ✅ Each workout shows correct category icon
- ✅ Category badges are color-coded
- ✅ All categories can be distinguished

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 10: Responsive Design - Mobile View

**Test ID**: TC-010  
**Priority**: Medium  
**Module**: UI/UX

### Preconditions
- Application is running

### Test Steps
1. Open application in mobile device or browser dev tools (375px width)
2. Navigate through all pages
3. Test all forms and buttons

### Expected Results
- ✅ Layout adapts to mobile screen
- ✅ Navigation is accessible
- ✅ Forms are usable
- ✅ Buttons are touch-friendly
- ✅ No horizontal scrolling
- ✅ Text is readable

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 11: Intensity Indicator Visualization

**Test ID**: TC-011  
**Priority**: Low  
**Module**: Workout Management

### Preconditions
- User is on Add/Edit Workout form

### Test Steps
1. Open workout form
2. Adjust intensity slider from 1 to 10
3. Observe intensity indicator bars

### Expected Results
- ✅ Bars fill according to intensity value
- ✅ Color changes based on intensity:
  - Low (1-4): Green
  - Medium (5-7): Blue
  - High (8-10): Magenta
- ✅ Visual feedback is immediate

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 12: Goal Auto-Status Update

**Test ID**: TC-012  
**Priority**: High  
**Module**: Goal Management

### Preconditions
- Goal exists with target date in the past

### Test Steps
1. Edit a goal
2. Set current value < target value
3. Set target date to yesterday
4. Click "Update Goal"

### Expected Results
- ✅ Goal status automatically changes to "Failed"
- ✅ Visual indicator shows failed status

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 13: Backend API - GET All Workouts

**Test ID**: TC-013  
**Priority**: High  
**Module**: Backend API

### Test Steps
```bash
curl http://localhost:8080/api/workouts
```

### Expected Results
- ✅ Status code: 200 OK
- ✅ Returns JSON array of workouts
- ✅ Workouts sorted by date (newest first)

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 14: Backend API - Create Workout with Invalid Data

**Test ID**: TC-014  
**Priority**: High  
**Module**: Backend API

### Test Steps
```bash
curl -X POST http://localhost:8080/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "exercise": "",
    "duration": -5,
    "calories": -100
  }'
```

### Expected Results
- ✅ Status code: 400 Bad Request
- ✅ Returns validation error messages
- ✅ No workout created in database

### Actual Results
- [ ] Pass
- [ ] Fail (describe issue): ________________

### Test Date: __________ | Tester: __________

---

## Test Case 15: Performance - Load 100 Workouts

**Test ID**: TC-015  
**Priority**: Low  
**Module**: Performance

### Preconditions
- 100+ workouts in database

### Test Steps
1. Navigate to Dashboard
2. Navigate to Workouts page
3. Observe loading time and responsiveness

### Expected Results
- ✅ Dashboard loads in < 2 seconds
- ✅ Workouts page loads in < 2 seconds
- ✅ Scrolling is smooth
- ✅ Charts render correctly
- ✅ No browser lag or freezing
