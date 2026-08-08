import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import StoryWrapper from "@/components/ui/story-wrapper";

import { DatePicker, DatePickerWithRange } from "../datepicker";

const meta = {
  title: "Components/Datepicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A date picker composed from Popover and Calendar. See https://ui.shadcn.com/docs/components/base/date-picker",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-md flex-col items-start gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj;

function BasicDemo() {
  const [date, setDate] = React.useState<Date | undefined>();

  return <DatePicker value={date} onChange={setDate} />;
}

export const Default: Story = {
  render: () => <BasicDemo />,
};

function RangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 0, 20),
    to: addDays(new Date(2026, 0, 20), 20),
  });

  return <DatePickerWithRange value={range} onChange={setRange} placeholder="Pick a date range" />;
}

export const Range: Story = {
  name: "Range picker",
  render: () => <RangeDemo />,
};

function DateOfBirthDemo() {
  const [date, setDate] = React.useState<Date | undefined>();
  const thisYear = new Date().getFullYear();

  return (
    <div className="grid gap-2">
      <label htmlFor="dob" className="text-sm font-medium">
        Date of birth
      </label>
      <DatePicker
        id="dob"
        value={date}
        onChange={setDate}
        placeholder="Select date"
        captionLayout="dropdown"
        fromYear={thisYear - 100}
        toYear={thisYear}
      />
    </div>
  );
}

export const DateOfBirth: Story = {
  name: "Date of birth",
  render: () => <DateOfBirthDemo />,
};

function UncontrolledDemo() {
  return <DatePicker defaultValue={new Date()} />;
}

export const Uncontrolled: Story = {
  render: () => <UncontrolledDemo />,
};
