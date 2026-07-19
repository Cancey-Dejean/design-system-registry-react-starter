"use client";

import { Button, ButtonCTAGroup } from "./button";

export function Preview() {
  return (
    <ButtonCTAGroup>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </ButtonCTAGroup>
  );
}
