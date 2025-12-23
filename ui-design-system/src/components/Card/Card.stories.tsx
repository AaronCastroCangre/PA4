import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  CardBadge,
} from './Card'
import { Button } from '../Button'

const meta = {
  title: 'Components/Card',
  component: Card,
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
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'flat', 'outline'],
      description: 'The visual style of the card',
    },
    hover: {
      control: 'select',
      options: ['none', 'lift', 'grow', 'glow'],
      description: 'The hover effect of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'The padding inside the card',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Basic Cards
export const Default: Story = {
  args: {
    children: 'This is a basic card with default styling.',
    className: 'w-80',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This card has an elevated shadow.',
    className: 'w-80',
  },
}

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: 'This card has no shadow.',
    className: 'w-80',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'This card has an outline style with transparent background.',
    className: 'w-80',
  },
}

// Hover Effects
export const HoverLift: Story = {
  args: {
    hover: 'lift',
    children: 'Hover me to see the lift effect!',
    className: 'w-80 cursor-pointer',
  },
}

export const HoverGrow: Story = {
  args: {
    hover: 'grow',
    children: 'Hover me to see the grow effect!',
    className: 'w-80 cursor-pointer',
  },
}

export const HoverGlow: Story = {
  args: {
    hover: 'glow',
    children: 'Hover me to see the glow effect!',
    className: 'w-80 cursor-pointer',
  },
}

// With Subcomponents
export const WithHeader: Story = {
  render: () => (
    <Card className="w-80" padding="none">
      <CardHeader padding="md">
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description with more details.</CardDescription>
      </CardHeader>
      <CardContent padding="md">
        <p className="text-sm text-retro-black">
          This is the main content area of the card. You can put any content here.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80" padding="none">
      <CardHeader padding="md">
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent padding="md">
        <p className="text-sm text-retro-black">
          This action cannot be undone. Please make sure you want to continue.
        </p>
      </CardContent>
      <CardFooter padding="md" justify="end" className="gap-2 pt-4 border-t-2 border-retro-black/10">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Confirm</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-80" padding="none">
      <CardImage
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop"
        alt="Food"
        className="h-40"
      />
      <CardHeader padding="md">
        <CardTitle>Delicious Meal</CardTitle>
        <CardDescription>Fresh and healthy ingredients</CardDescription>
      </CardHeader>
      <CardContent padding="md">
        <p className="text-sm text-retro-black">
          A beautiful plate of fresh vegetables and proteins.
        </p>
      </CardContent>
      <CardFooter padding="md" justify="between" className="pt-4">
        <span className="text-lg font-bold text-retro-black">$24.99</span>
        <Button size="sm">Order Now</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Card className="w-80" padding="none">
      <CardHeader padding="md">
        <div className="flex items-center justify-between">
          <CardTitle>Order #123</CardTitle>
          <CardBadge color="yellow">Pending</CardBadge>
        </div>
        <CardDescription>Mesa 5 - 3 items</CardDescription>
      </CardHeader>
      <CardContent padding="md">
        <ul className="space-y-1 text-sm text-retro-black">
          <li>1x Hamburguesa</li>
          <li>1x Pizza</li>
          <li>1x Refresco</li>
        </ul>
      </CardContent>
      <CardFooter padding="md" justify="end" className="pt-4 border-t-2 border-retro-black/10">
        <Button variant="success" size="sm">Start Preparing</Button>
      </CardFooter>
    </Card>
  ),
}

// Badge Colors
export const AllBadgeColors: Story = {
  render: () => (
    <Card className="w-96 p-6">
      <CardTitle className="mb-4">Badge Colors</CardTitle>
      <div className="flex flex-wrap gap-2">
        <CardBadge color="default">Default</CardBadge>
        <CardBadge color="blue">Blue</CardBadge>
        <CardBadge color="green">Green</CardBadge>
        <CardBadge color="yellow">Yellow</CardBadge>
        <CardBadge color="red">Red</CardBadge>
        <CardBadge color="pink">Pink</CardBadge>
        <CardBadge color="purple">Purple</CardBadge>
        <CardBadge color="orange">Orange</CardBadge>
        <CardBadge color="cyan">Cyan</CardBadge>
      </div>
    </Card>
  ),
}

// Product Card Example
export const ProductCard: Story = {
  render: () => (
    <Card className="w-72" padding="none" hover="lift">
      <CardImage
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop"
        alt="Burger"
        className="h-44"
      />
      <CardHeader padding="md">
        <div className="flex items-start justify-between">
          <CardTitle>Classic Burger</CardTitle>
          <CardBadge color="green">Popular</CardBadge>
        </div>
        <CardDescription>Beef patty, cheese, lettuce, tomato</CardDescription>
      </CardHeader>
      <CardFooter padding="md" justify="between" className="pt-2">
        <span className="text-xl font-bold text-retro-black">$12.99</span>
        <Button size="sm" variant="primary">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
}

// Stats Card Example
export const StatsCard: Story = {
  render: () => (
    <Card className="w-64" hover="lift">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-retro-blue rounded-lg border-2 border-retro-black shadow-retro-sm flex items-center justify-center">
          <svg className="w-6 h-6 text-retro-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-retro-gray">Total Users</p>
          <p className="text-2xl font-bold text-retro-black">12,345</p>
        </div>
      </div>
    </Card>
  ),
}

// Order Card (Restaurant themed)
export const OrderCard: Story = {
  render: () => (
    <Card className="w-80" padding="none">
      <div className="bg-gradient-retro-yellow p-3 rounded-t-md border-b-2 border-retro-black">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase text-retro-black">Mesa 7</span>
          <CardBadge color="yellow">Pendiente</CardBadge>
        </div>
      </div>
      <CardContent padding="md">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-retro-cream border-2 border-retro-black rounded-lg px-3 py-1 text-sm font-medium">
              Hamburguesa
            </span>
            <span className="bg-retro-cream border-2 border-retro-black rounded-lg px-3 py-1 text-sm font-medium">
              Pizza
            </span>
            <span className="bg-retro-cream border-2 border-retro-black rounded-lg px-3 py-1 text-sm font-medium">
              Refresco
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-retro-gray">
            <span>Pedido #456</span>
            <span>•</span>
            <span>Mozo: Carlos</span>
          </div>
        </div>
      </CardContent>
      <CardFooter padding="md" className="border-t-2 border-retro-black/10">
        <Button className="w-full" variant="primary">
          Aceptar Pedido
        </Button>
      </CardFooter>
    </Card>
  ),
}

// Card Grid
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-8 bg-retro-cream rounded-lg">
      {[
        { title: 'Pendientes', count: 5, color: 'yellow' as const, gradient: 'bg-gradient-retro-yellow' },
        { title: 'En Preparación', count: 3, color: 'blue' as const, gradient: 'bg-gradient-retro-blue' },
        { title: 'Listos', count: 8, color: 'green' as const, gradient: 'bg-gradient-retro-green' },
      ].map((stat) => (
        <Card key={stat.title} hover="lift" className="text-center">
          <div className={`w-12 h-12 mx-auto mb-3 ${stat.gradient} rounded-lg border-2 border-retro-black shadow-retro-sm flex items-center justify-center`}>
            <span className="text-xl font-bold text-retro-white">{stat.count}</span>
          </div>
          <p className="text-sm font-bold uppercase text-retro-black">{stat.title}</p>
        </Card>
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
    <div className="flex flex-col gap-8 p-8 bg-retro-cream rounded-lg min-w-[500px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Retro Cards</h2>

      <div className="grid grid-cols-2 gap-4">
        <Card hover="lift">
          <CardTitle>Default Card</CardTitle>
          <CardDescription className="mt-2">With lift hover effect</CardDescription>
        </Card>

        <Card variant="elevated" hover="grow">
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription className="mt-2">With grow hover effect</CardDescription>
        </Card>

        <Card hover="glow">
          <CardTitle>Glow Card</CardTitle>
          <CardDescription className="mt-2">With glow hover effect</CardDescription>
        </Card>

        <Card variant="outline">
          <CardTitle>Outline Card</CardTitle>
          <CardDescription className="mt-2">Transparent background</CardDescription>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
