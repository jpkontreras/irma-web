import FormMessageError from '@/components/blocks/FormMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Create Account - Unbound" />

      <div className="flex flex-1">
        {/* Left Column - Registration Form */}
        <div className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div className="flex flex-col">
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join us to start managing your projects efficiently
              </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  autoComplete="name"
                  autoFocus
                  onChange={(e) => setData('name', e.target.value)}
                  required
                />
                {errors.name && (
                  <FormMessageError>{errors.name}</FormMessageError>
                )}
              </div>

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
                  required
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
                  autoComplete="new-password"
                  onChange={(e) => setData('password', e.target.value)}
                  required
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
                  required
                />
                {errors.password_confirmation && (
                  <FormMessageError>
                    {errors.password_confirmation}
                  </FormMessageError>
                )}
              </div>

              <div className="space-y-6">
                <Button className="w-full justify-center" disabled={processing}>
                  Register
                </Button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-1">Already have an account?</span>
                  <Link
                    href={route('login')}
                    className="font-medium text-primary hover:text-primary/90"
                  >
                    Sign in
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
                  src="/images/face.svg"
                  alt="Feature illustration"
                  className="mx-auto size-60 w-auto rounded-3xl border-2"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Join Our Community
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Get started with a powerful platform designed to help you manage
                and grow your business effectively.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Easy Setup
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Get started in minutes
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    24/7 Support
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Always here to help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
