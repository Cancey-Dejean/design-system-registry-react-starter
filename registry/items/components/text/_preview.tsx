import { Text } from "./text";
import { TEXT_SIZES } from "./text.variants";

export function Preview() {
  return (
    <div className="flex flex-col gap-4">
      {TEXT_SIZES.map((size) => (
        <Text key={size} size={size}>
          Size: {size} — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  );
}
