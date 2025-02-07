import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Menu, Restaurant } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
  restaurant: Restaurant;
  menu: Menu;
}

export default function Edit({ restaurant, menu }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: menu.name,
    description: menu.description ?? '',
    type: menu.type ?? '',
    is_active: menu.is_active,
    available_from: menu.available_from ?? '',
    available_until: menu.available_until ?? '',
    available_days: menu.available_days ?? [],
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(route('restaurants.menus.update', [restaurant.id, menu.id]));
  }

  return (
    <>
      <Head title={`Edit ${menu.name} - ${restaurant.name}`} />

      <AuthenticatedLayout
        title={`Edit ${menu.name}`}
        subtitle={`Update menu details for ${restaurant.name}`}
      >
        <div className="py-12">
          <div className="mx-auto max-w-2xl space-y-6 sm:px-6 lg:px-8">
            <div className="bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Menu name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Menu description"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    placeholder="lunch, dinner, etc."
                  />
                  {errors.type && (
                    <p className="text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="available_from">Available From</Label>
                    <Input
                      id="available_from"
                      type="time"
                      value={data.available_from}
                      onChange={(e) =>
                        setData('available_from', e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="available_until">Available Until</Label>
                    <Input
                      id="available_until"
                      type="time"
                      value={data.available_until}
                      onChange={(e) =>
                        setData('available_until', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', checked)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="ml-4" disabled={processing}>
                    Update Menu
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
