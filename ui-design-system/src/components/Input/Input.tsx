import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full rounded-md border-2 border-retro-black bg-retro-white text-retro-black font-medium transition-all duration-100 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-retro-black placeholder:text-retro-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-retro-none disabled:translate-x-0 disabled:translate-y-0',
  {
    variants: {
      variant: {
        default:
          'shadow-retro focus:shadow-retro-lg focus:translate-x-[-1px] focus:translate-y-[-1px]',
        error:
          'border-retro-red shadow-[3px_3px_0px_0px_var(--color-retro-red)] focus:shadow-[4px_4px_0px_0px_var(--color-retro-red)]',
        success:
          'border-retro-green shadow-[3px_3px_0px_0px_var(--color-retro-green)] focus:shadow-[4px_4px_0px_0px_var(--color-retro-green)]',
      },
      inputSize: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      variant,
      inputSize,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId()
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const computedVariant = error ? 'error' : variant

    return (
      <div className={cn('flex flex-col gap-2', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-bold uppercase tracking-wide text-retro-black',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-retro-gray [&_svg]:size-4">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ variant: computedVariant, inputSize, className }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-retro-gray [&_svg]:size-4">
              {rightIcon}
            </div>
          )}
        </div>
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
Input.displayName = 'Input'

export { Input, inputVariants }
