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
import { Menu, Restaurant } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Clock, Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
  restaurant: Restaurant;
  menus: {
    data: Menu[];
    current_page: number;
    last_page: number;
  };
}

export default function Index({ restaurant, menus }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deletingId) {
      router.delete(
        route('restaurants.menus.destroy', [restaurant.id, deletingId]),
      );
      setDeletingId(null);
    }
  };

  return (
    <>
      <Head title={`Menus - ${restaurant.name}`} />

      <AuthenticatedLayout
        title="Menus"
        subtitle={`Manage menus for ${restaurant.name}`}
        actions={
          <Link href={route('restaurants.menus.create', restaurant.id)}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Menu
            </Button>
          </Link>
        }
      >
        <div className="py-12">
          <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menus.data.map((menu) => (
                        <TableRow key={menu.id}>
                          <TableCell className="font-medium">
                            {menu.name}
                          </TableCell>
                          <TableCell>{menu.type}</TableCell>
                          <TableCell>
                            {(menu.available_from || menu.available_until) && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {menu.available_from} - {menu.available_until}
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={menu.is_active ? 'default' : 'secondary'}
                            >
                              {menu.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Link
                                href={route('restaurants.menus.edit', [
                                  restaurant.id,
                                  menu.id,
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
                                    onClick={() => setDeletingId(menu.id)}
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
                                      permanently delete the menu and all
                                      associated data.
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
