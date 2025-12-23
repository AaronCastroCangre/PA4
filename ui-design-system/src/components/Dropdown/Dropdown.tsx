import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronRightIcon, ChevronDownIcon } from '../Icon'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// Trigger Button with retro styling
const dropdownTriggerVariants = cva(
  'inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-lg border-2 border-retro-black bg-retro-white text-retro-black font-medium transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'shadow-retro hover:shadow-retro-lg hover:-translate-x-0.5 hover:-translate-y-0.5 data-[state=open]:shadow-retro-lg data-[state=open]:-translate-x-0.5 data-[state=open]:-translate-y-0.5',
        outline: 'shadow-none hover:bg-retro-cream',
        ghost: 'border-transparent shadow-none hover:bg-retro-cream hover:border-retro-black',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface DropdownMenuTriggerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownTriggerVariants> {
  showChevron?: boolean
}

const DropdownMenuTriggerButton = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerButtonProps
>(({ className, variant, size, showChevron = true, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn(dropdownTriggerVariants({ variant, size, className }))}
    {...props}
  >
    {children}
    {showChevron && (
      <svg
        className="h-4 w-4 opacity-70 transition-transform duration-200 [[data-state=open]>&]:rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )}
  </DropdownMenuPrimitive.Trigger>
))
DropdownMenuTriggerButton.displayName = 'DropdownMenuTriggerButton'

// Sub Trigger
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-none',
      'focus:bg-retro-cream data-[state=open]:bg-retro-cream',
      'transition-colors duration-100',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

// Sub Content
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-lg border-2 border-retro-black bg-retro-white p-1 shadow-retro-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

// Content
const dropdownContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-lg border-2 border-retro-black bg-retro-white p-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'shadow-retro-lg',
        elevated: 'shadow-retro-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropdownContentVariants> {}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, variant, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownContentVariants({ variant, className }))}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

// Item
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    destructive?: boolean
  }
>(({ className, inset, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors duration-100',
      'focus:bg-retro-cream focus:text-retro-black',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      destructive && 'text-retro-red focus:bg-retro-red/10 focus:text-retro-red',
      inset && 'pl-8',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

// Checkbox Item
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm font-medium outline-none transition-colors duration-100',
      'focus:bg-retro-cream focus:text-retro-black',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4 text-retro-blue" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

// Radio Item
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm font-medium outline-none transition-colors duration-100',
      'focus:bg-retro-cream focus:text-retro-black',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <div className="h-2 w-2 rounded-full bg-retro-blue" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

// Label
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-3 py-2 text-xs font-bold uppercase tracking-wide text-retro-gray',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

// Separator
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-[2px] bg-retro-black/10', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

// Shortcut
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'ml-auto text-xs tracking-widest text-retro-gray bg-retro-cream px-1.5 py-0.5 rounded border border-retro-black/20',
      className
    )}
    {...props}
  />
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

// Icon wrapper for items
const DropdownMenuItemIcon = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('flex h-5 w-5 items-center justify-center', className)}
    {...props}
  >
    {children}
  </span>
)
DropdownMenuItemIcon.displayName = 'DropdownMenuItemIcon'

// Collapsible Section
const DropdownMenuCollapsible = CollapsiblePrimitive.Root

export interface DropdownMenuCollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> {
  icon?: React.ReactNode
}

const DropdownMenuCollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  DropdownMenuCollapsibleTriggerProps
>(({ className, children, icon, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wide text-retro-black outline-none',
      'hover:bg-retro-cream focus:bg-retro-cream',
      'transition-colors duration-100',
      '[&[data-state=open]>svg:last-child]:rotate-180',
      className
    )}
    {...props}
  >
    {icon && <span className="flex h-4 w-4 items-center justify-center">{icon}</span>}
    <span className="flex-1 text-left">{children}</span>
    <ChevronDownIcon className="h-4 w-4 transition-transform duration-200" />
  </CollapsiblePrimitive.Trigger>
))
DropdownMenuCollapsibleTrigger.displayName = 'DropdownMenuCollapsibleTrigger'

const DropdownMenuCollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1',
      className
    )}
    {...props}
  >
    <div className="pl-4 border-l-2 border-retro-black/10 ml-3 mt-1 mb-1">
      {children}
    </div>
  </CollapsiblePrimitive.Content>
))
DropdownMenuCollapsibleContent.displayName = 'DropdownMenuCollapsibleContent'

// Collapsible Section wrapper for easy use
export interface DropdownMenuSectionProps {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

const DropdownMenuSection = ({
  title,
  icon,
  defaultOpen = false,
  children,
  className,
}: DropdownMenuSectionProps) => (
  <DropdownMenuCollapsible defaultOpen={defaultOpen} className={className}>
    <DropdownMenuCollapsibleTrigger icon={icon}>
      {title}
    </DropdownMenuCollapsibleTrigger>
    <DropdownMenuCollapsibleContent>
      {children}
    </DropdownMenuCollapsibleContent>
  </DropdownMenuCollapsible>
)
DropdownMenuSection.displayName = 'DropdownMenuSection'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuTriggerButton,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuItemIcon,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  // Collapsible sections
  DropdownMenuCollapsible,
  DropdownMenuCollapsibleTrigger,
  DropdownMenuCollapsibleContent,
  DropdownMenuSection,
}
