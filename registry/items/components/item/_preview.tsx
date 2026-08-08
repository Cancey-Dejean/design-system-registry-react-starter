import { IconBell } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./item";

export function Preview() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="icon">
        <IconBell />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Push notifications</ItemTitle>
        <ItemDescription>Send me a push notification when something happens.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Enable
        </Button>
      </ItemActions>
    </Item>
  );
}
