import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Restaurant } from '@/types';
import { Head } from '@inertiajs/react';

interface ShowProps extends PageProps {
  restaurant: Restaurant;
}

export default function Show({ restaurant }: ShowProps) {
  return (
    <>
      <Head title={restaurant.name} />

      <AuthenticatedLayout
        title={restaurant.name}
        subtitle="Restaurant Details"
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {restaurant.description}
                  </p>
                  {/* Add more restaurant details as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
