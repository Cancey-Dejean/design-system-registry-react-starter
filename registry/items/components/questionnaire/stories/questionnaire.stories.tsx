"use client";

import { Button } from "@registry/components/button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@registry/components/card/card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FormEvent } from "react";
import { fn } from "storybook/test";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StoryWrapper from "@registry/lib/story-wrapper";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "../questionnaire";
import {
  freeformItems,
  multipleItems,
  questionnaireItems,
  shortcutItems,
  skipItems,
} from "./questionnaire.data";

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const payload = Object.fromEntries(
    [...new Set(formData.keys())].map((key) => {
      const values = formData.getAll(key);
      return [key, values.length > 1 ? values : values[0]];
    }),
  );
  // eslint-disable-next-line no-console -- story feedback for demos without toast
  console.log("Questionnaire submitted", payload);
  fn()(payload);
}

function DefaultQuestions() {
  return (
    <>
      <QuestionnaireItem name="direction" required>
        <QuestionnaireTitle>
          What should the agent build next?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose a direction or describe another task.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span className="font-medium">Tool call timeline</span>
            <span className="text-muted-foreground">
              Show what the agent ran and what came back.
            </span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions">
            <span className="font-medium">Approval checkpoints</span>
            <span className="text-muted-foreground">
              Ask before sensitive or destructive actions.
            </span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            <span className="font-medium">Sub-agent handoffs</span>
            <span className="text-muted-foreground">
              Make delegated work and results easier to follow.
            </span>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Another task"
            placeholder="Describe another task…"
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="signals" multiple>
        <QuestionnaireTitle>
          What should every progress update include?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Select all that apply, or skip this question.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="progress">
            <span className="font-medium">Progress</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="decisions">
            <span className="font-medium">Decisions</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="risks">
            <span className="font-medium">Risks</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="next">
            <span className="font-medium">Next step</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="timing" required>
        <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose when the agent should begin the work.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="now">
            <span className="font-medium">Start now</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="cycle">
            <span className="font-medium">Next development cycle</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="backlog">
            <span className="font-medium">Add it to the backlog</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
    </>
  );
}

const meta: Meta = {
  title: "Components/Questionnaire",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions. See https://ui.shadcn.com/docs/components/base/questionnaire",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-lg">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
  render: () => (
    <Questionnaire
      defaultItem="direction"
      items={questionnaireItems}
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress
        render={(_props, state) => (
          <span className="text-muted-foreground text-xs font-medium tabular-nums">
            Question {state.current} of {state.total}
          </span>
        )}
      />
      <DefaultQuestions />
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  ),
};

export const MultipleSelection: Story = {
  name: "Multiple Selection",
  render: () => (
    <Questionnaire
      defaultItem="sources"
      items={multipleItems}
      onSubmit={handleSubmit}
    >
      <QuestionnaireItem name="sources" required multiple>
        <QuestionnaireTitle>
          What context should the agent inspect?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Select every source that may affect the implementation.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="source">
            <span className="font-medium">Relevant source files</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="tests">
            <span className="font-medium">Existing tests</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="docs">
            <span className="font-medium">Architecture documentation</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="history">
            <span className="font-medium">Recent commit history</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  ),
};

export const FreeformAnswer: Story = {
  name: "Freeform Answer",
  render: () => (
    <Questionnaire
      defaultItem="approach"
      items={freeformItems}
      onSubmit={handleSubmit}
    >
      <QuestionnaireItem name="approach" required>
        <QuestionnaireTitle>
          How should the agent approach this refactor?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose a strategy or write a more specific instruction.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="smallest">
            <span className="font-medium">Make the smallest safe change</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="module">
            <span className="font-medium">Refactor one module at a time</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="replace">
            <span className="font-medium">
              Replace the implementation completely
            </span>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Custom approach"
            placeholder="Write a more specific instruction…"
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit>Use this approach</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  ),
};

export const ExplicitSkip: Story = {
  name: "Explicit Skip",
  render: () => (
    <Questionnaire
      defaultItem="kind"
      items={skipItems}
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress
        render={(_props, state) => (
          <span className="text-muted-foreground text-xs font-medium tabular-nums">
            Question {state.current} of {state.total}
          </span>
        )}
      />
      <QuestionnaireItem name="kind" required>
        <QuestionnaireTitle>What kind of change is this?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose the category that best describes the work.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="feature">
            <span className="font-medium">New feature</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="bug">
            <span className="font-medium">Bug fix</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="refactor">
            <span className="font-medium">Refactor</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="constraints">
        <QuestionnaireTitle>
          Are there any implementation constraints?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Answer if needed, or intentionally skip this question.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="deps">
            <span className="font-medium">Do not add dependencies</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="database">
            <span className="font-medium">Do not change the database</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="api">
            <span className="font-medium">Preserve the public API</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="review" required>
        <QuestionnaireTitle>
          How should the work be reviewed?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose the checks the agent should complete before handoff.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="tests">
            <span className="font-medium">Run the test suite</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="diff">
            <span className="font-medium">Review the final diff</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            <span className="font-medium">Tests and diff review</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Submit brief</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  ),
};

export const Shortcuts: Story = {
  name: "Shortcuts",
  render: () => (
    <Questionnaire
      defaultItem="action"
      items={shortcutItems}
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireItem name="action" required>
        <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Use the displayed shortcut or navigate with the keyboard.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="inspect">
            <span className="font-medium">Inspect the implementation</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="tests">
            <span className="font-medium">Run the relevant tests</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="patch">
            <span className="font-medium">Prepare the patch</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit>Confirm action</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  ),
};

export const CardComposition: Story = {
  name: "Card",
  render: () => (
    <Questionnaire
      defaultItem="direction"
      items={questionnaireItems}
      shortcuts="numbers"
      onSubmit={handleSubmit}
    >
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>What should the agent work on?</CardTitle>
          <CardDescription>
            Choose the task that should be handled next.
          </CardDescription>
          <CardAction>
            <QuestionnaireProgress
              className="text-foreground font-semibold tracking-widest uppercase"
              render={(_props, state) => (
                <span>
                  Question {state.current} of {state.total}
                </span>
              )}
            />
          </CardAction>
        </CardHeader>
        <CardContent className="grid gap-4">
          <DefaultQuestions />
        </CardContent>
        <CardFooter className="border-t">
          <QuestionnaireActions className="w-full">
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit>Create task</QuestionnaireSubmit>
          </QuestionnaireActions>
        </CardFooter>
      </Card>
    </Questionnaire>
  ),
};

export const DialogComposition: Story = {
  name: "Dialog",
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <Story />
      </StoryWrapper>
    ),
  ],
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open clarification
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <Questionnaire
          defaultItem="direction"
          items={questionnaireItems}
          shortcuts="letters"
          onSubmit={handleSubmit}
        >
          <DialogHeader>
            <DialogTitle>Plan an agent interface</DialogTitle>
            <DialogDescription>
              Answer three questions to shape the next prototype.
            </DialogDescription>
          </DialogHeader>
          <QuestionnaireProgress
            className="text-foreground font-semibold tracking-widest uppercase"
            render={(_props, state) => (
              <span>
                Question {state.current} of {state.total}
              </span>
            )}
          />
          <DefaultQuestions />
          <DialogFooter className="border-0 bg-transparent p-0 sm:justify-stretch">
            <QuestionnaireActions className="w-full">
              <QuestionnairePrevious />
              <QuestionnaireSkip />
              <QuestionnaireNext />
              <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
            </QuestionnaireActions>
          </DialogFooter>
        </Questionnaire>
      </DialogContent>
    </Dialog>
  ),
};
