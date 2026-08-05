import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const toastVariants = {
  default: 'border bg-background text-foreground',
  destructive: 'border-destructive bg-destructive text-destructive-foreground',
};

const ToastProvider = ({ children }) => <>{children}</>;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

const Toast = React.forwardRef(({ className, variant = 'default', ...props }, ref) => (
  <li
    ref={ref}
    role="status"
    className={cn(
      'pointer-events-auto relative flex w-full items-center justify-between space-x-4 rounded-lg border p-4 shadow-lg',
      toastVariants[variant],
      className
    )}
    {...props}
  />
));
Toast.displayName = 'Toast';

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = 'ToastAction';

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 transition-opacity hover:text-foreground',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
ToastClose.displayName = 'ToastClose';

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
ToastDescription.displayName = 'ToastDescription';

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
