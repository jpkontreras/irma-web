import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import OnboardingLayout from '@/Layouts/OnboardingLayout';
import { Link, useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('verification.send'));
  }

  return (
    <OnboardingLayout
      title="Verify Your Email"
      subtitle="Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?"
    >
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader
            className={status === 'verification-link-sent' ? 'p-6' : 'p-3'}
          >
            {status === 'verification-link-sent' && (
              <Alert variant="success">
                <AlertDescription>
                  A new verification link has been sent to your email address.
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={submit}>
              <Button type="submit" className="w-full" disabled={processing}>
                Resend Verification Email
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href={route('logout')} method="post">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Link>
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
