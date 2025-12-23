import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
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
      options: ['default', 'error', 'success'],
      description: 'The visual style of the input',
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Basic
export const Default: Story = {
  args: {
    placeholder: 'Enter a value...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    helperText: 'Must be at least 8 characters',
  },
}

// States
export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address',
  },
}

export const SuccessState: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    defaultValue: 'retrouser',
    variant: 'success',
    helperText: 'Username is available!',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    disabled: true,
  },
}

export const DisabledWithValue: Story = {
  args: {
    label: 'Email',
    defaultValue: 'readonly@example.com',
    disabled: true,
  },
}

// Sizes
export const Small: Story = {
  args: {
    placeholder: 'Small input',
    inputSize: 'sm',
  },
}

export const Medium: Story = {
  args: {
    placeholder: 'Medium input',
    inputSize: 'md',
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    inputSize: 'lg',
  },
}

// With icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
)

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
)

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
  </svg>
)

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: <SearchIcon />,
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    rightIcon: <EyeIcon />,
  },
}

export const EmailWithIcon: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    leftIcon: <MailIcon />,
  },
}

// Types
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    leftIcon: <LockIcon />,
  },
}

export const Number: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
  },
}

// Retro Showcase
export const RetroShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-retro-cream rounded-lg min-w-[400px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Retro Inputs</h2>

      <div className="space-y-6">
        <Input
          label="Username"
          placeholder="Enter your username..."
        />

        <Input
          label="Email"
          placeholder="you@example.com"
          leftIcon={<MailIcon />}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password..."
          leftIcon={<LockIcon />}
          rightIcon={<EyeIcon />}
        />

        <Input
          label="Search"
          placeholder="Search anything..."
          leftIcon={<SearchIcon />}
        />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-auto">
        <Story />
      </div>
    ),
  ],
}

// All States Showcase
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-retro-cream rounded-lg min-w-[400px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Input States</h2>

      <div className="space-y-6">
        <Input
          label="Default"
          placeholder="Default input..."
        />

        <Input
          label="With Value"
          defaultValue="Hello World!"
        />

        <Input
          label="Success"
          defaultValue="valid-username"
          variant="success"
          helperText="Looking good!"
        />

        <Input
          label="Error"
          defaultValue="bad input"
          error="This field has an error"
        />

        <Input
          label="Disabled"
          placeholder="Cannot edit..."
          disabled
        />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-auto">
        <Story />
      </div>
    ),
  ],
}

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-retro-cream rounded-lg min-w-[400px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Input Sizes</h2>

      <Input
        label="Small"
        placeholder="Small input"
        inputSize="sm"
      />

      <Input
        label="Medium (Default)"
        placeholder="Medium input"
        inputSize="md"
      />

      <Input
        label="Large"
        placeholder="Large input"
        inputSize="lg"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-auto">
        <Story />
      </div>
    ),
  ],
}
