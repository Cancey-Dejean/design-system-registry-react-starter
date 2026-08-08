import { Slider } from "./slider";

export function Preview() {
  return (
    <div className="w-full max-w-sm px-1">
      <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
    </div>
  );
}
