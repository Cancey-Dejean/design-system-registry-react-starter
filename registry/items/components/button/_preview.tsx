import { Button, ButtonCTAGroup } from "./button";
import { BUTTON_VARIANTS } from "./button.variants";

export function Preview() {
  return (
    <ButtonCTAGroup>
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </ButtonCTAGroup>
  );
}
