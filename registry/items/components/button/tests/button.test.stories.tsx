import type { Meta, StoryObj } from "@storybook/react-vite";
import { assert, asyncProperty } from "fast-check";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { expect, within } from "storybook/test";

import { buttonRenderCase, domPropertyRuns } from "@/test/fast-check";

import { Button } from "../button";

const meta = {
  title: "Components/Button/Tests",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    fullWidth: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UsesNativeButtonElement: Story = {
  args: { children: "Native Button" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: "Native Button" });

    // Contract test: ensure semantic element is actually <button>
    await expect(btn.tagName).toBe("BUTTON");
  },
};

export const Disabled_IsDisabled: Story = {
  args: { children: "Disabled", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: "Disabled" });
    await expect(btn).toBeDisabled();
  },
};

export const AsLink_RendersLinkRole: Story = {
  args: { children: "Go Home", as: "a", href: "/" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Go Home" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/");
    await expect(link.tagName).toBe("A");
  },
};

export const Property_ValidPropsRender: Story = {
  args: { children: "Property" },
  play: async ({ canvasElement }) => {
    const host = document.createElement("div");
    canvasElement.append(host);
    const root = createRoot(host);

    try {
      await assert(
        asyncProperty(buttonRenderCase, async (sample) => {
          if (sample.as === "button") {
            flushSync(() => {
              root.render(
                <Button disabled={sample.disabled} size={sample.size} variant={sample.variant}>
                  {sample.children}
                </Button>,
              );
            });

            const button = within(host).getByRole("button", { name: sample.children });
            await expect(button.tagName).toBe("BUTTON");

            if (sample.disabled) {
              await expect(button).toBeDisabled();
            } else {
              await expect(button).toBeEnabled();
            }

            return;
          }

          flushSync(() => {
            root.render(
              <Button as="a" href={sample.href} size={sample.size} variant={sample.variant}>
                {sample.children}
              </Button>,
            );
          });

          const link = within(host).getByRole("link", { name: sample.children });
          await expect(link.tagName).toBe("A");
          await expect(link).toHaveAttribute("href", sample.href);
        }),
        { numRuns: domPropertyRuns },
      );
    } finally {
      root.unmount();
      host.remove();
    }
  },
};

export const KeyboardFocusable: Story = {
  args: { children: "Focusable" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: "Focusable" });

    // Focus should land on it (Tab simulation happens at document-level)
    // Here we directly focus to validate it can be focused.
    btn.focus();
    await expect(btn).toHaveFocus();
  },
};
