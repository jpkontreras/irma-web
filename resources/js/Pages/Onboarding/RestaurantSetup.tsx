import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OnboardingLayout from '@/Layouts/OnboardingLayout';
import { useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function RestaurantSetup() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    address: '',
    phone: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('onboarding.restaurant-setup.store'));
  }

  function goBack() {
    post(route('onboarding.reset', { step: 'business-setup' }));
  }

  return (
    <OnboardingLayout
      title="Setup Your Restaurant"
      subtitle="Add your first restaurant location"
      currentStep={3}
      totalSteps={3}
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
          </CardContent>

          <CardFooter className="justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              className="gap-2"
              disabled={processing}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit" disabled={processing}>
              Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </OnboardingLayout>
  );
}
