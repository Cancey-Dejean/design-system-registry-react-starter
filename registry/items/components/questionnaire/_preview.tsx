"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./questionnaire";

const items = [
  {
    name: "task",
    required: true,
    choices: [{ value: "inspect" }, { value: "implement" }, { value: "review" }],
  },
] as const;

export function Preview() {
  return (
    <Questionnaire
      className="mx-auto max-w-md"
      defaultItem="task"
      items={items}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="task" required>
        <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose a direction to continue the flow.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="inspect">
            <span className="font-medium">Inspect the implementation</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="implement">
            <span className="font-medium">Implement the change</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="review">
            <span className="font-medium">Review the result</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Confirm action</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
