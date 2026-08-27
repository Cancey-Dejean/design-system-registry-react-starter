import type { ComponentProps } from "react";

export type Theme = "light" | "dark" | "gray" | undefined;

export type LinkItem = ComponentProps<"a"> & {
  label?: string;
  newTab?: boolean | undefined;
};

export type ImageItem = ComponentProps<"img"> & {
  label?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ResponsiveBannerImageProps = {
  ariaLabel?: string;
  imageDesktop?: string;
  imageTablet?: string;
  imageMobile?: string;
};

export type VideoItem = ComponentProps<"video"> & {
  desktopVideoUrl?: string;
  desktopVideoPoster?: string;
  mobileVideoUrl?: string;
  mobileVideoPoster?: string;
};
