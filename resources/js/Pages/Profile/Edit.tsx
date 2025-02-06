import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Profile Settings
        </h2>
      }
    >
      <Head title="Profile Settings - Unbound" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border bg-card p-8 shadow-sm">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
            />
          </div>

          <div className="overflow-hidden rounded-lg border bg-card p-8 shadow-sm">
            <UpdatePasswordForm />
          </div>

          <div className="overflow-hidden rounded-lg border bg-card p-8 shadow-sm">
            <DeleteUserForm />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
