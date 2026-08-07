import { Button } from "@/components/ui/button";

import { ButtonGroup } from "./button-group";

export function Preview() {
  return (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Paste</Button>
      <Button variant="outline">Cut</Button>
    </ButtonGroup>
  );
}
