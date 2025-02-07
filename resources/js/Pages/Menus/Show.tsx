import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Menu, Restaurant } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface Props {
  restaurant: Restaurant;
  menu: Menu;
}

export default function Show({ restaurant, menu }: Props) {
  return (
    <>
      <Head title={`${menu.name} - ${restaurant.name}`} />

      <AuthenticatedLayout
        title={menu.name}
        subtitle={`Menu details for ${restaurant.name}`}
        actions={
          <Link
            href={route('restaurants.menus.edit', [restaurant.id, menu.id])}
          >
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Menu
            </Button>
          </Link>
        }
      >
        <div className="flex h-full flex-1 flex-col">
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Details</h3>
                    <div className="mt-2 space-y-2">
                      {menu.description && (
                        <p className="text-gray-600 dark:text-gray-300">
                          {menu.description}
                        </p>
                      )}
                      <p className="text-gray-600 dark:text-gray-300">
                        Type: {menu.type || 'Not specified'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Status: {menu.is_active ? 'Active' : 'Inactive'}
                      </p>
                      {menu.available_from && menu.available_until && (
                        <p className="text-gray-600 dark:text-gray-300">
                          Available: {menu.available_from} -{' '}
                          {menu.available_until}
                        </p>
                      )}
                      {menu.available_days?.length > 0 && (
                        <p className="text-gray-600 dark:text-gray-300">
                          Available Days: {menu.available_days.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Menu Items</h3>
                    <div className="mt-4">
                      {/* Menu items will be implemented later */}
                      <p className="text-gray-500">No menu items yet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
