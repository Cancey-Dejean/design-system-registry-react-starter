import type { VariantProps } from "class-variance-authority";

import type { sectionVariants } from "./section.variants";

export type SectionProps = React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>;
