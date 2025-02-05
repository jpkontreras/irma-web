import FormMessageError from '@/components/blocks/FormMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password - Unbound" />

      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src="/images/face.svg"
              alt="Unbound"
              className="mb-8 size-16 rounded-xl"
            />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Confirm password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              This is a secure area. Please confirm your password before
              continuing.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoFocus
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <FormMessageError>{errors.password}</FormMessageError>
              )}
            </div>

            <PrimaryButton
              className="w-full justify-center"
              disabled={processing}
            >
              Confirm
            </PrimaryButton>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
