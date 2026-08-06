export const questionnaireItems = [
  {
    name: "direction",
    required: true,
    choices: [{ value: "delegation" }, { value: "questions" }, { value: "both" }],
  },
  {
    name: "signals",
    choices: [{ value: "progress" }, { value: "decisions" }, { value: "risks" }, { value: "next" }],
  },
  {
    name: "timing",
    required: true,
    choices: [{ value: "now" }, { value: "cycle" }, { value: "backlog" }],
  },
];

export const multipleItems = [
  {
    name: "sources",
    required: true,
    choices: [{ value: "source" }, { value: "tests" }, { value: "docs" }, { value: "history" }],
  },
];

export const freeformItems = [
  {
    name: "approach",
    required: true,
    choices: [{ value: "smallest" }, { value: "module" }, { value: "replace" }],
  },
];

export const skipItems = [
  {
    name: "kind",
    required: true,
    choices: [{ value: "feature" }, { value: "bug" }, { value: "refactor" }],
  },
  {
    name: "constraints",
    choices: [{ value: "deps" }, { value: "database" }, { value: "api" }],
  },
  {
    name: "review",
    required: true,
    choices: [{ value: "tests" }, { value: "diff" }, { value: "both" }],
  },
];

export const shortcutItems = [
  {
    name: "action",
    required: true,
    choices: [{ value: "inspect" }, { value: "tests" }, { value: "patch" }],
  },
];
