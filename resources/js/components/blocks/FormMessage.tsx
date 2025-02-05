import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const FormMessageError = ({
  className,
  message,
  ...props
}: PropsWithChildren<{
  className?: string;
  message?: string;
}>) => {
  return (
    <p
      className={cn('mt-1 text-xs font-medium text-destructive', className)}
      {...props}
    >
      {message || props.children}
    </p>
  );
};
FormMessageError.displayName = 'FormMessageError';

export default FormMessageError;
