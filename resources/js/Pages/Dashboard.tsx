import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
  BarChart3,
  Calendar,
  ChefHat,
  ClipboardList,
  FileText,
  Settings,
  Store,
  Users,
  Utensils,
} from 'lucide-react';

interface QuickLinkProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  isPrimary?: boolean;
  actionText?: string;
  order?: number;
}

const QuickLink = ({
  title,
  description,
  icon: Icon,
  href,
  actionText = 'Manage',
}: QuickLinkProps) => (
  <Card className="relative h-full overflow-hidden bg-background transition-all duration-200 hover:shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-muted p-2">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" className="w-full" asChild>
        <Link href={href}>{actionText}</Link>
      </Button>
    </CardFooter>
  </Card>
);

const PrimaryCard = ({
  title,
  description,
  icon: Icon,
  href,
  actionText,
}: QuickLinkProps) => (
  <Card className="relative flex flex-col overflow-hidden bg-background transition-all duration-200 hover:shadow-lg">
    <CardContent className="h-[320px] flex-1 p-6">
      <div className="flex h-full flex-col items-center gap-4 text-center">
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Access comprehensive tools to manage your {title.toLowerCase()}.
            Streamline operations and maintain full control over your business.
          </p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="mt-auto border-t bg-muted/50 p-6">
      <Button variant="default" size="lg" className="w-full" asChild>
        <Link href={href}>
          {actionText} {title}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="bg-background">
    <CardContent className="flex items-center justify-between py-4">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const secondaryLinks: QuickLinkProps[] = [
    {
      title: 'Orders & Analytics',
      description: 'Track orders and view business insights',
      icon: BarChart3,
      href: route('orders.index'),
      order: 3,
    },
    {
      title: 'Staff Management',
      description: 'Manage employees and their roles',
      icon: Users,
      href: route('staff.index'),
      order: 4,
    },
    {
      title: 'Tables',
      description: 'Manage restaurant tables and seating',
      icon: Calendar,
      href: route('tables.index'),
      order: 5,
    },
    {
      title: 'Kitchen Display',
      description: 'View and manage kitchen orders',
      icon: ClipboardList,
      href: '/kitchen-display',
      order: 6,
    },
    {
      title: 'Profile',
      description: 'Manage your account settings',
      icon: FileText,
      href: route('profile.edit'),
      order: 7,
    },
    {
      title: 'Settings',
      description: 'Configure system preferences',
      icon: Settings,
      href: route('profile.edit'),
      order: 8,
    },
  ].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <AuthenticatedLayout
      title="Welcome Back!"
      subtitle="Manage your restaurant and access key features below"
    >
      <Head title="Dashboard" />

      <div className="py-6">
        <div className="max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {/* Stats Section */}
          {/*
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard title="Today's Orders" value="48" />
              <StatCard title="Active Tables" value="12" />
              <StatCard title="Today's Revenue" value="$1,234" />
            </div>
          */}
          {/* Primary Actions Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PrimaryCard
              title="Restaurant Profile"
              description="Configure your restaurant details, hours, and settings"
              icon={Store}
              href={route('restaurants.index')}
              actionText="Configure"
            />
            <PrimaryCard
              title="Menu Builder"
              description="Create and manage your menu items and categories"
              icon={ChefHat}
              href={route('restaurants.menu-items.index', { restaurant: 1 })}
              actionText="Edit"
            />
            <PrimaryCard
              title="Add Menu Items"
              description="Quickly add new items to your menu"
              icon={Utensils}
              href={route('restaurants.menu-items.create', { restaurant: 1 })}
            />
          </div>

          {/* Secondary Actions Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryLinks.map((link, index) => (
              <QuickLink key={index} {...link} />
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
