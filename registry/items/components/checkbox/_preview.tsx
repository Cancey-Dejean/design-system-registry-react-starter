import { Checkbox } from "./checkbox";

export function Preview() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" defaultChecked />
      <label htmlFor="terms" className="text-sm leading-none font-medium">
        Accept terms and conditions
      </label>
    </div>
  );
}
