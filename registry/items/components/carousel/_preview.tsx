import { Card, CardContent } from "../card/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const SLIDES = [1, 2, 3, 4, 5] as const;

export function Preview() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{slide}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
