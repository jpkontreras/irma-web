import FormMessageError from '@/components/blocks/FormMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password - Unbound" />

      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src="/images/face.svg"
              alt="Unbound"
              className="mb-8 size-16 rounded-xl"
            />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Reset your password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
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
                autoComplete="email"
                autoFocus
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && (
                <FormMessageError>{errors.email}</FormMessageError>
              )}
            </div>

            <div className="space-y-6">
              <PrimaryButton
                className="w-full justify-center"
                disabled={processing}
              >
                Send Reset Link
              </PrimaryButton>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                <Link
                  href={route('login')}
                  className="font-medium text-primary hover:text-primary/90"
                >
                  Back to login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
