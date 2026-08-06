import { IconFileText, IconX } from "@tabler/icons-react";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "./attachment";

export function Preview() {
  return (
    <Attachment>
      <AttachmentMedia>
        <IconFileText />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove sales-dashboard.pdf">
          <IconX />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}
