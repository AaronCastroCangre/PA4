import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold uppercase tracking-wide border-2 border-retro-black transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-retro-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-x-[3px] active:translate-y-[3px] active:shadow-retro-none',
  {
    variants: {
      variant: {
        primary:
          'bg-retro-blue text-white shadow-retro hover:bg-retro-blue-dark',
        secondary:
          'bg-retro-cream text-retro-black shadow-retro hover:bg-retro-yellow/30',
        outline:
          'bg-retro-white text-retro-black shadow-retro hover:bg-retro-cream',
        ghost:
          'border-transparent bg-transparent text-retro-black shadow-none hover:bg-retro-cream hover:border-retro-black hover:shadow-retro',
        destructive:
          'bg-retro-red text-white shadow-retro hover:bg-retro-red-dark',
        success:
          'bg-retro-green text-white shadow-retro hover:bg-retro-green-dark',
        warning:
          'bg-retro-yellow text-retro-black shadow-retro hover:bg-retro-yellow-dark',
        pink:
          'bg-retro-pink text-white shadow-retro hover:bg-retro-pink-dark',
        purple:
          'bg-retro-purple text-white shadow-retro hover:bg-retro-purple-dark',
        orange:
          'bg-retro-orange text-white shadow-retro hover:bg-retro-orange-dark',
        cyan:
          'bg-retro-cyan text-white shadow-retro hover:bg-retro-cyan-dark',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
