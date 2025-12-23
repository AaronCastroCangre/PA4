import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalClose,
} from './Modal'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#FEF9E7' },
        { name: 'white', value: '#FFFEF5' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// Basic Modal
export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a description of what this modal does.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black">
            This is the main content of the modal. You can put any content here including forms, images, or other components.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button>Continue</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

// Sizes
export const SmallSize: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Small Modal</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Small Modal</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black">This is a small modal.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button>Got it</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const LargeSize: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Large Modal</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Large Modal</ModalTitle>
          <ModalDescription>This modal has more space for content.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black">
            This is a larger modal that can accommodate more content. Perfect for forms, detailed information, or complex interactions.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const ExtraLargeSize: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>XL Modal</Button>
      </ModalTrigger>
      <ModalContent size="xl">
        <ModalHeader>
          <ModalTitle>Extra Large Modal</ModalTitle>
          <ModalDescription>Perfect for complex forms and detailed content.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Phone" type="tel" placeholder="+1 234 567 890" />
          </div>
        </ModalBody>
        <ModalFooter border>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button>Save Contact</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

// With Gradient Headers
export const GradientBlue: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="primary">Blue Header</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader gradient="blue">
          <ModalTitle>Information</ModalTitle>
          <ModalDescription>Important details about your account.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black">
            Your account has been updated successfully.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button>Got it</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const GradientGreen: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="success">Success Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader gradient="green">
          <ModalTitle>Success!</ModalTitle>
          <ModalDescription>Your action was completed successfully.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-retro-green/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-retro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-retro-black">
              Your order has been placed successfully!
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="success">Continue</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const GradientRed: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader gradient="red">
          <ModalTitle>Confirm Deletion</ModalTitle>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black">
            Are you sure you want to delete this item? This will permanently remove it from your account.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button variant="destructive">Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const GradientSunset: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="orange">Sunset Header</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader gradient="sunset">
          <ModalTitle>Welcome!</ModalTitle>
          <ModalDescription>Thanks for joining us today.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black">
            We're excited to have you here. Let's get started!
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button>Let's Go</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

// Form Modal
export const FormModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>New Order</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader gradient="blue">
          <ModalTitle>Nuevo Pedido</ModalTitle>
          <ModalDescription>Ingresa los detalles del pedido</ModalDescription>
        </ModalHeader>
        <ModalBody className="space-y-4 py-4">
          <Select
            label="Mesa"
            placeholder="Seleccionar mesa..."
            options={[
              { value: '1', label: 'Mesa 1' },
              { value: '2', label: 'Mesa 2' },
              { value: '3', label: 'Mesa 3' },
              { value: '4', label: 'Mesa 4' },
            ]}
          />
          <Input
            label="Nombre del Cliente"
            placeholder="Nombre (opcional)"
          />
          <div>
            <label className="block text-sm font-bold uppercase tracking-wide text-retro-black mb-2">
              Platos
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Hamburguesa', 'Pizza', 'Ensalada', 'Pasta'].map((plato) => (
                <label
                  key={plato}
                  className="flex items-center gap-2 p-3 rounded-lg border-2 border-retro-black bg-retro-white shadow-retro-sm cursor-pointer hover:shadow-retro transition-all"
                >
                  <input type="checkbox" className="sr-only" />
                  <span className="text-sm font-medium">{plato}</span>
                </label>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter border>
          <ModalClose asChild>
            <Button variant="outline">Cancelar</Button>
          </ModalClose>
          <Button>Crear Pedido</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

// Confirmation Modal
export const ConfirmationModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="warning">Cancel Order</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader gradient="yellow">
          <ModalTitle>Cancel Order?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black text-center">
            Are you sure you want to cancel order #123? The kitchen will be notified.
          </p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <ModalClose asChild>
            <Button variant="outline">Keep Order</Button>
          </ModalClose>
          <Button variant="warning">Yes, Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

// Without Close Button
export const NoCloseButton: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Required Action</Button>
      </ModalTrigger>
      <ModalContent showCloseButton={false} size="sm">
        <ModalHeader>
          <ModalTitle>Terms of Service</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-retro-black">
            You must accept the terms of service to continue using this application.
          </p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <ModalClose asChild>
            <Button>I Accept</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

// Controlled Modal Example
export const ControlledModal: Story = {
  render: function ControlledModalExample() {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex gap-4">
        <Button onClick={() => setOpen(true)}>Open Controlled Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader gradient="purple">
              <ModalTitle>Controlled Modal</ModalTitle>
              <ModalDescription>This modal is controlled by state.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-retro-black">
                You can control this modal programmatically using the open and onOpenChange props.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                alert('Action performed!')
                setOpen(false)
              }}>
                Perform Action
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    )
  },
}

// All Header Gradients
export const AllGradients: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8 bg-retro-cream rounded-lg">
      {[
        { gradient: 'blue' as const, label: 'Blue' },
        { gradient: 'green' as const, label: 'Green' },
        { gradient: 'yellow' as const, label: 'Yellow' },
        { gradient: 'red' as const, label: 'Red' },
        { gradient: 'pink' as const, label: 'Pink' },
        { gradient: 'purple' as const, label: 'Purple' },
        { gradient: 'orange' as const, label: 'Orange' },
        { gradient: 'sunset' as const, label: 'Sunset' },
        { gradient: 'ocean' as const, label: 'Ocean' },
      ].map(({ gradient, label }) => (
        <Modal key={gradient}>
          <ModalTrigger asChild>
            <Button variant="outline" size="sm">{label}</Button>
          </ModalTrigger>
          <ModalContent size="sm">
            <ModalHeader gradient={gradient}>
              <ModalTitle>{label} Header</ModalTitle>
              <ModalDescription>Gradient: {gradient}</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-retro-black text-center">
                This modal uses the {gradient} gradient header.
              </p>
            </ModalBody>
            <ModalFooter className="justify-center">
              <ModalClose asChild>
                <Button>Close</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

// Retro Showcase
export const RetroShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-retro-cream rounded-lg min-w-[400px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Retro Modals</h2>

      <div className="flex flex-wrap gap-4">
        <Modal>
          <ModalTrigger asChild>
            <Button>Default Modal</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Default Style</ModalTitle>
              <ModalDescription>Clean and simple design</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-retro-black">
                The default modal style with retro borders and shadows.
              </p>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button>Close</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal>
          <ModalTrigger asChild>
            <Button variant="success">Success</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader gradient="green">
              <ModalTitle>Order Complete</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-retro-black">
                Your order has been completed!
              </p>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="success">Done</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal>
          <ModalTrigger asChild>
            <Button variant="destructive">Danger</Button>
          </ModalTrigger>
          <ModalContent size="sm">
            <ModalHeader gradient="red">
              <ModalTitle>Delete?</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-retro-black text-center">
                This cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter className="justify-center">
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button variant="destructive">Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
