import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { CloseIcon } from '../Icon'

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalClose = DialogPrimitive.Close

// Overlay
const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-retro-black/60 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

// Content variants
const modalContentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] border-3 border-retro-black bg-retro-white shadow-retro-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  {
    variants: {
      size: {
        sm: 'w-full max-w-sm rounded-lg',
        md: 'w-full max-w-md rounded-lg',
        lg: 'w-full max-w-lg rounded-xl',
        xl: 'w-full max-w-xl rounded-xl',
        full: 'w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-none rounded-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean
  overlayClassName?: string
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size, showCloseButton = true, overlayClassName, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay className={overlayClassName} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalContentVariants({ size, className }))}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg border-2 border-retro-black bg-retro-white p-1.5 shadow-retro-sm opacity-70 transition-all hover:opacity-100 hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none focus:outline-none disabled:pointer-events-none">
          <CloseIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

// Header
const modalHeaderVariants = cva('flex flex-col gap-1.5 text-center sm:text-left', {
  variants: {
    variant: {
      default: 'p-6 pb-4',
      gradient: 'p-6 pb-4 -mx-[1px] -mt-[1px] rounded-t-lg border-b-2 border-retro-black',
    },
    gradient: {
      none: '',
      blue: 'bg-gradient-retro-blue text-retro-white',
      green: 'bg-gradient-retro-green text-retro-white',
      yellow: 'bg-gradient-retro-yellow text-retro-black',
      red: 'bg-gradient-retro-red text-retro-white',
      pink: 'bg-gradient-retro-pink text-retro-white',
      purple: 'bg-gradient-retro-purple text-retro-white',
      orange: 'bg-gradient-retro-orange text-retro-white',
      sunset: 'bg-gradient-retro-sunset text-retro-white',
      ocean: 'bg-gradient-retro-ocean text-retro-white',
    },
  },
  defaultVariants: {
    variant: 'default',
    gradient: 'none',
  },
})

export interface ModalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalHeaderVariants> {}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, variant, gradient, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        modalHeaderVariants({
          variant: gradient !== 'none' ? 'gradient' : variant,
          gradient,
          className,
        })
      )}
      {...props}
    />
  )
)
ModalHeader.displayName = 'ModalHeader'

// Footer
const modalFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 pt-4',
  {
    variants: {
      border: {
        true: 'border-t-2 border-retro-black/10',
        false: '',
      },
    },
    defaultVariants: {
      border: false,
    },
  }
)

export interface ModalFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalFooterVariants> {}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, border, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(modalFooterVariants({ border, className }))}
      {...props}
    />
  )
)
ModalFooter.displayName = 'ModalFooter'

// Title
const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-xl font-bold uppercase tracking-wide',
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

// Description
const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm opacity-80', className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

// Body
const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-6 py-2', className)} {...props} />
))
ModalBody.displayName = 'ModalBody'

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
}
