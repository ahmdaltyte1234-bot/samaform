import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; titleAr: string }[];
}

const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
  const { isRTL } = useLanguage();

  return (
    <div className="w-full mb-8">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={index}
              className={`flex items-center ${index < totalSteps - 1 ? 'flex-1' : ''}`}
            >
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300',
                    isCompleted
                      ? 'bg-accent text-accent-foreground'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium hidden sm:block',
                    isRTL ? 'font-arabic' : '',
                    isCurrent
                      ? 'text-primary'
                      : isCompleted
                      ? 'text-accent'
                      : 'text-muted-foreground'
                  )}
                >
                  {isRTL ? step.titleAr : step.title}
                </span>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 sm:mx-4 transition-all duration-300',
                    isCompleted ? 'bg-accent' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Title */}
      <div className="sm:hidden mt-4 text-center">
        <span className={cn('text-sm font-medium text-primary', isRTL ? 'font-arabic' : '')}>
          {isRTL ? steps[currentStep - 1].titleAr : steps[currentStep - 1].title}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
