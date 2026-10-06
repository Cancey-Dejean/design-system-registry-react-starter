import { createFileRoute } from "@tanstack/react-router";

import { DocsLayout } from "@/components/docs/docs-layout";
import { FlowsPage } from "@/components/docs/flows/flows-page";

import { flowsPage, registryFlowGraph } from "../lib/registry/flows";
import { getSeoHead } from "../lib/seo";

import reactFlowCss from "@xyflow/react/dist/style.css?url";

export const Route = createFileRoute("/flows")({
  head: () => {
    const head = getSeoHead({
      title: flowsPage.title,
      description: flowsPage.description,
      path: flowsPage.path,
    });

    return {
      ...head,
      links: [...head.links, { rel: "stylesheet", href: reactFlowCss }],
    };
  },
  component: FlowsRoute,
});

function FlowsRoute() {
  return (
    <DocsLayout showFooter={false}>
      <FlowsPage
        graph={registryFlowGraph}
        title={flowsPage.title}
        description={flowsPage.description}
      />
    </DocsLayout>
  );
}
