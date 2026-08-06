import { IconTerminal } from "@tabler/icons-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

export function Preview() {
  return (
    <Alert className="w-full max-w-md">
      <IconTerminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}
