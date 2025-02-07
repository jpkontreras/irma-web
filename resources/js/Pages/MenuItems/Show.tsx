import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MenuItem, Restaurant } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit } from 'lucide-react';

interface Props {
  restaurant: Restaurant;
  menuItem: MenuItem;
}

export default function Show({ restaurant, menuItem }: Props) {
  return (
    <>
      <Head title={`${menuItem.name} - ${restaurant.name}`} />

      <AuthenticatedLayout
        title={menuItem.name}
        subtitle={restaurant.name}
        actions={
          <div className="flex gap-2">
            <Link href={route('restaurants.menu-items.index', restaurant.id)}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link
              href={route('restaurants.menu-items.edit', [
                restaurant.id,
                menuItem.id,
              ])}
            >
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>
        }
      >
        <div className="py-12">
          <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <div className="bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Details</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Category
                      </span>
                      <p className="mt-1">{menuItem.category}</p>
                    </div>

                    {menuItem.description && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Description
                        </span>
                        <p className="mt-1">{menuItem.description}</p>
                      </div>
                    )}

                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Price
                      </span>
                      <p className="mt-1">${menuItem.price}</p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Status
                      </span>
                      <div className="mt-1">
                        <Badge
                          variant={
                            menuItem.is_available ? 'default' : 'secondary'
                          }
                        >
                          {menuItem.is_available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </div>

                    {menuItem.preparation_time && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Preparation Time
                        </span>
                        <p className="mt-1">
                          {menuItem.preparation_time} minutes
                        </p>
                      </div>
                    )}

                    {menuItem.notes && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Notes
                        </span>
                        <p className="mt-1">{menuItem.notes}</p>
                      </div>
                    )}

                    {menuItem.options && menuItem.options.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Options
                        </span>
                        <ul className="mt-1 list-inside list-disc">
                          {menuItem.options.map((option, index) => (
                            <li key={index}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
