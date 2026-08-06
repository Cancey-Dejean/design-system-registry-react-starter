import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays a card with header, content, and footer. See https://ui.shadcn.com/docs/components/base/card",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "default",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use the card for self-contained content groups with a title, body, and actions.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  name: "With Action",
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>Weekly snapshots. No more manual exports.</CardDescription>
        <CardAction>
          <Badge variant="secondary">New</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Choose a schedule (daily or weekly).</li>
          <li>Send to channels or specific teammates.</li>
          <li>Include charts, tables, and key metrics.</li>
        </ul>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full">Set up scheduled reports</Button>
      </CardFooter>
    </Card>
  ),
};

export const SizeSm: Story = {
  name: "Size sm",
  render: () => (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>Uses denser spacing for compact layouts.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          The small size variant tightens gaps and padding across header, content, and footer.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  name: "Image",
  render: () => (
    <Card className="pt-0">
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
        alt=""
        className="aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping faster.
        </CardDescription>
        <CardAction>
          <Badge>Featured</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" variant="outline">
          View Event
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Card Footer</p>
      </CardFooter>
    </Card>
  ),
};
