import { Check } from "lucide-react";

/**
 * Numbered step indicator used across the onboarding flow.
 *
 * `current` is 1-indexed. Pass `current > steps.length` once the whole
 * flow is finished — the final circle then swaps its number for a
 * checkmark, matching the "Verification Successful" screen.
 */
export default function StepIndicator({ steps, current }) {
  const isFinished = current > steps.length;

  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const step = i + 1;
        const isDone = step < current;
        const isActive = step === current;
        const showCheck = isFinished && step === steps.length;
        const circleFilled = isDone || isActive || isFinished;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  circleFilled
                    ? "bg-navy text-white"
                    : "bg-accent-soft text-navy/70"
                }`}
              >
                {showCheck ? <Check size={16} strokeWidth={3} /> : step}
              </div>
              <span
                className={`text-sm ${
                  isActive || showCheck ? "text-navy" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>

            {step < steps.length && (
              <div
                className={`h-px w-16 sm:w-20 -mt-6 ${
                  isDone || isFinished ? "bg-navy" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
