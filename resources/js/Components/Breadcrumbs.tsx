import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  title: string;
  url?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items?: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items?.length) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight
                className="mx-2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            )}
            {item.url && !item.current ? (
              <Link
                href={item.url}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {item.title}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
