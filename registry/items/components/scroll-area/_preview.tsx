import { ScrollArea } from "./scroll-area";

const tags = Array.from({ length: 50 }).map((_, index) => `v1.2.0-beta.${index + 1}`);

export function Preview() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
