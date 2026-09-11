import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Calendar } from "../calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A date field component that allows users to enter and edit dates. Built on react-day-picker. See https://ui.shadcn.com/docs/components/base/calendar",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-fit">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj;

function SingleDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  );
}

export const Default: Story = {
  render: () => <SingleDemo />,
};

function RangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 5)),
  });

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-lg border"
    />
  );
}

export const Range: Story = {
  render: () => <RangeDemo />,
};

function MultipleDemo() {
  const [dates, setDates] = React.useState<Date[] | undefined>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ]);

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      className="rounded-lg border"
    />
  );
}

export const Multiple: Story = {
  name: "Multiple dates",
  render: () => <MultipleDemo />,
};

function DropdownDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      className="rounded-lg border"
    />
  );
}

export const Dropdown: Story = {
  name: "Month and year dropdowns",
  render: () => <DropdownDemo />,
};

function TwoMonthsDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
      className="rounded-lg border"
    />
  );
}

export const TwoMonths: Story = {
  name: "Two months",
  render: () => <TwoMonthsDemo />,
};

function DisabledDemo() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={(day) => day.getDay() === 0 || day.getDay() === 6}
      className="rounded-lg border"
    />
  );
}

export const DisabledWeekends: Story = {
  name: "Disabled weekends",
  render: () => <DisabledDemo />,
};

function WeekNumberDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      showWeekNumber
      className="rounded-lg border"
    />
  );
}

export const WeekNumbers: Story = {
  name: "Week numbers",
  render: () => <WeekNumberDemo />,
};
