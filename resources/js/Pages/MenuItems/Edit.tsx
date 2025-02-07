import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Menu, MenuItem, Restaurant } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
  restaurant: Restaurant;
  menuItem: MenuItem;
  menu?: Menu;
  categories: string[];
}

export default function Edit({
  restaurant,
  menuItem,
  menu,
  categories,
}: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: menuItem.name,
    description: menuItem.description ?? '',
    price: menuItem.price.toString(),
    category: menuItem.category,
    is_available: menuItem.is_available,
    preparation_time: menuItem.preparation_time?.toString() ?? '',
    notes: menuItem.notes ?? '',
    options: menuItem.options ?? [],
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const route = menu
      ? route('restaurants.menus.menu-items.update', [
          restaurant.id,
          menu.id,
          menuItem.id,
        ])
      : route('restaurants.menu-items.update', [restaurant.id, menuItem.id]);

    put(route);
  }

  return (
    <>
      <Head title={`Edit ${menuItem.name} - ${restaurant.name}`} />

      <AuthenticatedLayout
        title={`Edit ${menuItem.name}`}
        subtitle={`Update menu item details for ${restaurant.name}`}
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
                    placeholder="Item name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Item description"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={data.price}
                      onChange={(e) => setData('price', e.target.value)}
                      placeholder="0.00"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preparation_time">
                      Preparation Time (mins)
                    </Label>
                    <Input
                      id="preparation_time"
                      type="number"
                      value={data.preparation_time}
                      onChange={(e) =>
                        setData('preparation_time', e.target.value)
                      }
                      placeholder="15"
                    />
                    {errors.preparation_time && (
                      <p className="text-sm text-red-600">
                        {errors.preparation_time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    placeholder="Category"
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                  {errors.category && (
                    <p className="text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder="Additional notes"
                  />
                  {errors.notes && (
                    <p className="text-sm text-red-600">{errors.notes}</p>
                  )}
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="is_available">Available</Label>
                  </div>
                  <Switch
                    id="is_available"
                    checked={data.is_available}
                    onCheckedChange={(checked) =>
                      setData('is_available', checked)
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="ml-4" disabled={processing}>
                    Update Item
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
