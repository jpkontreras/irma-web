import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Restaurant } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface Props {
  restaurant: Restaurant;
}

export default function Show({ restaurant }: Props) {
  return (
    <>
      <Head title={restaurant.name} />

      <AuthenticatedLayout
        title={restaurant.name}
        subtitle="Restaurant Details"
        actions={
          <Link href={route('restaurants.menus.create', restaurant.id)}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Menu
            </Button>
          </Link>
        }
      >
        <div className="flex h-full flex-1 flex-col">
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
              <Tabs defaultValue="overview" className="flex flex-1 flex-col">
                <div className="flex flex-row justify-end border-b px-6 py-3">
                  <TabsList className="inline-flex h-9 justify-end">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="menu">Menu</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="reservations">Reservations</TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-1 p-6">
                  <TabsContent
                    value="overview"
                    className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="flex-1">
                      <div>
                        <h3 className="text-lg font-medium">Details</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-gray-600 dark:text-gray-300">
                            {restaurant.description}
                          </p>
                          {restaurant.email && (
                            <p className="text-gray-600 dark:text-gray-300">
                              Email: {restaurant.email}
                            </p>
                          )}
                          {restaurant.phone && (
                            <p className="text-gray-600 dark:text-gray-300">
                              Phone: {restaurant.phone}
                            </p>
                          )}
                          {restaurant.address && (
                            <p className="text-gray-600 dark:text-gray-300">
                              Address: {restaurant.address}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="menu"
                    className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="flex-1 rounded-md border">
                      {restaurant.menus?.length ? (
                        <div className="divide-y">
                          {restaurant.menus.map((menu) => (
                            <div
                              key={menu.id}
                              className="flex items-center justify-between p-4"
                            >
                              <div>
                                <h4 className="font-medium">{menu.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {menu.description}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Link
                                  href={route('restaurants.menus.show', [
                                    restaurant.id,
                                    menu.id,
                                  ])}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View Menu
                                </Link>
                                <Link
                                  href={route('restaurants.menus.edit', [
                                    restaurant.id,
                                    menu.id,
                                  ])}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Edit
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                          <p className="text-gray-500">No menus created yet</p>
                          <Link
                            href={route(
                              'restaurants.menus.create',
                              restaurant.id,
                            )}
                          >
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Create your first menu
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="reviews"
                    className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="flex flex-1 items-center justify-center">
                      <p className="text-gray-500">Reviews coming soon</p>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="reservations"
                    className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="flex flex-1 items-center justify-center">
                      <p className="text-gray-500">Reservations coming soon</p>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
