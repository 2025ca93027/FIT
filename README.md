# 🏋️ Fitness Tracker Application

A full-stack fitness tracking application built with **React** (frontend) and **Spring Boot** (backend). Track your workouts, set fitness goals, and monitor your progress with beautiful visualizations and an energetic, neon-themed UI.

## ✨ Features

### 💪 Workout Management
- **Track Workouts**: Log exercises with duration, calories, intensity, and notes
- **Categories**: Cardio, Strength, Flexibility, and Sports
- **Intensity Levels**: Rate your workout intensity from 1-10
- **Date & Time**: Track when you completed each workout
- **Edit & Delete**: Full CRUD operations for workout management

### 🎯 Goal Setting
- **Multiple Goal Types**: Weight, Steps, Workouts, Calories
- **Progress Tracking**: Visual progress bars and percentages
- **Status Management**: Active, Completed, or Failed goals
- **Target Dates**: Set deadlines and track days remaining
- **Auto-Status Updates**: Goals automatically update based on completion

### 📊 Dashboard Analytics
- **Weekly Statistics**: Calories burned, total duration, workout count
- **Activity Charts**: Visual representation of weekly progress
- **Category Distribution**: Pie chart showing workout categories
- **Active Goals Overview**: Quick view of your current goals

## 🛠️ Technology Stack

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.1
- **Database**: H2 (in-memory, easily switchable to PostgreSQL/MySQL)
- **ORM**: Spring Data JPA
- **Validation**: Jakarta Validation
- **Build Tool**: Maven
- **Java Version**: 17

### Frontend (React)
- **Framework**: React 18.2
- **Build Tool**: Vite
- **Styling**: Custom CSS with gradient meshes and animations
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Utilities**: date-fns

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **Maven 3.6** or higher
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fitness-tracker
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

#### Option A: Using Maven Wrapper (Recommended)

```bash
# Linux/Mac
./mvnw clean install
./mvnw spring-boot:run

# Windows
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

#### Option B: Using Maven

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will start on **http://localhost:3000**

## 🔌 API Endpoints

### Workout Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workouts` | Get all workouts |
| GET | `/api/workouts/{id}` | Get workout by ID |
| POST | `/api/workouts` | Create new workout |
| PUT | `/api/workouts/{id}` | Update workout |
| DELETE | `/api/workouts/{id}` | Delete workout |
| GET | `/api/workouts/category/{category}` | Get workouts by category |
| GET | `/api/workouts/stats?start={}&end={}` | Get workout statistics |

### Goal Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/goals` | Get all goals |
| GET | `/api/goals/{id}` | Get goal by ID |
| POST | `/api/goals` | Create new goal |
| PUT | `/api/goals/{id}` | Update goal |
| DELETE | `/api/goals/{id}` | Delete goal |
| GET | `/api/goals/active` | Get active goals |
| GET | `/api/goals/status/{status}` | Get goals by status |

## 📊 Database Schema

### Workouts Table
```sql
- id (BIGINT, Primary Key)
- exercise (VARCHAR, NOT NULL)
- duration (INTEGER, NOT NULL) -- in minutes
- calories (INTEGER, NOT NULL)
- category (VARCHAR, NOT NULL) -- cardio, strength, flexibility, sports
- intensity (INTEGER, NOT NULL) -- 1-10
- notes (TEXT)
- workout_date (TIMESTAMP, NOT NULL)
- created_at (TIMESTAMP)
```

### Goals Table
```sql
- id (BIGINT, Primary Key)
- title (VARCHAR, NOT NULL)
- type (VARCHAR, NOT NULL) -- weight, steps, workouts, calories
- target_value (INTEGER, NOT NULL)
- current_value (INTEGER, NOT NULL)
- target_date (DATE, NOT NULL)
- status (VARCHAR, NOT NULL) -- active, completed, failed
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🎨 Design Features

The application features a bold, energetic design with:

- **Neon Color Scheme**: Cyan, Magenta, Electric Blue, and Lime Green
- **Gradient Meshes**: Dynamic background animations
- **Custom Fonts**: Orbitron for headings, Rajdhani for body text
- **Smooth Animations**: Card entrances, hover effects, and transitions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Glassmorphism**: Backdrop blur effects for depth
- **Pulsing Effects**: Attention-grabbing animations for important elements

## 🔧 Configuration

### Backend Configuration (application.properties)

```properties
# Server Port
server.port=8080

# Database (H2 for development)
spring.datasource.url=jdbc:h2:mem:fitnessdb
spring.datasource.username=sa
spring.datasource.password=

# CORS (Update for production)
cors.allowed.origins=http://localhost:3000,http://localhost:5173
```

### Switching to Production Database (PostgreSQL Example)

Update `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

Update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fitness_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### Frontend Configuration

Update API base URL in `src/services/api.js` if deploying to different environments:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8080/api';
```

## 📦 Building for Production

### Backend

```bash
cd backend
mvn clean package
java -jar target/fitness-tracker-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `dist` folder. Serve it using any static file server or integrate with Spring Boot.

## 🧪 Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🐛 Troubleshooting

### Backend Issues

**Port Already in Use:**
```bash
# Change port in application.properties
server.port=8081
```

**H2 Console Not Accessible:**
- Navigate to http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:fitnessdb`
- Username: `sa`
- Password: (leave empty)

### Frontend Issues

**CORS Errors:**
- Ensure backend CORS configuration includes your frontend URL
- Check that both servers are running

**API Connection Failed:**
- Verify backend is running on port 8080
- Check browser console for network errors
- Ensure proxy configuration in `vite.config.js` is correct

## 🎯 Usage Guide

### Adding a Workout

1. Navigate to the **Workouts** tab
2. Click **"Add Workout"**
3. Fill in the form:
   - Exercise name
   - Duration (minutes)
   - Calories burned
   - Category (Cardio, Strength, Flexibility, Sports)
   - Intensity (1-10)
   - Optional notes
   - Date and time
4. Click **"Save Workout"**

### Creating a Goal

1. Navigate to the **Goals** tab
2. Click **"Add Goal"**
3. Fill in the form:
   - Goal title
   - Type (Workouts, Calories, Steps, Weight)
   - Current value
   - Target value
   - Target date
4. Click **"Create Goal"**

### Viewing Dashboard

The **Dashboard** tab shows:
- Total calories burned (last 7 days)
- Total workout duration (last 7 days)
- Number of workouts (last 7 days)
- Active goals count
- Weekly activity chart
- Workout category distribution
- Active goals progress

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🌟 Future Enhancements

- User authentication and authorization
- Multi-user support
- Social features (share workouts, compete with friends)
- Workout templates and recommendations
- Integration with fitness wearables
- Advanced analytics and reports
- Mobile app (React Native)
- Nutrition tracking
- Exercise library with instructions
- AI-powered workout suggestions

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ using React and Spring Boot**
