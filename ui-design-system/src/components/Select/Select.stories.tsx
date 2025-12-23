import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectSection,
  SelectField,
} from './Select'
import { UserIcon, HomeIcon, SettingsIcon } from '../Icon'

const meta = {
  title: 'Components/Select',
  component: Select,
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
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Basic Select
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
          <SelectItem value="option4">Option 4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Using SelectField (Simple API)
export const WithSelectField: Story = {
  render: () => (
    <div className="w-80">
      <SelectField
        label="Country"
        placeholder="Select your country..."
        options={[
          { value: 'mx', label: 'Mexico' },
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'es', label: 'Spain' },
        ]}
      />
    </div>
  ),
}

// With Groups
export const WithGroups: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="potato">Potato</SelectItem>
            <SelectItem value="tomato">Tomato</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

// With Collapsible Sections
export const WithCollapsibleSections: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a dish..." />
        </SelectTrigger>
        <SelectContent>
          <SelectSection title="Entradas" defaultOpen>
            <SelectItem value="nachos">Nachos</SelectItem>
            <SelectItem value="ensalada">Ensalada</SelectItem>
            <SelectItem value="sopa">Sopa del día</SelectItem>
          </SelectSection>

          <SelectSeparator />

          <SelectSection title="Platos Principales" defaultOpen={false}>
            <SelectItem value="hamburguesa">Hamburguesa</SelectItem>
            <SelectItem value="pizza">Pizza</SelectItem>
            <SelectItem value="pasta">Pasta</SelectItem>
            <SelectItem value="tacos">Tacos</SelectItem>
          </SelectSection>

          <SelectSeparator />

          <SelectSection title="Bebidas" defaultOpen={false}>
            <SelectItem value="refresco">Refrescos</SelectItem>
            <SelectItem value="jugo">Jugos</SelectItem>
            <SelectItem value="cafe">Café</SelectItem>
          </SelectSection>

          <SelectSeparator />

          <SelectSection title="Postres" defaultOpen={false}>
            <SelectItem value="helado">Helado</SelectItem>
            <SelectItem value="pastel">Pastel</SelectItem>
            <SelectItem value="flan">Flan</SelectItem>
          </SelectSection>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Restaurant Menu Categories
export const RestaurantMenu: Story = {
  render: () => (
    <div className="w-80">
      <label className="block text-sm font-bold uppercase tracking-wide text-retro-black mb-2">
        Seleccionar Plato
      </label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Elegir del menú..." />
        </SelectTrigger>
        <SelectContent>
          <SelectSection title="Entradas" icon={<span>🥗</span>} defaultOpen>
            <SelectItem value="nachos">Nachos con Queso</SelectItem>
            <SelectItem value="guacamole">Guacamole</SelectItem>
            <SelectItem value="ceviche">Ceviche</SelectItem>
          </SelectSection>

          <SelectSeparator />

          <SelectSection title="Platos Fuertes" icon={<span>🍽️</span>}>
            <SelectItem value="burger">Hamburguesa Clásica</SelectItem>
            <SelectItem value="pizza">Pizza Margherita</SelectItem>
            <SelectItem value="tacos">Tacos al Pastor</SelectItem>
            <SelectItem value="enchiladas">Enchiladas Verdes</SelectItem>
          </SelectSection>

          <SelectSeparator />

          <SelectSection title="Bebidas" icon={<span>🥤</span>}>
            <SelectItem value="agua">Agua Fresca</SelectItem>
            <SelectItem value="refresco">Refresco</SelectItem>
            <SelectItem value="cerveza">Cerveza</SelectItem>
          </SelectSection>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size="md">
          <SelectValue placeholder="Medium (Default)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size="lg">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Variants/States
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <SelectField
        label="Default"
        placeholder="Select..."
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />

      <SelectField
        label="Success"
        placeholder="Select..."
        variant="success"
        helperText="Great choice!"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />

      <SelectField
        label="Error"
        placeholder="Select..."
        error="This field is required"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />

      <SelectField
        label="Disabled"
        placeholder="Select..."
        disabled
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
}

// With Disabled Items
export const WithDisabledItems: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select availability..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="available1">Available Item 1</SelectItem>
          <SelectItem value="unavailable1" disabled>
            Out of Stock
          </SelectItem>
          <SelectItem value="available2">Available Item 2</SelectItem>
          <SelectItem value="unavailable2" disabled>
            Coming Soon
          </SelectItem>
          <SelectItem value="available3">Available Item 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Controlled Select
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState('')

    return (
      <div className="w-80 space-y-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select a mesa..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Mesa 1</SelectItem>
            <SelectItem value="2">Mesa 2</SelectItem>
            <SelectItem value="3">Mesa 3</SelectItem>
            <SelectItem value="4">Mesa 4</SelectItem>
            <SelectItem value="5">Mesa 5</SelectItem>
          </SelectContent>
        </Select>

        <div className="p-3 bg-retro-cream rounded-lg border-2 border-retro-black">
          <p className="text-sm">
            <strong>Selected:</strong> {value || 'None'}
          </p>
        </div>
      </div>
    )
  },
}

// Mesa Selector (Restaurant Example)
export const MesaSelector: Story = {
  render: () => (
    <div className="w-80">
      <SelectField
        label="Número de Mesa"
        placeholder="Seleccionar mesa..."
        helperText="Selecciona la mesa para el pedido"
        options={[
          { value: '1', label: 'Mesa 1 - Ventana' },
          { value: '2', label: 'Mesa 2 - Interior' },
          { value: '3', label: 'Mesa 3 - Terraza' },
          { value: '4', label: 'Mesa 4 - Bar' },
          { value: '5', label: 'Mesa 5 - VIP', disabled: true },
        ]}
      />
    </div>
  ),
}

// With Icons in Sections
export const WithIconsInSections: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select category..." />
        </SelectTrigger>
        <SelectContent>
          <SelectSection title="Account" icon={<UserIcon className="h-3 w-3" />} defaultOpen>
            <SelectItem value="profile">My Profile</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
          </SelectSection>

          <SelectSeparator />

          <SelectSection title="Workspace" icon={<HomeIcon className="h-3 w-3" />}>
            <SelectItem value="projects">Projects</SelectItem>
            <SelectItem value="team">Team</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectSection>

          <SelectSeparator />

          <SelectSection title="System" icon={<SettingsIcon className="h-3 w-3" />}>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="notifications">Notifications</SelectItem>
          </SelectSection>
        </SelectContent>
      </Select>
    </div>
  ),
}

// All Sizes Showcase
export const AllSizesShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-retro-cream rounded-lg min-w-[400px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Select Sizes</h2>

      <SelectField
        label="Small"
        placeholder="Small select"
        size="sm"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />

      <SelectField
        label="Medium (Default)"
        placeholder="Medium select"
        size="md"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />

      <SelectField
        label="Large"
        placeholder="Large select"
        size="lg"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
}

// Retro Showcase
export const RetroShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-retro-cream rounded-lg min-w-[400px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black">Retro Select</h2>

      <div className="space-y-6">
        <SelectField
          label="Mesa"
          placeholder="Seleccionar mesa..."
          options={[
            { value: '1', label: 'Mesa 1' },
            { value: '2', label: 'Mesa 2' },
            { value: '3', label: 'Mesa 3' },
          ]}
        />

        <div>
          <label className="block text-sm font-bold uppercase tracking-wide text-retro-black mb-2">
            Menú con Categorías
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar plato..." />
            </SelectTrigger>
            <SelectContent>
              <SelectSection title="Entradas" defaultOpen>
                <SelectItem value="nachos">Nachos</SelectItem>
                <SelectItem value="ensalada">Ensalada</SelectItem>
              </SelectSection>
              <SelectSeparator />
              <SelectSection title="Principales">
                <SelectItem value="hamburguesa">Hamburguesa</SelectItem>
                <SelectItem value="pizza">Pizza</SelectItem>
              </SelectSection>
            </SelectContent>
          </Select>
        </div>

        <SelectField
          label="Estado"
          placeholder="Seleccionar estado..."
          variant="success"
          helperText="Estado actual del pedido"
          options={[
            { value: 'pendiente', label: 'Pendiente' },
            { value: 'preparacion', label: 'En Preparación' },
            { value: 'listo', label: 'Listo para Servir' },
          ]}
        />
      </div>
    </div>
  ),
}
