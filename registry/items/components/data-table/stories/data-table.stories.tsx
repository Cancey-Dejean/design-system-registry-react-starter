import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import { DataTable } from "../data-table";
import { columns, payments } from "./payments";

const meta = {
  title: "Components/Data Table",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Powerful table and datagrids built using TanStack Table v9 and the Table primitives. See https://ui.shadcn.com/docs/components/base/data-table",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DataTable columns={columns} data={payments} />,
};

export const CompactPage: Story = {
  name: "Page size 5",
  render: () => <DataTable columns={columns} data={payments} initialPageSize={5} />,
};

export const TableOnly: Story = {
  name: "Without toolbar",
  render: () => (
    <DataTable
      columns={columns}
      data={payments.slice(0, 5)}
      showToolbar={false}
      showPagination={false}
      showSelectionCount={false}
    />
  ),
};

export const FilteredEmail: Story = {
  name: "Filter emails",
  render: () => (
    <DataTable
      columns={columns}
      data={payments}
      filterColumnId="email"
      filterPlaceholder="Filter emails..."
      initialPageSize={5}
    />
  ),
};
