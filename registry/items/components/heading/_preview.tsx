import Heading from "./heading";
import { HEADING_SIZES } from "./heading.variants";

export function Preview() {
  return (
    <div className="flex flex-col gap-4">
      {HEADING_SIZES.map((size) => (
        <Heading key={size} level={2} size={size}>
          Heading
        </Heading>
      ))}
    </div>
  );
}
