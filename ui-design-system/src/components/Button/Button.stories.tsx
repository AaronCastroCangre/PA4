import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
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
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning', 'pink', 'purple', 'orange', 'cyan'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Color variants
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
}

export const Pink: Story = {
  args: {
    children: 'Pink',
    variant: 'pink',
  },
}

export const Purple: Story = {
  args: {
    children: 'Purple',
    variant: 'purple',
  },
}

export const Orange: Story = {
  args: {
    children: 'Orange',
    variant: 'orange',
  },
}

export const Cyan: Story = {
  args: {
    children: 'Cyan',
    variant: 'cyan',
  },
}

// Sizes
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
}

// States
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
}

// With icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
)

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
  </svg>
)

export const WithLeftIcon: Story = {
  args: {
    children: 'Add Item',
    leftIcon: <PlusIcon />,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    rightIcon: <ArrowRightIcon />,
    variant: 'success',
  },
}

export const IconOnly: Story = {
  args: {
    children: <HeartIcon />,
    size: 'icon',
    variant: 'pink',
    'aria-label': 'Like',
  },
}

// All Colors Showcase
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-retro-cream rounded-lg">
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="destructive">Destructive</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="pink">Pink</Button>
        <Button variant="purple">Purple</Button>
        <Button variant="orange">Orange</Button>
        <Button variant="cyan">Cyan</Button>
      </div>
    </div>
  ),
}

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8 bg-retro-cream rounded-lg">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" aria-label="Add"><PlusIcon /></Button>
      <Button size="icon" aria-label="Add"><PlusIcon /></Button>
      <Button size="icon-lg" aria-label="Add"><PlusIcon /></Button>
    </div>
  ),
}

// Retro Showcase
export const RetroShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-retro-cream rounded-lg min-w-[500px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Retro Buttons</h2>

      <div className="space-y-4">
        <p className="text-sm font-bold uppercase text-retro-gray">Color Palette</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Blue</Button>
          <Button variant="pink">Pink</Button>
          <Button variant="purple">Purple</Button>
          <Button variant="orange">Orange</Button>
          <Button variant="cyan">Cyan</Button>
          <Button variant="success">Green</Button>
          <Button variant="warning">Yellow</Button>
          <Button variant="destructive">Red</Button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold uppercase text-retro-gray">With Icons</p>
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<PlusIcon />} variant="primary">Add New</Button>
          <Button rightIcon={<ArrowRightIcon />} variant="success">Next Step</Button>
          <Button leftIcon={<HeartIcon />} variant="pink">Like</Button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold uppercase text-retro-gray">States</p>
        <div className="flex flex-wrap gap-3">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>
    </div>
  ),
}
