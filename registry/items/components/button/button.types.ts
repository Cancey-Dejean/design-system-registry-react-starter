import type { VariantProps } from "class-variance-authority";

import type { buttonCva } from "./button.variants";

type ButtonVariantProps = VariantProps<typeof buttonCva>;

export type ButtonProps<T extends React.ElementType> = {
  /** The component to render the button as */
  as?: T;
  /** The variant of the button */
  variant?: ButtonVariantProps["variant"];
  /** Whether the button has an icon */
  icon?: boolean;
  /** The size of the button */
  size?: ButtonVariantProps["size"];
  /** Whether the button is full width */
  fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<T>; // Great for polymorphic "as"
