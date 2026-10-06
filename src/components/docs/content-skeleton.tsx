import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import { DocsLayout } from "./docs-layout";

type ContentSkeletonProps = {
  variant?: "docs" | "registry-item";
  toc?: boolean;
};

export function ContentSkeleton({ variant = "docs", toc = true }: ContentSkeletonProps) {
  const isRegistryItem = variant === "registry-item";

  return (
    <DocsLayout>
      <div className="flex min-w-0 items-start gap-8" aria-busy="true" aria-label="Loading page">
        <article className="flex min-w-0 flex-1 flex-col gap-8">
          <header className="flex max-w-full flex-col gap-2">
            <div className="flex flex-row flex-wrap items-start justify-between gap-3">
              <Skeleton className="h-9 w-52 max-w-full" />
              <div className="flex shrink-0 items-center gap-2">
                <Skeleton className="h-8 w-36.5" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
            <SkeletonLine className="w-full max-w-xl" />
          </header>

          {isRegistryItem ? <RegistryItemContentSkeleton /> : <DocsContentSkeleton />}
        </article>

        {toc ? (
          <aside className="sticky top-16 hidden w-56 shrink-0 py-6 xl:block">
            <div className="flex flex-col gap-3">
              <SkeletonLine className="w-24" height="h-5" />
              <div className="flex flex-col">
                {(isRegistryItem ? ["w-24", "w-16"] : ["w-24", "w-36", "w-40", "w-28", "w-32"]).map(
                  (width) => (
                    <div key={width} className="flex h-7 items-center pl-3">
                      <Skeleton className={cn("h-3.5", width)} />
                    </div>
                  ),
                )}
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </DocsLayout>
  );
}

function SkeletonLine({ className, height = "h-6" }: { className?: string; height?: string }) {
  return (
    <div className={cn("flex items-center", height)}>
      <Skeleton className={cn("h-4", className)} />
    </div>
  );
}

function DocsContentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-3/4" />
      </div>
      <Skeleton className="mt-4 h-7 w-40" />
      <SkeletonLine className="w-2/3" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="flex flex-col">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-11/12" />
        <SkeletonLine className="w-1/2" />
      </div>
    </div>
  );
}

function RegistryItemContentSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-41 rounded-lg" />
        <Skeleton className="h-72.5 w-full rounded-xl" />
      </div>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-8 w-33 rounded-lg" />
        <Skeleton className="h-23.25 w-full rounded-xl" />
      </section>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </section>
    </>
  );
}
