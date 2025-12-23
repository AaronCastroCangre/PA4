import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-lg border-2 border-retro-black bg-retro-white transition-all duration-150',
  {
    variants: {
      variant: {
        default: 'shadow-retro',
        elevated: 'shadow-retro-lg',
        flat: 'shadow-none',
        outline: 'shadow-none bg-transparent',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro-lg',
        grow: 'hover:scale-[1.02] hover:shadow-retro-lg',
        glow: 'hover:shadow-[4px_4px_0px_0px_var(--color-retro-blue)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: 'none',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: 'div' | 'article' | 'section'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, padding, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, hover, padding, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

// Card Header
const cardHeaderVariants = cva('flex flex-col gap-1.5', {
  variants: {
    padding: {
      none: '',
      sm: 'p-3 pb-0',
      md: 'p-4 pb-0',
      lg: 'p-6 pb-0',
    },
  },
  defaultVariants: {
    padding: 'none',
  },
})

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ padding, className }))}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

// Card Title
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-bold uppercase tracking-wide text-retro-black',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

// Card Description
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-retro-gray', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

// Card Content
const cardContentVariants = cva('', {
  variants: {
    padding: {
      none: '',
      sm: 'p-3 pt-3',
      md: 'p-4 pt-4',
      lg: 'p-6 pt-6',
    },
  },
  defaultVariants: {
    padding: 'none',
  },
})

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ padding, className }))}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

// Card Footer
const cardFooterVariants = cva('flex items-center', {
  variants: {
    padding: {
      none: '',
      sm: 'p-3 pt-0',
      md: 'p-4 pt-0',
      lg: 'p-6 pt-0',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    padding: 'none',
    justify: 'start',
  },
})

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ padding, justify, className }))}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

// Card Image
export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  position?: 'top' | 'bottom'
}

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, position = 'top', alt = '', ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn(
        'w-full object-cover',
        position === 'top' && 'rounded-t-md border-b-2 border-retro-black',
        position === 'bottom' && 'rounded-b-md border-t-2 border-retro-black',
        className
      )}
      {...props}
    />
  )
)
CardImage.displayName = 'CardImage'

// Card Badge (for status indicators)
const cardBadgeVariants = cva(
  'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border-2 border-retro-black',
  {
    variants: {
      color: {
        default: 'bg-retro-gray text-retro-white',
        blue: 'bg-gradient-retro-blue text-retro-white',
        green: 'bg-gradient-retro-green text-retro-white',
        yellow: 'bg-gradient-retro-yellow text-retro-black',
        red: 'bg-gradient-retro-red text-retro-white',
        pink: 'bg-gradient-retro-pink text-retro-white',
        purple: 'bg-gradient-retro-purple text-retro-white',
        orange: 'bg-gradient-retro-orange text-retro-white',
        cyan: 'bg-gradient-retro-cyan text-retro-white',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  }
)

export interface CardBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof cardBadgeVariants> {}

const CardBadge = React.forwardRef<HTMLSpanElement, CardBadgeProps>(
  ({ className, color, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(cardBadgeVariants({ color, className }))}
      {...props}
    />
  )
)
CardBadge.displayName = 'CardBadge'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  CardBadge,
  cardVariants,
}
