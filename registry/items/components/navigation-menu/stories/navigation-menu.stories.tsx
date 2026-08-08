import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCircle, IconFileText, IconRocket } from "@tabler/icons-react";

import StoryWrapper from "@/components/ui/story-wrapper";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../navigation-menu";

const meta = {
  title: "Components/Navigation Menu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A collection of links for navigating websites. Built on Base UI Navigation Menu. See https://ui.shadcn.com/docs/components/base/navigation-menu",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj;

function ListItem({
  title,
  children,
  href = "#",
}: {
  title: string;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        className="flex h-full flex-col items-start gap-1 rounded-md p-3"
      >
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">Introduction</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Installation</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Typography</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">Alert Dialog</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Hover Card</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Progress</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const RichContent: Story = {
  name: "Rich content",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[360px] gap-1 p-2 md:w-[440px] md:grid-cols-2">
              <ListItem title="Analytics">
                Track product usage and conversion in real time.
              </ListItem>
              <ListItem title="Automations">Ship workflows without writing glue code.</ListItem>
              <ListItem title="Security">SSO, audit logs, and role-based access.</ListItem>
              <ListItem title="Integrations">Connect your stack with first-party plugins.</ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-56 gap-1 p-2">
              <li>
                <NavigationMenuLink href="#" className="flex-col items-start gap-1">
                  <span className="flex items-center gap-2 font-medium">
                    <IconFileText />
                    Docs
                  </span>
                  <span className="text-muted-foreground">Guides and API reference.</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="flex-col items-start gap-1">
                  <span className="flex items-center gap-2 font-medium">
                    <IconRocket />
                    Changelog
                  </span>
                  <span className="text-muted-foreground">What shipped this week.</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="flex-col items-start gap-1">
                  <span className="flex items-center gap-2 font-medium">
                    <IconCircle />
                    Status
                  </span>
                  <span className="text-muted-foreground">Uptime and incidents.</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const LinksOnly: Story = {
  name: "Links only",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
