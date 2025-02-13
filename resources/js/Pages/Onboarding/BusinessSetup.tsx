import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import OnboardingLayout from '@/Layouts/OnboardingLayout';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import {
  Beer,
  Coffee,
  Store,
  UtensilsCrossed,
  UtensilsIcon,
} from 'lucide-react';

// Business type definitions with icons
const businessTypes = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: UtensilsCrossed,
    description: 'Full-service restaurant with table service',
  },
  {
    id: 'cafe',
    name: 'Cafe',
    icon: Coffee,
    description: 'Coffee shop, bakery, or casual dining',
  },
  {
    id: 'bar',
    name: 'Bar',
    icon: Beer,
    description: 'Bar, pub, or nightclub',
  },
  {
    id: 'quick_service',
    name: 'Quick Service',
    icon: UtensilsIcon,
    description: 'Fast food or counter service',
  },
  {
    id: 'other',
    name: 'Other Business',
    icon: Store,
    description: 'Different type of business not listed above',
  },
];

/**
 * BusinessSetup handles the initial business type selection during onboarding.
 * This information is crucial for:
 * - Customizing the user experience based on business type
 * - Enabling relevant features (e.g., table management for restaurants)
 * - Setting appropriate defaults for menus, ordering, and workflows
 * - Providing industry-specific terminology and configurations
 *
 * The selected business type will influence:
 * - Dashboard layout and widgets
 * - Available features and modules
 * - Default settings and configurations
 * - Reporting and analytics views
 */
export default function BusinessSetup() {
  const { data, setData, post, processing, errors } = useForm({
    business_type: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!businessTypes.some((type) => type.id === data.business_type)) {
      return;
    }
    post(route('onboarding.business-setup.store'));
  }

  // Skip onboarding
  function skipOnboarding() {
    post(route('onboarding.skip'));
  }

  return (
    <OnboardingLayout
      title="What type of business do you run?"
      subtitle="Select the option that best describes your business"
      currentStep={1}
      totalSteps={3}
    >
      <form onSubmit={onSubmit} className="flex h-full flex-col">
        <div className="flex-1 space-y-8">
          <RadioGroup
            value={data.business_type}
            onValueChange={(value) => setData('business_type', value)}
            className="grid gap-3"
          >
            {businessTypes.map((type) => (
              <label
                key={type.id}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded-lg border p-4 transition-colors hover:bg-accent',
                  'focus-within:ring-2 focus-within:ring-offset-2',
                  data.business_type === type.id && 'border-primary bg-accent',
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                        <type.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>

          {errors.business_type && (
            <div className="mt-2 text-sm text-destructive">
              {errors.business_type}
            </div>
          )}

          {/* Explanation Section */}
          <div className="rounded-lg bg-gradient-to-b from-muted/50 to-muted/30 p-6">
            <p className="mb-4 text-lg font-medium">
              This information helps us:
            </p>
            <ul className="grid gap-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium leading-none">
                    Personalized Dashboard
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Customize your workspace with relevant features and tools
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium leading-none">Smart Setup</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Configure menu and ordering systems for your business type
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium leading-none">Industry Tools</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Access specialized features and reports for your sector
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium leading-none">Optimized Workflow</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Streamlined processes tailored to your business needs
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom with shadow */}
        <div className="sticky bottom-0 mt-8 border-t bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={skipOnboarding}
              disabled={processing}
            >
              Skip Setup
            </Button>

            <Button type="submit" disabled={processing || !data.business_type}>
              Continue
            </Button>
          </div>
        </div>
      </form>
    </OnboardingLayout>
  );
}
