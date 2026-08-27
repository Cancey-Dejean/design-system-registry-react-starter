import { Label } from "@registry/components/label/label";

import { RadioGroup, RadioGroupItem } from "./radio-group";

export function Preview() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="preview-r1" />
        <Label htmlFor="preview-r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="preview-r2" />
        <Label htmlFor="preview-r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="preview-r3" />
        <Label htmlFor="preview-r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}
