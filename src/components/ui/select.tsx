import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'ext-flex ext-h-9 ext-w-full ext-items-center ext-justify-between ext-rounded-md ext-border ext-border-input ext-bg-transparent ext-px-3 ext-py-2 ext-text-sm ext-ring-offset-background ext-placeholder:text-muted-foreground ext-focus:outline-none ext-focus:ring-2 ext-focus:ring-ring ext-focus:ring-offset-2 ext-disabled:cursor-not-allowed ext-disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="ext-h-4 ext-w-4 ext-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'ext-relative ext-z-50 ext-min-w-[8rem] ext-overflow-hidden ext-rounded-md ext-border ext-bg-popover ext-text-popover-foreground ext-shadow-md data-[state=open]:ext-animate-in data-[state=closed]:ext-animate-out data-[state=closed]:ext-fade-out-0 data-[state=open]:ext-fade-in-0 data-[state=closed]:ext-zoom-out-95 data-[state=open]:ext-zoom-in-95 data-[side=bottom]:ext-slide-in-from-top-2 data-[side=left]:ext-slide-in-from-right-2 data-[side=right]:ext-slide-in-from-left-2 data-[side=top]:ext-slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:ext-translate-y-1 data-[side=left]:ext-translate-x-1 data-[side=right]:ext-translate-x-1 data-[side=top]:ext-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'ext-p-1',
          position === 'popper' &&
            'ext-h-[var(--radix-select-trigger-height)] ext-w-full ext-min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('ext-py-1.5 ext-pl-8 ext-pr-2 ext-text-sm ext-font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'ext-relative ext-flex ext-w-full ext-cursor-default ext-select-none ext-items-center ext-rounded-sm ext-py-1.5 ext-pl-8 ext-pr-2 ext-text-sm ext-outline-none ext-focus:bg-accent ext-focus:text-accent-foreground data-[disabled]:ext-pointer-events-none data-[disabled]:ext-opacity-50',
      className,
    )}
    {...props}
  >
    <span className="ext-absolute ext-left-2 ext-flex ext-h-3.5 ext-w-3.5 ext-items-center ext-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="ext-h-4 ext-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-ext-mx-1 ext-my-1 ext-h-px ext-bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator };
