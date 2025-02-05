import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-gray-100 pt-6 dark:bg-gray-900 sm:pt-0">
      {children}
    </div>
  );
}
