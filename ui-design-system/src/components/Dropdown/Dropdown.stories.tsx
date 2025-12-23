import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuSection,
  DropdownMenuCollapsible,
  DropdownMenuCollapsibleTrigger,
  DropdownMenuCollapsibleContent,
} from './Dropdown'
import { Button } from '../Button'
import {
  UserIcon,
  SettingsIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  MailIcon,
  PlusIcon,
  MoreVerticalIcon,
  HelpIcon,
  HomeIcon,
  StarIcon,
  EyeIcon,
  DownloadIcon,
} from '../Icon'

const meta = {
  title: 'Components/Dropdown',
  component: DropdownMenu,
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
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

// Basic Dropdown
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        Open Menu
      </DropdownMenuTriggerButton>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// With Icons
export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        My Account
      </DropdownMenuTriggerButton>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MailIcon className="mr-2 h-4 w-4" />
          Messages
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HelpIcon className="mr-2 h-4 w-4" />
          Help
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// With Shortcuts
export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        Edit
      </DropdownMenuTriggerButton>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon className="mr-2 h-4 w-4" />
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// With Checkboxes
export const WithCheckboxes: Story = {
  render: function CheckboxExample() {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTriggerButton>
          View Options
        </DropdownMenuTriggerButton>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// With Radio Items
export const WithRadioItems: Story = {
  render: function RadioExample() {
    const [position, setPosition] = useState('bottom')

    return (
      <DropdownMenu>
        <DropdownMenuTriggerButton>
          Panel Position
        </DropdownMenuTriggerButton>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// With Submenus
export const WithSubmenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        Options
      </DropdownMenuTriggerButton>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <HomeIcon className="mr-2 h-4 w-4" />
          Home
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserIcon className="mr-2 h-4 w-4" />
            Users
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>View All</DropdownMenuItem>
            <DropdownMenuItem>Add New</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Import</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>General</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HelpIcon className="mr-2 h-4 w-4" />
          Help
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Trigger Variants
export const TriggerVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <DropdownMenu>
        <DropdownMenuTriggerButton variant="default">
          Default
        </DropdownMenuTriggerButton>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTriggerButton variant="outline">
          Outline
        </DropdownMenuTriggerButton>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTriggerButton variant="ghost">
          Ghost
        </DropdownMenuTriggerButton>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

// Trigger Sizes
export const TriggerSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTriggerButton size="sm">
          Small
        </DropdownMenuTriggerButton>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTriggerButton size="md">
          Medium
        </DropdownMenuTriggerButton>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTriggerButton size="lg">
          Large
        </DropdownMenuTriggerButton>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

// Icon Button Trigger
export const IconButtonTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <EyeIcon className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StarIcon className="mr-2 h-4 w-4" />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Custom Button Trigger
export const CustomButtonTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          New User
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HomeIcon className="mr-2 h-4 w-4" />
          New Project
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MailIcon className="mr-2 h-4 w-4" />
          New Message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Destructive Items
export const DestructiveItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        Actions
      </DropdownMenuTriggerButton>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Restaurant Actions Example
export const RestaurantActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Pedido #123</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <EyeIcon className="mr-2 h-4 w-4" />
          Ver Detalles
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EditIcon className="mr-2 h-4 w-4" />
          Editar Pedido
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <TrashIcon className="mr-2 h-4 w-4" />
          Cancelar Pedido
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// User Menu Example
export const UserMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border-2 border-retro-black bg-retro-white px-3 py-2 shadow-retro hover:shadow-retro-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
          <div className="w-8 h-8 bg-gradient-retro-blue rounded-full border-2 border-retro-black flex items-center justify-center">
            <UserIcon className="h-4 w-4 text-retro-white" />
          </div>
          <span className="text-sm font-medium">Carlos M.</span>
          <svg className="h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Carlos Martinez</span>
            <span className="text-xs font-normal text-retro-gray">carlos@restaurant.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          Mi Perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4" />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Collapsible Sections
export const WithCollapsibleSections: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        Menu with Sections
      </DropdownMenuTriggerButton>
      <DropdownMenuContent className="w-64">
        <DropdownMenuSection title="Account" icon={<UserIcon />} defaultOpen>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuSection>

        <DropdownMenuSeparator />

        <DropdownMenuSection title="Actions" icon={<EditIcon />}>
          <DropdownMenuItem>New Project</DropdownMenuItem>
          <DropdownMenuItem>Import</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
        </DropdownMenuSection>

        <DropdownMenuSeparator />

        <DropdownMenuSection title="Help" icon={<HelpIcon />}>
          <DropdownMenuItem>Documentation</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem>Feedback</DropdownMenuItem>
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Multiple Collapsible Sections
export const CollapsibleCategories: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        Categories
      </DropdownMenuTriggerButton>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSection title="Entradas" defaultOpen>
          <DropdownMenuItem>Nachos</DropdownMenuItem>
          <DropdownMenuItem>Ensalada</DropdownMenuItem>
          <DropdownMenuItem>Sopa del día</DropdownMenuItem>
        </DropdownMenuSection>

        <DropdownMenuSection title="Platos Principales">
          <DropdownMenuItem>Hamburguesa</DropdownMenuItem>
          <DropdownMenuItem>Pizza</DropdownMenuItem>
          <DropdownMenuItem>Pasta</DropdownMenuItem>
          <DropdownMenuItem>Tacos</DropdownMenuItem>
        </DropdownMenuSection>

        <DropdownMenuSection title="Bebidas">
          <DropdownMenuItem>Refrescos</DropdownMenuItem>
          <DropdownMenuItem>Jugos</DropdownMenuItem>
          <DropdownMenuItem>Café</DropdownMenuItem>
        </DropdownMenuSection>

        <DropdownMenuSection title="Postres">
          <DropdownMenuItem>Helado</DropdownMenuItem>
          <DropdownMenuItem>Pastel</DropdownMenuItem>
          <DropdownMenuItem>Flan</DropdownMenuItem>
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Custom Collapsible with primitives
export const CustomCollapsible: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTriggerButton>
        Settings
      </DropdownMenuTriggerButton>
      <DropdownMenuContent className="w-64">
        <DropdownMenuCollapsible defaultOpen>
          <DropdownMenuCollapsibleTrigger icon={<SettingsIcon />}>
            General
          </DropdownMenuCollapsibleTrigger>
          <DropdownMenuCollapsibleContent>
            <DropdownMenuItem>Language</DropdownMenuItem>
            <DropdownMenuItem>Theme</DropdownMenuItem>
            <DropdownMenuItem>Timezone</DropdownMenuItem>
          </DropdownMenuCollapsibleContent>
        </DropdownMenuCollapsible>

        <DropdownMenuSeparator />

        <DropdownMenuCollapsible>
          <DropdownMenuCollapsibleTrigger icon={<UserIcon />}>
            Privacy
          </DropdownMenuCollapsibleTrigger>
          <DropdownMenuCollapsibleContent>
            <DropdownMenuCheckboxItem checked>
              Show online status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              Allow notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>
              Data sharing
            </DropdownMenuCheckboxItem>
          </DropdownMenuCollapsibleContent>
        </DropdownMenuCollapsible>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Retro Showcase
export const RetroShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-retro-cream rounded-lg min-w-[400px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Retro Dropdowns</h2>

      <div className="flex flex-wrap gap-4">
        <DropdownMenu>
          <DropdownMenuTriggerButton>
            Actions
          </DropdownMenuTriggerButton>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon className="mr-2 h-4 w-4" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="success">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>New Order</DropdownMenuItem>
            <DropdownMenuItem>New Table</DropdownMenuItem>
            <DropdownMenuItem>New Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem destructive>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
