import { Button } from "@registry/components/button/button";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export function Preview() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
