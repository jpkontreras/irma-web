import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OnboardingLayout from '@/Layouts/OnboardingLayout';
import { useForm } from '@inertiajs/react';

export default function RestaurantSetup() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    address: '',
    phone: '',
    timezone: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('onboarding.restaurant-setup.store'));
  }

  return (
    <OnboardingLayout
      title="Setup Your Restaurant"
      subtitle="Add your first restaurant location"
    >
      <Card>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Enter restaurant name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                placeholder="Enter restaurant address"
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={data.timezone}
                onChange={(e) => setData('timezone', e.target.value)}
                placeholder="Select timezone"
              />
              {errors.timezone && (
                <p className="text-sm text-destructive">{errors.timezone}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.href = route('onboarding.skip')}
            >
              Skip for now
            </Button>
            <Button type="submit" disabled={processing}>
              Complete Setup
            </Button>
          </CardFooter>
        </form>
      </Card>
    </OnboardingLayout>
  );
} 