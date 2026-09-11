import { Card, CardContent } from "@registry/components/card/card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import StoryWrapper from "@registry/lib/story-wrapper";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";

const SLIDES = [1, 2, 3, 4, 5] as const;
const MANY_SLIDES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A carousel with motion and swipe built using Embla. See https://ui.shadcn.com/docs/components/base/carousel",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="mx-auto w-full max-w-xs">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj;

function SlideCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-1">
      <Card>
        <CardContent className="flex aspect-square items-center justify-center p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide}>
            <SlideCard>
              <span className="text-4xl font-semibold">{slide}</span>
            </SlideCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Sizes: Story = {
  name: "Multiple items",
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="mx-auto w-full max-w-sm">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  render: () => (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {MANY_SLIDES.map((slide) => (
          <CarouselItem key={slide} className="md:basis-1/2 lg:basis-1/3">
            <SlideCard>
              <span className="text-3xl font-semibold">{slide}</span>
            </SlideCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Spacing: Story = {
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="mx-auto w-full max-w-sm">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  render: () => (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-2 md:-ml-4">
        {SLIDES.map((slide) => (
          <CarouselItem key={slide} className="pl-2 md:basis-1/2 md:pl-4">
            <SlideCard>
              <span className="text-3xl font-semibold">{slide}</span>
            </SlideCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Loop: Story = {
  render: () => (
    <Carousel opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide}>
            <SlideCard>
              <span className="text-4xl font-semibold">{slide}</span>
            </SlideCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="mx-auto w-full max-w-xs py-12">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  render: () => (
    <Carousel
      orientation="vertical"
      opts={{ align: "start" }}
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {SLIDES.map((slide) => (
          <CarouselItem key={slide} className="pt-1 md:basis-1/2">
            <SlideCard>
              <span className="text-3xl font-semibold">{slide}</span>
            </SlideCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

function ApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto w-full max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {SLIDES.map((slide) => (
            <CarouselItem key={slide}>
              <SlideCard>
                <span className="text-4xl font-semibold">{slide}</span>
              </SlideCard>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  );
}

export const WithApi: Story = {
  name: "With API",
  render: () => <ApiDemo />,
};
