import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { ChevronUp, LayoutDashboard, LogOut, User2 } from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-4 py-2">
            <Link href="/" className="flex items-center">
              <img
                src="/images/good.svg"
                alt="IRMA Logo"
                className="size-full w-auto dark:invert"
              />
            </Link>
          </SidebarHeader>

          <SidebarContent className="px-2">
            {/* Main Navigation */}

            <SidebarMenu className="space-y-2 py-4">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={route().current('dashboard')}
                  className="w-full px-3 py-2"
                >
                  <Link
                    href={route('dashboard')}
                    className="flex items-center gap-3"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Commented out until routes are implemented */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={route().current('users.*')}
                >
                  <Link href={route('users.index')}>
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={route().current('settings.*')}
                >
                  <Link href={route('settings.index')}>
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full px-3 py-2">
                      <User2 className="h-5 w-5" />
                      <span className="flex-1 text-left">{user.name}</span>
                      <ChevronUp className="h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-2"
                      >
                        <User2 className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex w-full flex-col">
          {/* Top Navigation */}
          <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center gap-4">
                <SidebarTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" />
                {header}
              </div>
            </div>
          </nav>
          <main className="w-full flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
