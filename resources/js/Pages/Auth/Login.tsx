import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import FormMessageError from '@/components/blocks/FormMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Sign In - Unbound" />

      <div className="flex flex-1">
        {/* Left Column - Login Form */}
        <div className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div className="flex flex-col">
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            {status && (
              <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600 dark:bg-green-900/50 dark:text-green-400">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && (
                  <FormMessageError>{errors.email}</FormMessageError>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  autoComplete="current-password"
                  onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && (
                  <FormMessageError>{errors.password}</FormMessageError>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={data.remember}
                    onCheckedChange={(checked) =>
                      setData('remember', (checked || false) as false)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Remember me
                  </Label>
                </div>

                {canResetPassword && (
                  <Link
                    href={route('password.request')}
                    className="text-sm font-medium text-primary hover:text-primary/90"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              <div className="space-y-6">
                <Button className="w-full justify-center" disabled={processing}>
                  Log in
                </Button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-1">New to our platform?</span>
                  <Link
                    href={route('register')}
                    className="font-medium text-primary hover:text-primary/90"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* Right Column - Info */}
        <div className="hidden justify-center bg-primary/5 md:flex md:w-1/2">
          <div className="flex flex-col justify-center px-8 lg:px-12">
            <div className="relative mx-auto w-full max-w-md text-center">
              <div className="mb-8">
                <img
                  src="/images/boxed.svg"
                  alt="Feature illustration"
                  className="mx-auto size-60 w-auto rounded-3xl border-2"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Streamline Your Workflow
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Access your dashboard to manage projects, track progress, and
                collaborate with your team - all in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
