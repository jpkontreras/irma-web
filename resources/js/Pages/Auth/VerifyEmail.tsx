import { Button } from '@/components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Verify Email - Unbound" />

      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src="/images/face.svg"
              alt="Unbound"
              className="mb-8 size-48 rounded-xl"
            />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Verify your email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Thanks for signing up! Before getting started, please verify your
              email address by clicking on the link we just emailed to you.
            </p>
          </div>

          {status === 'verification-link-sent' && (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600 dark:bg-green-900/50 dark:text-green-400">
              A new verification link has been sent to your email address.
            </div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-6">
            <div className="flex flex-col space-y-4">
              <Button className="w-full justify-center" disabled={processing}>
                Resend Verification Email
              </Button>

              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Log Out
              </Link>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
