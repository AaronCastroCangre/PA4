import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '../Icon'

// Select Root
const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

// Trigger variants
const selectTriggerVariants = cva(
  'flex w-full items-center justify-between gap-2 rounded-lg border-2 border-retro-black bg-retro-white text-retro-black font-medium transition-all duration-100 placeholder:text-retro-gray focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        default:
          'shadow-retro data-[state=open]:shadow-retro-lg data-[state=open]:-translate-x-[1px] data-[state=open]:-translate-y-[1px] focus:shadow-retro-lg focus:-translate-x-[1px] focus:-translate-y-[1px]',
        error:
          'border-retro-red shadow-[3px_3px_0px_0px_var(--color-retro-red)] focus:shadow-[4px_4px_0px_0px_var(--color-retro-red)]',
        success:
          'border-retro-green shadow-[3px_3px_0px_0px_var(--color-retro-green)] focus:shadow-[4px_4px_0px_0px_var(--color-retro-green)]',
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

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size, className }))}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-70 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

// Scroll Buttons
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 bg-retro-white',
      className
    )}
    {...props}
  >
    <ChevronUpIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 bg-retro-white',
      className
    )}
    {...props}
  >
    <ChevronDownIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

// Content
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border-2 border-retro-black bg-retro-white shadow-retro-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

// Label for groups
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'px-3 py-2 text-xs font-bold uppercase tracking-wide text-retro-gray',
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

// Item
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm font-medium outline-none',
      'focus:bg-retro-cream focus:text-retro-black',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'transition-colors duration-100',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4 text-retro-blue" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

// Separator
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-[2px] bg-retro-black/10', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// Collapsible Group
const SelectCollapsible = CollapsiblePrimitive.Root

const SelectCollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & {
    icon?: React.ReactNode
  }
>(({ className, children, icon, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide text-retro-gray outline-none',
      'hover:bg-retro-cream focus:bg-retro-cream',
      'transition-colors duration-100',
      '[&[data-state=open]>svg:last-child]:rotate-180',
      className
    )}
    {...props}
  >
    {icon && <span className="flex h-4 w-4 items-center justify-center">{icon}</span>}
    <span className="flex-1 text-left">{children}</span>
    <ChevronDownIcon className="h-3 w-3 transition-transform duration-200" />
  </CollapsiblePrimitive.Trigger>
))
SelectCollapsibleTrigger.displayName = 'SelectCollapsibleTrigger'

const SelectCollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.Content>
))
SelectCollapsibleContent.displayName = 'SelectCollapsibleContent'

// Collapsible Section wrapper
export interface SelectSectionProps {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

const SelectSection = ({
  title,
  icon,
  defaultOpen = true,
  children,
  className,
}: SelectSectionProps) => (
  <SelectCollapsible defaultOpen={defaultOpen} className={className}>
    <SelectCollapsibleTrigger icon={icon}>
      {title}
    </SelectCollapsibleTrigger>
    <SelectCollapsibleContent>
      <div className="pl-2">
        {children}
      </div>
    </SelectCollapsibleContent>
  </SelectCollapsible>
)
SelectSection.displayName = 'SelectSection'

// Simple Select Field Component (convenience wrapper)
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectFieldProps {
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  options?: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  containerClassName?: string
}

const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  (
    {
      label,
      error,
      helperText,
      placeholder = 'Select an option...',
      options = [],
      value,
      defaultValue,
      onValueChange,
      disabled,
      variant,
      size,
      className,
      containerClassName,
    },
    ref
  ) => {
    const id = React.useId()
    const errorId = `${id}-error`
    const helperId = `${id}-helper`

    const computedVariant = error ? 'error' : variant

    return (
      <div className={cn('flex flex-col gap-2', containerClassName)}>
        {label && (
          <label
            className={cn(
              'text-sm font-bold uppercase tracking-wide text-retro-black',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}
        <Select
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger
            ref={ref}
            variant={computedVariant}
            size={size}
            className={className}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p id={errorId} className="text-xs font-bold uppercase text-retro-red">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-xs text-retro-gray">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
SelectField.displayName = 'SelectField'

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  // Collapsible
  SelectCollapsible,
  SelectCollapsibleTrigger,
  SelectCollapsibleContent,
  SelectSection,
  // Convenience wrapper
  SelectField,
  // Variants
  selectTriggerVariants,
}
