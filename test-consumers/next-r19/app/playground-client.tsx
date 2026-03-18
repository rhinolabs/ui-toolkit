"use client";

import { PlaygroundRenderer } from "@test-utils/playground";
import * as Components from "@rhinolabs/ui";
import { toast } from "sonner";

function triggerToast(type: string) {
  if (type === "success") toast.success("Success toast!");
  else if (type === "error") toast.error("Error toast!");
  else toast("This is a toast notification", { description: "Triggered from the playground" });
}

export default function PlaygroundClient() {
  return <PlaygroundRenderer components={Components} hasThemeProvider={true} triggerToast={triggerToast} />;
}
