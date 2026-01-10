# FIT Personal Health Monitoring System

## How to Run Locally

### Prerequisites

- **.NET 10.0 SDK**
- **Docker** installed and running
- **PostgreSQL** as the database

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/2025ca93059/FIT.git
   cd FIT
   ```

2. **Set Up the `.env` File**:
   Create a `.env` file at the root of the project and configure the following variables:

   ```env
   POSTGRES_DB=fitness
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=admin123
   ```

   Ensure the `.env` file is properly set up before proceeding to the next steps.

3. **Run the Application**:
   Use Docker Compose to start the services:

   ```bash
   docker compose -f compose.dev.yaml up -d
   ```

4. **Access the Application**:
   - **API**: [http://localhost:8080](http://localhost:8080)
   - **Database Adminer**: [http://localhost:8081](http://localhost:8081)
   - **API Documentation**: [http://localhost:8082](http://localhost:8082)

5. **Environment Setup** [Optional]:
   - Update environment variables in `.env` file or `compose.dev.yaml` if necessary.

---

## Current Features

### Core Features (Sprint 1: Foundation)

- **Workout Logging**:
  - Log workouts with details on type, duration, calories burned, and (if applicable) distance.
- **Goal Setting and Tracking**:
  - Create fitness goals based on distance, workouts, time duration, or calories burned.
  - Track progress towards each goal.
- **Workout History**:
  - View previously logged workouts with key metrics.
- **Progress Dashboard**:
  - Get visual insights into overall fitness progress.

### Supported Goal Types

1. Manual Goals
2. Distance-Based Goals
3. Workouts Count Goals
4. Duration Goals
5. Calories Burned Goals

### Supported Workout Types

- Running
- Walking
- Cycling
- Strength Training
- Yoga
- Others (Custom)
