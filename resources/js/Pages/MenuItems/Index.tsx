import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Menu, MenuItem, Restaurant } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
  restaurant: Restaurant;
  menu?: Menu;
  menuItems: {
    data: MenuItem[];
    current_page: number;
    last_page: number;
  };
  categories: string[];
}

export default function Index({
  restaurant,
  menu,
  menuItems,
  categories,
}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deletingId) {
      const deleteUrl = menu
        ? route('restaurants.menus.menu-items.destroy', [
            restaurant.id,
            menu.id,
            deletingId,
          ])
        : route('restaurants.menu-items.destroy', [restaurant.id, deletingId]);

      router.delete(deleteUrl);
      setDeletingId(null);
    }
  };

  const menuItemsUrl = menu
    ? route('restaurants.menus.menu-items.index', [restaurant.id, menu.id])
    : route('restaurants.menu-items.index', restaurant.id);

  return (
    <>
      <Head title={`Menu Items - ${restaurant.name}`} />

      <AuthenticatedLayout
        title="Menu Items"
        subtitle={
          menu ? `Items in ${menu.name}` : `All items for ${restaurant.name}`
        }
        actions={
          <Link href={route('restaurants.menu-items.create', restaurant.id)}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </Link>
        }
      >
        <div className="py-12">
          <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
            {categories.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-4">
                {categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            )}

            <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menuItems.data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>${item.price}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.is_available ? 'default' : 'secondary'
                              }
                            >
                              {item.is_available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Link
                                href={route('restaurants.menu-items.edit', [
                                  restaurant.id,
                                  item.id,
                                ])}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => setDeletingId(item.id)}
                                  >
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete the menu item.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      onClick={() => setDeletingId(null)}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={handleDelete}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
