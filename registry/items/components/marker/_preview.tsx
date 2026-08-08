import { IconInfoCircle } from "@tabler/icons-react";

import { Marker, MarkerContent, MarkerIcon } from "./marker";

export function Preview() {
  return (
    <Marker className="w-full max-w-sm">
      <MarkerIcon>
        <IconInfoCircle />
      </MarkerIcon>
      <MarkerContent>Optional section label</MarkerContent>
    </Marker>
  );
}
