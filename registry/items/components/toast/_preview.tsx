"use client";

import { Button } from "@/components/ui/button";

import { toast, Toaster } from "./toast";

export function Preview() {
  return (
    <Toaster>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Event created",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }
      >
        Show Toast
      </Button>
    </Toaster>
  );
}
