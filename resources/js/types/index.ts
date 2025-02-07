export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  // Add other restaurant properties as needed
}

export interface Menu {
  id: number;
  name: string;
  // ... other menu properties
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: number;
  is_available: boolean;
  preparation_time?: number;
  notes?: string;
  options?: string[];
}

// ... other existing types
