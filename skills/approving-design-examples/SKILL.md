---
name: approving-design-examples
description: >-
  Use before implementing any new or changed UI design in this project. Use
  when designing, redesigning, building, restyling, or mocking up a screen,
  page, section, layout, flow, or component visual, including when the request
  jumps straight to implementation.
---

# Approving Design Examples

Every design that will be made in this project is researched with Mobbin, then proposed as three examples. Implementation starts only after the user approves one example.

**Violating the letter of this gate is violating the spirit of this gate.**

## When to use

Use this for any design that needs to be made: new UI, a visual restyle, a page, a section, a flow, or a component's appearance.

Skip it only when:

- The change is not a design (copy, types, tests, data, or a bugfix with no visual change).
- The user explicitly waives this process in the current message.
- The user already approved an example in this conversation and is asking to implement that example.

## Gate

```
Mobbin research → three examples → stop → user approves one → implement that example
```

Do not create or edit project files for the design until approval. That includes components, styles, routes, registry items, previews, and stories.

## 1. Research with Mobbin

Discover schemas with `GetDynamicTools` on namespace `plugin-mobbin-mobbin` before calling. If the namespace needs auth, call `mcp_auth`, then retry.

| Design                    | Tool              |
| ------------------------- | ----------------- |
| One screen or component   | `search_screens`  |
| One website section       | `search_sections` |
| A multi-step user journey | `search_flows`    |

- `platform`: `web`, unless the user asked for a native mobile design. `search_sections` has no platform argument.
- `output_destination`: `code`.
- `task_intent`: one short English sentence, identical on every call for this task.
- One subject per query. Run another search for a second screen, section, or flow.
- `limit`: 5 or lower.
- Read the returned images. Do not describe a result from metadata alone.
- Cite every reference you use as a markdown link to its `mobbin_url`.
- If a result includes `ai_usage_notice`, show that markdown to the user unchanged, as its own block.

If a search is empty or off-target, change the query and search again. If Mobbin stays unavailable after auth, stop and say so. Do not invent the three examples from memory.

## 2. Create three examples

Write three examples in the reply. Do not put them in the repo. Mobbin screens are research, not the examples. Each example is an original direction grounded in those references.

Each example must differ in layout, hierarchy, or interaction. Three color or type variations of one layout count as one example.

### Example A — [name]

- **Direction:** one sentence.
- **Mobbin basis:** [pattern](mobbin_url), and the specific decision taken from it.
- **Structure:** regions, order, density, and primary action.
- **Interaction:** the main thing the user does.
- **Tradeoff:** what this option favors, and what it gives up.

Repeat for Example B and Example C.

End by asking which example to implement, or what to change. Then stop.

## 3. Approval

Approval names one example, or names the parts of examples to combine.

These are not approval:

- Silence, or a later message about something else.
- "Looks good" with no example named.
- Choosing the option yourself.
- Adding a project file so the user can compare the examples.

When the user asks for changes, revise the examples and stop again.

## 4. Implement

Implement only the approved example, using this project's components and styling. Leave the other examples out unless the user named those parts.

## Red flags

Stop if you are about to:

- Edit project files before an example is approved.
- Skip Mobbin because the pattern feels familiar.
- Present three Mobbin screenshots as the three examples.
- Offer one layout plus two minor variants.
- Build all three examples in the repo.
- Research and code in the same step.

## Rationalizations

| Excuse                          | Reality                                              |
| ------------------------------- | ---------------------------------------------------- |
| "The user said to build it"     | Building starts after they pick an example.          |
| "I already know this pattern"   | Mobbin research still comes first.                   |
| "A coded preview is faster"     | A preview in the project is implementation.          |
| "Three themes is three options" | Examples differ in structure or interaction.         |
| "I'll research while coding"    | Research and approval finish before any design edit. |
| "They liked the direction"      | Approval names an example.                           |
