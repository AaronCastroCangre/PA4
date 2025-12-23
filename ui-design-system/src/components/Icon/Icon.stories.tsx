import type { Meta, StoryObj } from '@storybook/react'
import * as Icons from './icons'

const meta = {
  title: 'Components/Icon',
  component: Icons.SearchIcon,
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
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
      description: 'The size of the icon',
      defaultValue: 24,
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 4, step: 0.5 },
      description: 'The stroke width of the icon',
      defaultValue: 2,
    },
    color: {
      control: 'color',
      description: 'The color of the icon (uses currentColor by default)',
    },
  },
} satisfies Meta<typeof Icons.SearchIcon>

export default meta
type Story = StoryObj<typeof meta>

// Individual Icons
export const Search: Story = {
  render: (args) => <Icons.SearchIcon {...args} />,
  args: {
    size: 24,
  },
}

export const Check: Story = {
  render: (args) => <Icons.CheckIcon {...args} />,
  args: {
    size: 24,
  },
}

export const CheckDouble: Story = {
  render: (args) => <Icons.CheckDoubleIcon {...args} />,
  args: {
    size: 24,
  },
}

export const Chart: Story = {
  render: (args) => <Icons.ChartIcon {...args} />,
  args: {
    size: 24,
  },
}

export const Send: Story = {
  render: (args) => <Icons.SendIcon {...args} />,
  args: {
    size: 24,
  },
}

export const Message: Story = {
  render: (args) => <Icons.MessageIcon {...args} />,
  args: {
    size: 24,
  },
}

export const User: Story = {
  render: (args) => <Icons.UserIcon {...args} />,
  args: {
    size: 24,
  },
}

export const Heart: Story = {
  render: (args) => <Icons.HeartIcon {...args} />,
  args: {
    size: 24,
  },
}

export const Settings: Story = {
  render: (args) => <Icons.SettingsIcon {...args} />,
  args: {
    size: 24,
  },
}

// Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-8 bg-retro-cream rounded-lg">
      <Icons.HeartIcon size={16} />
      <Icons.HeartIcon size={24} />
      <Icons.HeartIcon size={32} />
      <Icons.HeartIcon size={48} />
      <Icons.HeartIcon size={64} />
    </div>
  ),
}

// Colors Showcase
export const AllColors: Story = {
  render: () => (
    <div className="flex gap-4 p-8 bg-retro-cream rounded-lg">
      <Icons.HeartIcon className="text-retro-black" size={32} />
      <Icons.HeartIcon className="text-retro-blue" size={32} />
      <Icons.HeartIcon className="text-retro-pink" size={32} />
      <Icons.HeartIcon className="text-retro-purple" size={32} />
      <Icons.HeartIcon className="text-retro-orange" size={32} />
      <Icons.HeartIcon className="text-retro-cyan" size={32} />
      <Icons.HeartIcon className="text-retro-green" size={32} />
      <Icons.HeartIcon className="text-retro-red" size={32} />
    </div>
  ),
}

// All Icons Grid - Row 1
export const Row1Icons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Row 1</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.SearchIcon size={32} />
          <span className="text-xs font-medium">Search</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.CheckIcon size={32} />
          <span className="text-xs font-medium">Check</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.CheckDoubleIcon size={32} />
          <span className="text-xs font-medium">CheckDouble</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.ChartIcon size={32} />
          <span className="text-xs font-medium">Chart</span>
        </div>
      </div>
    </div>
  ),
}

// All Icons Grid - Row 2
export const Row2Icons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Row 2</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.BoxIcon size={32} />
          <span className="text-xs font-medium">Box</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.SendIcon size={32} />
          <span className="text-xs font-medium">Send</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.MessageIcon size={32} />
          <span className="text-xs font-medium">Message</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.UserIcon size={32} />
          <span className="text-xs font-medium">User</span>
        </div>
      </div>
    </div>
  ),
}

// All Icons Grid - Row 3
export const Row3Icons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Row 3</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.PhoneIcon size={32} />
          <span className="text-xs font-medium">Phone</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.BellIcon size={32} />
          <span className="text-xs font-medium">Bell</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.EditOffIcon size={32} />
          <span className="text-xs font-medium">EditOff</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.GlobeIcon size={32} />
          <span className="text-xs font-medium">Globe</span>
        </div>
      </div>
    </div>
  ),
}

// All Icons Grid - Row 4
export const Row4Icons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Row 4</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.PlusIcon size={32} />
          <span className="text-xs font-medium">Plus</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.SmileIcon size={32} />
          <span className="text-xs font-medium">Smile</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.LinkIcon size={32} />
          <span className="text-xs font-medium">Link</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.StarIcon size={32} />
          <span className="text-xs font-medium">Star</span>
        </div>
      </div>
    </div>
  ),
}

// All Icons Grid - Row 5
export const Row5Icons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Row 5</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.MoreVerticalIcon size={32} />
          <span className="text-xs font-medium">MoreVertical</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.CloseIcon size={32} />
          <span className="text-xs font-medium">Close</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.CalendarIcon size={32} />
          <span className="text-xs font-medium">Calendar</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.CopyIcon size={32} />
          <span className="text-xs font-medium">Copy</span>
        </div>
      </div>
    </div>
  ),
}

// All Icons Grid - Row 6 (Chevrons)
export const Row6Chevrons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Row 6 - Chevrons</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.ChevronDownIcon size={32} />
          <span className="text-xs font-medium">ChevronDown</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.ChevronUpIcon size={32} />
          <span className="text-xs font-medium">ChevronUp</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.ChevronLeftIcon size={32} />
          <span className="text-xs font-medium">ChevronLeft</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.ChevronRightIcon size={32} />
          <span className="text-xs font-medium">ChevronRight</span>
        </div>
      </div>
    </div>
  ),
}

// All Icons Grid - Row 7
export const Row7Icons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Row 7</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.SettingsIcon size={32} />
          <span className="text-xs font-medium">Settings</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.DownloadIcon size={32} />
          <span className="text-xs font-medium">Download</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.HelpIcon size={32} />
          <span className="text-xs font-medium">Help</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.SlidersIcon size={32} />
          <span className="text-xs font-medium">Sliders</span>
        </div>
      </div>
    </div>
  ),
}

// Additional Icons
export const AdditionalIcons: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-retro-black mb-4">Additional Icons</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icons.EditIcon size={32} />
          <span className="text-xs font-medium">Edit</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.TrashIcon size={32} />
          <span className="text-xs font-medium">Trash</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.HeartIcon size={32} />
          <span className="text-xs font-medium">Heart</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.HomeIcon size={32} />
          <span className="text-xs font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.MailIcon size={32} />
          <span className="text-xs font-medium">Mail</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.LockIcon size={32} />
          <span className="text-xs font-medium">Lock</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.EyeIcon size={32} />
          <span className="text-xs font-medium">Eye</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icons.EyeOffIcon size={32} />
          <span className="text-xs font-medium">EyeOff</span>
        </div>
      </div>
    </div>
  ),
}

// Complete Icon Gallery
export const AllIconsGallery: Story = {
  render: () => (
    <div className="p-8 bg-retro-cream rounded-lg min-w-[600px]">
      <h2 className="text-2xl font-bold uppercase tracking-wide text-retro-black mb-6">Icon Gallery</h2>
      <div className="grid grid-cols-8 gap-4">
        {Object.entries(Icons.icons).map(([name, Icon]) => (
          <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-retro-white transition-colors">
            <Icon size={24} className="text-retro-black" />
            <span className="text-[10px] font-medium text-retro-gray">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
