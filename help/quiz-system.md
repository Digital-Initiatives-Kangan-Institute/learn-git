# Quiz System

A lightweight, drop-in quiz component for MkDocs documentation pages. Quizzes are defined as JSON files and embedded in any page using a single line of custom markdown.

---

## How it works

A MkDocs hook scans your markdown files for the quiz shortcode syntax and replaces it with the rendered quiz component at build time. You only need to create a JSON file and add one line to your page — everything else is handled automatically.

---

## Adding a quiz to a page

### 1. Create your quiz JSON file

Place your quiz file inside the `src/docs/quizzes/` folder:

```
src/
└── docs/
    └── quizzes/
        └── my-quiz.json
```

### 2. Embed it in your markdown page

On any MkDocs page, add the shortcode on its own line:

```markdown
:?my-quiz.json;
```

You only need the filename — not the full path. The hook knows to look inside `src/docs/quizzes/` automatically.

---

## JSON structure

```json
{
  "title": "Quiz title shown in the header",
  "description": "A short description shown on the start screen.",
  "questions": [
    {
      "question": "The question text shown to the user.",
      "options": [
        "First answer option",
        "Second answer option",
        "Third answer option",
        "Fourth answer option"
      ],
      "correct": 0,
      "explanation": "Shown after the user answers, regardless of whether they were right or wrong. Use this to reinforce or expand on the correct answer."
    }
  ]
}
```

### Field reference

| Field | Type | Description |
|---|---|---|
| `title` | string | The name of the quiz. Shown in the card header throughout. |
| `description` | string | A brief summary shown on the start screen before the quiz begins. |
| `questions` | array | A list of question objects. Aim for 5–10 questions per quiz. |
| `question` | string | The question text. |
| `options` | string[] | The list of answer choices shown to the user. |
| `correct` | number | The **zero-based index** of the correct option in the `options` array. |
| `explanation` | string | Extra context shown after the user answers. Always displayed — correct or not. |

> **Note on `correct`:** The index starts at `0`. So if the correct answer is the first option, use `0`; the second option is `1`; the third is `2`, and so on.

---

## Building
When you have created your quiz you need to build the site again.

Run the `build` script in the top level folder.