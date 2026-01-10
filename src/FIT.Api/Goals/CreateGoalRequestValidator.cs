using FIT.Core.Goals;

using FluentValidation;

namespace FIT.Api.Goals;

internal sealed class CreateGoalRequestValidator
    : AbstractValidator<CreateGoalRequest>
{
    public CreateGoalRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotNull()
            .NotEmpty()
            .WithMessage("Name is required.");

        RuleFor(x => x.TargetValue)
            .GreaterThan(0)
            .WithMessage("Target value must be greater than zero.");

        RuleFor(x => x.EndDate)
            .GreaterThanOrEqualTo(x => x.StartDate)
            .When(x => x.EndDate.HasValue)
            .WithMessage("End date cannot be before start date.");

        RuleFor(x => x.Unit)
            .NotNull()
            .NotEmpty()
            .When(x => x.TrackingMode == GoalTrackingMode.Manual)
            .WithMessage("Unit is required for manual goals.");

        RuleFor(x => x.TrackingMode)
        .Must(m => Enum.IsDefined(m))
        .WithMessage("Invalid tracking mode supplied.");
    }
}
