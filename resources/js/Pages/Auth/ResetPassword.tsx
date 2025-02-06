import FormMessageError from '@/components/blocks/FormMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
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
              Set new password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Please enter your new password below
            </p>
          </div>

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
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && (
                <FormMessageError>{errors.email}</FormMessageError>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                autoFocus
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <FormMessageError>{errors.password}</FormMessageError>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) =>
                  setData('password_confirmation', e.target.value)
                }
              />
              {errors.password_confirmation && (
                <FormMessageError>
                  {errors.password_confirmation}
                </FormMessageError>
              )}
            </div>

            <Button className="w-full justify-center" disabled={processing}>
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
