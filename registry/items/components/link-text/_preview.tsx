import { LinkText } from "./link-text";
import { LINK_TONES } from "./link-text.variants";

export function Preview() {
  return (
    <div className="flex flex-col gap-3">
      {LINK_TONES.map((tone) => (
        <LinkText key={tone} href="#" tone={tone}>
          Tone: {tone}
        </LinkText>
      ))}
    </div>
  );
}
