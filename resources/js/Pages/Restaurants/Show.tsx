import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Restaurant } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, UtensilsCrossed } from 'lucide-react';

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
          <div className="flex gap-2">
            <Link href={route('restaurants.menu-items.index', restaurant.id)}>
              <Button variant="outline">
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Menu Items
              </Button>
            </Link>
            <Link href={route('restaurants.menus.create', restaurant.id)}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Menu
              </Button>
            </Link>
          </div>
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
                    <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
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
                    <div className="flex-1">
                      {restaurant.menus?.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {restaurant.menus.map((menu) => (
                            <Link
                              key={menu.id}
                              href={route('restaurants.menus.show', [
                                restaurant.id,
                                menu.id,
                              ])}
                            >
                              <div className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{menu.name}</h3>
                                  <Badge
                                    variant={
                                      menu.is_active ? 'default' : 'secondary'
                                    }
                                  >
                                    {menu.is_active ? 'Active' : 'Inactive'}
                                  </Badge>
                                </div>
                                {menu.description && (
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    {menu.description}
                                  </p>
                                )}
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {menu.type && (
                                    <Badge variant="outline">{menu.type}</Badge>
                                  )}
                                  {menu.available_from &&
                                    menu.available_until && (
                                      <Badge variant="outline">
                                        {menu.available_from} -{' '}
                                        {menu.available_until}
                                      </Badge>
                                    )}
                                </div>
                              </div>
                            </Link>
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
                    value="menu-items"
                    className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="flex-1">
                      <div className="mb-4 flex justify-end">
                        <Link
                          href={route(
                            'restaurants.menu-items.index',
                            restaurant.id,
                          )}
                        >
                          <Button>
                            <UtensilsCrossed className="mr-2 h-4 w-4" />
                            View All Items
                          </Button>
                        </Link>
                      </div>
                      {restaurant.menu_items?.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {restaurant.menu_items.map((item) => (
                            <div
                              key={item.id}
                              className="rounded-lg border bg-card p-4"
                            >
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.category}
                              </p>
                              <p className="mt-2">${item.price}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                          <p className="text-gray-500">
                            No menu items created yet
                          </p>
                          <Link
                            href={route(
                              'restaurants.menu-items.create',
                              restaurant.id,
                            )}
                          >
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Create your first item
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
