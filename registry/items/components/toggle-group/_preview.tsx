import { IconBold, IconItalic, IconUnderline } from "@tabler/icons-react";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

export function Preview() {
  return (
    <ToggleGroup multiple defaultValue={["bold"]} variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <IconUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
