import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoryWrapper from "@/components/ui/story-wrapper";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "../../checkbox/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../field";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Combine labels, controls, descriptions, and errors into accessible form fields. See https://ui.shadcn.com/docs/components/base/field",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" defaultValue="@shadcn" />
      </Field>
    </FieldGroup>
  ),
};

export const WithError: Story = {
  name: "With error",
  render: () => (
    <FieldGroup>
      <Field data-invalid>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" aria-invalid defaultValue="short" />
        <FieldError errors={[{ message: "Password must be at least 8 characters." }]} />
      </Field>
    </FieldGroup>
  ),
};

export const MultipleErrors: Story = {
  name: "Multiple errors",
  render: () => (
    <FieldGroup>
      <Field data-invalid>
        <FieldLabel htmlFor="new-password">New password</FieldLabel>
        <Input id="new-password" type="password" aria-invalid />
        <FieldError
          errors={[
            { message: "At least 8 characters" },
            { message: "At least one number" },
            { message: "At least one special character" },
          ]}
        />
      </Field>
    </FieldGroup>
  ),
};

export const Fieldset: Story = {
  name: "Fieldset",
  render: () => (
    <FieldSet>
      <FieldLegend>Payment details</FieldLegend>
      <FieldDescription>Enter your card information. All fields required.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="card-name">Name on card</FieldLabel>
          <Input id="card-name" placeholder="Jane Doe" />
        </Field>
        <Field>
          <FieldLabel htmlFor="card-number">Card number</FieldLabel>
          <Input id="card-number" inputMode="numeric" placeholder="ACCT-000015" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const WithSeparator: Story = {
  name: "With separator",
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" placeholder="Your name" />
      </Field>
      <FieldSeparator>Or continue with</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea id="notes" placeholder="Optional notes…" />
        <FieldDescription>Optional field for teammates.</FieldDescription>
      </Field>
    </FieldGroup>
  ),
};

export const CheckboxField: Story = {
  name: "Checkbox",
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="terms" />
        <FieldContent>
          <FieldLabel htmlFor="terms">Accept terms</FieldLabel>
          <FieldDescription>You agree to our Terms of Service and Privacy Policy.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const FormLayout: Story = {
  name: "Form layout",
  render: () => (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="full-name">Full name</FieldLabel>
          <Input id="full-name" placeholder="Pedro Duarte" autoComplete="name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea id="bio" placeholder="Tell us about yourself" />
          <FieldDescription>Max 160 characters.</FieldDescription>
        </Field>
      </FieldGroup>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  ),
};
