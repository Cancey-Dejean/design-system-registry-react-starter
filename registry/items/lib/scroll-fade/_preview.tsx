import { scrollFadeClass, scrollFadeXClass } from "./scroll-fade";

const verticalItems = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);
const tags = [
  "Design",
  "Engineering",
  "Marketing",
  "Product",
  "Research",
  "Sales",
  "Support",
  "Operations",
];

export function Preview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border">
        <div className={`${scrollFadeClass} max-h-40 px-4 py-2`}>
          <ul className="divide-y">
            {verticalItems.map((item) => (
              <li key={item} className="py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border">
        <div className={`${scrollFadeXClass} flex gap-2 px-3 py-3`}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 rounded-full border bg-muted px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
