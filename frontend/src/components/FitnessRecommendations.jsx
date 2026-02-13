import { useMemo } from 'react';
import { Lightbulb, TrendingUp, Heart, Zap, Target, Calendar } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import './FitnessRecommendations.css';

function FitnessRecommendations({ workouts, goals }) {
  const recommendations = useMemo(() => {
    const tips = [];
    
    if (workouts.length === 0) {
      return [{
        id: 'start',
        icon: Zap,
        color: '#00ffff',
        title: 'Start Your Fitness Journey!',
        message: 'Log your first workout to begin tracking your progress and receive personalized recommendations.',
        priority: 'high'
      }];
    }

    // Calculate workout stats
    const last7Days = workouts.filter(w => 
      new Date(w.workoutDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    
    const categoryCounts = {};
    workouts.forEach(w => {
      categoryCounts[w.category] = (categoryCounts[w.category] || 0) + 1;
    });

    const totalWorkouts = workouts.length;
    const avgIntensity = workouts.reduce((sum, w) => sum + w.intensity, 0) / workouts.length;
    const lastWorkout = workouts[0]; // Assuming sorted by date desc
    const daysSinceLastWorkout = differenceInDays(new Date(), new Date(lastWorkout.workoutDate));

    // Recommendation 1: Rest day advice
    if (last7Days.length >= 6) {
      tips.push({
        id: 'rest',
        icon: Heart,
        color: '#ff00ff',
        title: 'Consider a Rest Day',
        message: `You've had ${last7Days.length} workouts in the past week! Your muscles need recovery time. Consider taking a rest day or doing light stretching.`,
        priority: 'high'
      });
    }

    // Recommendation 2: Workout consistency
    if (daysSinceLastWorkout > 3) {
      tips.push({
        id: 'consistency',
        icon: Calendar,
        color: '#00ffff',
        title: "Time to Get Back On Track!",
        message: `It's been ${daysSinceLastWorkout} days since your last workout. Even a short 20-minute session can help maintain your momentum!`,
        priority: 'high'
      });
    } else if (daysSinceLastWorkout === 0) {
      tips.push({
        id: 'congrats',
        icon: Zap,
        color: '#00ff80',
        title: 'Great Job Today!',
        message: 'You worked out today! Keep up the amazing consistency.',
        priority: 'medium'
      });
    }

    // Recommendation 3: Workout variety
    const dominantCategory = Object.keys(categoryCounts).reduce((a, b) => 
      categoryCounts[a] > categoryCounts[b] ? a : b
    );
    const dominantPercentage = (categoryCounts[dominantCategory] / totalWorkouts) * 100;

    if (dominantPercentage > 60) {
      const suggestions = {
        cardio: 'strength training or flexibility exercises',
        strength: 'cardio or yoga',
        flexibility: 'cardio or strength training',
        sports: 'dedicated strength or cardio sessions'
      };

      tips.push({
        id: 'variety',
        icon: TrendingUp,
        color: '#0080ff',
        title: 'Add More Variety',
        message: `${Math.round(dominantPercentage)}% of your workouts are ${dominantCategory}. Try incorporating ${suggestions[dominantCategory]} for a balanced fitness routine!`,
        priority: 'medium'
      });
    }

    // Recommendation 4: Intensity advice
    if (avgIntensity < 5) {
      tips.push({
        id: 'intensity-low',
        icon: Zap,
        color: '#ff00ff',
        title: 'Challenge Yourself More',
        message: `Your average workout intensity is ${avgIntensity.toFixed(1)}/10. Try pushing yourself a bit harder to see better results!`,
        priority: 'medium'
      });
    } else if (avgIntensity > 8) {
      tips.push({
        id: 'intensity-high',
        icon: Heart,
        color: '#00ff80',
        title: 'Balance High Intensity',
        message: `Your average intensity is ${avgIntensity.toFixed(1)}/10 - impressive! Mix in some lower intensity workouts to prevent burnout.`,
        priority: 'medium'
      });
    }

    // Recommendation 5: Milestone celebrations
    if (totalWorkouts === 10) {
      tips.push({
        id: 'milestone-10',
        icon: Target,
        color: '#00ffff',
        title: '🎉 10 Workouts Milestone!',
        message: "Amazing! You've completed 10 workouts. You're building a solid fitness habit!",
        priority: 'high'
      });
    } else if (totalWorkouts === 50) {
      tips.push({
        id: 'milestone-50',
        icon: Target,
        color: '#00ffff',
        title: '🎉 50 Workouts Milestone!',
        message: "Incredible dedication! 50 workouts is a major achievement. Keep crushing it!",
        priority: 'high'
      });
    } else if (totalWorkouts === 100) {
      tips.push({
        id: 'milestone-100',
        icon: Target,
        color: '#00ffff',
        title: '🎉 100 Workouts Champion!',
        message: "You've hit 100 workouts! You're now a certified fitness warrior. Absolutely incredible!",
        priority: 'high'
      });
    }

    // Recommendation 6: Goal-based advice
    if (goals.length > 0) {
      const activeGoals = goals.filter(g => g.status === 'active');
      const behindGoals = activeGoals.filter(g => {
        const daysRemaining = differenceInDays(new Date(g.targetDate), new Date());
        const progressPercentage = (g.currentValue / g.targetValue) * 100;
        const expectedProgress = ((30 - daysRemaining) / 30) * 100; // Assuming 30-day goal
        return progressPercentage < expectedProgress - 10;
      });

      if (behindGoals.length > 0) {
        const goal = behindGoals[0];
        tips.push({
          id: 'goal-behind',
          icon: Target,
          color: '#ff00ff',
          title: 'Goal Alert!',
          message: `You're behind on "${goal.title}". Increase your effort to reach ${goal.targetValue} ${goal.type} by ${format(new Date(goal.targetDate), 'MMM dd')}!`,
          priority: 'high'
        });
      }

      const nearCompleteGoals = activeGoals.filter(g => 
        (g.currentValue / g.targetValue) >= 0.8 && (g.currentValue / g.targetValue) < 1
      );

      if (nearCompleteGoals.length > 0) {
        const goal = nearCompleteGoals[0];
        const remaining = goal.targetValue - goal.currentValue;
        tips.push({
          id: 'goal-near',
          icon: Target,
          color: '#00ff80',
          title: 'Almost There!',
          message: `You're so close to completing "${goal.title}"! Just ${remaining} more ${goal.type} to go!`,
          priority: 'high'
        });
      }
    } else {
      tips.push({
        id: 'no-goals',
        icon: Target,
        color: '#0080ff',
        title: 'Set Your First Goal',
        message: 'Create a fitness goal to stay motivated and track your progress more effectively!',
        priority: 'medium'
      });
    }

    // Recommendation 7: Weekly plan
    if (last7Days.length < 3) {
      tips.push({
        id: 'weekly-plan',
        icon: Calendar,
        color: '#00ffff',
        title: 'Boost Your Weekly Activity',
        message: 'Aim for at least 3-4 workouts per week for optimal health benefits and consistent progress.',
        priority: 'medium'
      });
    }

    // Sort by priority
    return tips.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[b.priority] - priority[a.priority];
    }).slice(0, 5); // Show top 5 recommendations

  }, [workouts, goals]);

  return (
    <div className="fitness-recommendations">
      <h2 className="recommendations-title">
        <Lightbulb size={32} />
        Personalized Tips & Insights
      </h2>

      <div className="recommendations-grid">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div 
              key={rec.id} 
              className={`recommendation-card ${rec.priority}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="rec-icon" style={{ color: rec.color }}>
                <Icon size={32} />
              </div>
              <div className="rec-content">
                <h3>{rec.title}</h3>
                <p>{rec.message}</p>
              </div>
              <div className="rec-badge" style={{ background: rec.color }}>
                {rec.priority === 'high' ? '!' : 'i'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="motivation-quote">
        <p>"The only bad workout is the one that didn't happen."</p>
        <span>- Keep pushing forward! 💪</span>
      </div>
    </div>
  );
}

export default FitnessRecommendations;
