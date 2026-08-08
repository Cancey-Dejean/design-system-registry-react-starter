"use client";

import { Input } from "@/components/ui/input";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field";

export function Preview() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="preview-email">Email</FieldLabel>
        <Input id="preview-email" type="email" placeholder="you@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
