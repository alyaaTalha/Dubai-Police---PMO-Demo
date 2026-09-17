Design a full-height right-side sliding panel for “Add Task” inside the STG Suite Project Details page.

The panel must:

Slide in from the right

Cover 40–50% of screen width

Be full viewport height

Overlay content with darkened background (subtle blur)

Close via “X” icon top-right

Maintain enterprise STG Suite styling

🔹 HEADER SECTION (Sticky Top)

Panel title: Add Task
Subtitle: Linked to Project: Implement CRM

Right corner:

Close (X) icon

Below title:
Horizontal divider line

🔹 BODY SECTION (Scrollable Content)

Use structured sections with subtle dividers.

🟦 SECTION 1 — BASIC INFORMATION

Fields:

ID (auto-generated, read-only)

Task Name * (text input)

Project (read-only link to project)

🟦 SECTION 2 — DURATION

Use 3-column layout:

Duration (numeric input)

Start Date (date picker)

Finish Date (date picker)

Add smart logic note:
“Finish date auto-calculated based on duration.”

🟦 SECTION 3 — PROGRESS & COST

3-column layout:

Percent Complete (0–100 input)

Budget Cost (currency input)

Actual Cost (currency input)

Below:

Task Weight (numeric input)

Status * (dropdown: Not Started / In Progress / Delayed / Completed)

🟦 SECTION 4 — DEPENDENCIES

Field:

Predecessors (multi-select dropdown with existing tasks)

Show dependency chain preview beneath.

🟦 SECTION 5 — ASSIGNMENT

Assigned To (multi-select team dropdown)

Priority (Low / Medium / High / Critical)

🔹 OPTIONAL — AI TASK INSIGHT BLOCK (Subtle)

Add collapsible section:
“AI Task Insight”

When expanded, show:

Predicted delay risk

Recommended duration adjustment

Dependency conflict detection

Keep subtle, professional styling.

🔹 FOOTER SECTION (Sticky Bottom)

Full-width footer bar.

Left:

Cancel (secondary button)

Right:

Save (primary button)

Save & Add Another (ghost button)

Buttons must align right.

🔹 DESIGN REQUIREMENTS

Use same spacing as existing system

Clear section titles

Balanced padding (24px internal)

Scrollable content area

Sticky header + sticky footer

No overcrowding

Clean enterprise feel

Animation:

Slide in from right (300ms ease)

Background fade overlay

Maintain STG Suite governance tone and hierarchy.