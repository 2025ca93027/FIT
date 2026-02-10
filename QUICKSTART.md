# 🚀 Quick Start Guide

Get your Fitness Tracker up and running in 5 minutes!

## Prerequisites Check

Verify you have these installed:

```bash
# Check Java version (need 17+)
java -version

# Check Node.js version (need 16+)
node --version

# Check Maven version (need 3.6+)
mvn --version
```

## Step 1: Start the Backend

Open a terminal in the `backend` directory:

```bash
cd backend

# Using Maven Wrapper (no Maven installation needed)
./mvnw spring-boot:run

# OR using Maven
mvn spring-boot:run
```

✅ **Backend Ready!** You should see:
```
Started FitnessTrackerApplication in X.XXX seconds
```

The API will be available at: **http://localhost:8080**

## Step 2: Start the Frontend

Open a NEW terminal in the `frontend` directory:

```bash
cd frontend

# Install dependencies (only needed first time)
npm install

# Start the development server
npm run dev
```

✅ **Frontend Ready!** You should see:
```
  VITE vX.X.X  ready in XXX ms

  ➜  Local:   http://localhost:3000/
```

## Step 3: Open the Application

Open your browser and navigate to:

**http://localhost:3000**

You should see the Fitness Tracker with its neon-themed interface!

## Test the Application

### Add Your First Workout

1. Click on **"Workouts"** in the navigation
2. Click **"Add Workout"**
3. Fill in the form:
   - Exercise: "Morning Run"
   - Duration: 30
   - Calories: 300
   - Category: Cardio
   - Intensity: 7
4. Click **"Save Workout"**

### Create Your First Goal

1. Click on **"Goals"** in the navigation
2. Click **"Add Goal"**
3. Fill in the form:
   - Title: "Complete 20 Workouts This Month"
   - Type: Workouts
   - Current: 1
   - Target: 20
   - Date: (set to end of current month)
4. Click **"Create Goal"**

### View Your Dashboard

Click on **"Dashboard"** to see your stats and charts!

## Common Issues

### Backend Won't Start

**Error: Port 8080 already in use**

Change the port in `backend/src/main/resources/application.properties`:
```properties
server.port=8081
```

Then update `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8081',
    changeOrigin: true
  }
}
```

### Frontend Won't Start

**Error: Port 3000 already in use**

The terminal will ask if you want to use a different port. Press `Y` to accept.

### CORS Errors

Make sure:
1. Backend is running
2. Frontend proxy is configured correctly in `vite.config.js`
3. Backend CORS settings include `http://localhost:3000`

## Access H2 Database Console (Optional)

To view the database:

1. Go to **http://localhost:8080/h2-console**
2. Enter these details:
   - JDBC URL: `jdbc:h2:mem:fitnessdb`
   - Username: `sa`
   - Password: (leave empty)
3. Click **"Connect"**

You can now run SQL queries to view your data!

## Next Steps

- Explore all features in the Dashboard
- Add more workouts to see charts populate
- Create multiple goals and track progress
- Customize the code to add new features
- Read the full README.md for deployment instructions

## Need Help?

Check the main README.md for:
- Detailed API documentation
- Configuration options
- Troubleshooting guide
- Production deployment steps

---

**Happy Tracking! 💪🏃‍♂️🎯**
