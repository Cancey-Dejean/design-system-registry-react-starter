import { allRegistryFlowItems } from "content-collections";

import { createRegistryFlowGraph } from "./flow-graph";

export const registryFlowGraph = createRegistryFlowGraph(allRegistryFlowItems);

export const flowsPage = {
  title: "Component flows",
  description: "Trace what each registry item depends on, what uses it, and what it installs.",
  path: "/flows",
} as const;
