// import Checkbox from '@/Components/Checkbox';

import { Checkbox } from '@/components/ui/checkbox';

import FormMessageError from '@/components/blocks/FormMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormMessage } from '@/components/ui/form';
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
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="email">Email</Label>
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

          {errors.email && <FormMessageError>{errors.email}</FormMessageError>}
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Email</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <FormMessage>{errors.password}</FormMessage>}
        </div>

        <div className="mt-4 flex items-center">
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
            className="ms-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Remember me
          </Label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
            >
              Forgot your password?
            </Link>
          )}

          <PrimaryButton className="ms-4" disabled={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
