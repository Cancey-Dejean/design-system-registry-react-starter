import { Progress, ProgressLabel, ProgressValue } from "./progress";

export function Preview() {
  return (
    <div className="w-full max-w-sm">
      <Progress value={60}>
        <ProgressLabel>Upload</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  );
}
