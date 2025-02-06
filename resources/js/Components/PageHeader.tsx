import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showBackButton?: boolean;
  backUrl?: string;
}

export default function PageHeader({
  title,
  subtitle,
  actions,
  showBackButton,
  backUrl,
}: PageHeaderProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            {showBackButton && backUrl && (
              <Link
                href={backUrl}
                className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK
              </Link>
            )}
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="ml-4 flex items-center gap-3">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
