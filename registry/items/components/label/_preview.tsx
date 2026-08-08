import { Input } from "@/components/ui/input";

import { Label } from "./label";

export function Preview() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="preview-email">Email</Label>
      <Input id="preview-email" type="email" placeholder="you@example.com" />
    </div>
  );
}
