import { Switch } from "./switch";

export function Preview() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="preview-airplane" defaultChecked />
      <label htmlFor="preview-airplane" className="text-sm leading-none font-medium">
        Airplane Mode
      </label>
    </div>
  );
}
