import { Config } from 'ziggy-js';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  operating_hours: Record<string, string> | null;
  is_active: boolean;
  timezone: string;
  user_id: number;
  user?: User;
  menus?: Menu[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Menu {
  id: number;
  restaurant_id: number;
  name: string;
  slug: string;
  description: string | null;
  type: string | null;
  is_active: boolean;
  available_from: string | null;
  available_until: string | null;
  available_days: string[] | null;
  categories_order: string[] | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PageProps<T = Record<string, unknown>> {
  auth: {
    user: {
      name: string;
      organization?: {
        name: string;
        description?: string;
      };
    };
  };
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  [key: string]: unknown;
  props: T;
}
