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
import { Restaurant } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
  Clock,
  Eye,
  Globe,
  Mail,
  Pencil,
  Phone,
  Plus,
  Trash,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
  restaurants: {
    data: Restaurant[];
    current_page: number;
    last_page: number;
  };
}

export default function Index({ restaurants }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deletingId) {
      router.delete(route('restaurants.destroy', deletingId));
      setDeletingId(null);
    }
  };

  return (
    <>
      <Head title="Restaurants" />

      <AuthenticatedLayout
        title="Restaurants"
        subtitle="Manage your restaurants"
        actions={
          <Link href={route('restaurants.create')}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Restaurant
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
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {restaurants.data.map((restaurant) => (
                        <TableRow key={restaurant.id}>
                          <TableCell className="font-medium">
                            {restaurant.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {restaurant.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{restaurant.email}</span>
                                </div>
                              )}
                              {restaurant.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span>{restaurant.phone}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span>{restaurant.timezone}</span>
                              </div>
                              {restaurant.operating_hours && (
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>Has operating hours</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                restaurant.is_active ? 'default' : 'secondary'
                              }
                            >
                              {restaurant.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Link
                                  href={route(
                                    'restaurants.show',
                                    restaurant.id,
                                  )}
                                >
                                  <Eye className="mr-1 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Link
                                  href={route(
                                    'restaurants.edit',
                                    restaurant.id,
                                  )}
                                >
                                  <Pencil className="mr-1 h-4 w-4" />
                                  Edit
                                </Link>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => setDeletingId(restaurant.id)}
                                  >
                                    <Trash className="mr-1 h-4 w-4" />
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
                                      permanently delete the restaurant and all
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
