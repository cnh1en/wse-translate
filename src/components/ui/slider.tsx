import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('ext-relative ext-flex ext-w-full ext-touch-none ext-select-none ext-items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="ext-relative ext-h-1.5 ext-w-full ext-grow ext-overflow-hidden ext-rounded-full ext-bg-primary/20">
      <SliderPrimitive.Range className="ext-absolute ext-h-full ext-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="ext-block ext-h-4 ext-w-4 ext-rounded-full ext-border ext-border-primary/50 ext-bg-background ext-shadow ext-transition-colors focus-visible:ext-outline-none focus-visible:ext-ring-1 focus-visible:ext-ring-ring disabled:ext-pointer-events-none disabled:ext-opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
