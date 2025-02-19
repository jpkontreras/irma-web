import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  currentStep?: number;
  totalSteps?: number;
}

export default function OnboardingLayout({
  children,
  title,
  subtitle,
  currentStep,
  totalSteps,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
              <img
                src="/images/compact-h.svg"
                alt="Logo"
                className="mx-auto h-32 w-64"
              />

              <div className="space-y-4 text-center">
                {currentStep && totalSteps && (
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </div>
                )}
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>

              <div className="mt-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
