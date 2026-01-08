using FIT.Core.Workouts;

using FluentValidation;

namespace FIT.Api.Workouts;

public sealed class LogWorkoutRequestValidator : AbstractValidator<LogWorkoutRequest>
{
    public LogWorkoutRequestValidator()
    {
        RuleFor(x => x.StartedAtUtc)
             .Must(d => d.Kind == DateTimeKind.Utc)
             .WithMessage("StartedAtUtc must be UTC")
             .LessThanOrEqualTo(DateTime.UtcNow);

        RuleFor(x => x.DurationMinutes)
            .GreaterThan(0);

        RuleFor(x => x.ActivityType)
            .Must(a =>
                a == WorkoutActivityType.Running ||
                a == WorkoutActivityType.Walking ||
                a == WorkoutActivityType.Cycling ||
                a == WorkoutActivityType.StrengthTraining ||
                a == WorkoutActivityType.Yoga ||
                a == WorkoutActivityType.Other
            )
            .WithMessage("ActivityType must be a valid activity.");


        RuleFor(x => x.DistanceMeters)
            .GreaterThan(0)
            .When(x => x.DistanceMeters.HasValue);

        RuleFor(x => x)
            .Must(x =>
                x.DistanceMeters.HasValue ==
                (x.ActivityType is
                    WorkoutActivityType.Running or
                    WorkoutActivityType.Walking or
                    WorkoutActivityType.Cycling))
            .WithMessage("Distance is only allowed for distance-based activities");
    }
}