Update the existing “Create New Bi-Weekly Report” right-side slider panel.

Do NOT redesign layout.
Do NOT change section order.
Maintain existing styling and structure.

Apply the following enhancements:

🔹 1️⃣ MULTI-PHASE SELECTION

In the Executive Summary section:

Replace single phase selector with:

Multi-select dropdown:
“Select Phase(s)”

Pull phases dynamically from project.

Allow selecting multiple phases.

Display selected phases as removable chips.

When phases are selected:
Automatically calculate and display:

• Total Selected Phases
• Earliest Start Date
• Latest End Date
• Combined Duration
• Aggregated Overall Progress (%)

Aggregated Progress must be weighted based on task weights or durations.

🔹 2️⃣ EXECUTIVE SUMMARY AUTO INFO BLOCK

Add compact dynamic info panel above summary text area.

Auto-display:

• Total Tasks Across Selected Phases
• Tasks Completed During Period
• Tasks In Progress
• Delayed Tasks
• New Risks Raised
• Open Issues

This panel must auto-update when phases change.

Keep styling subtle and compact.

🔹 3️⃣ TASK AUTO-POPULATION (EDITABLE)

Based on selected phases:

Auto-pull all tasks belonging to those phases.

Display grouped by Phase.

For each task display:

Task Name (linked to project)

Current Master % Completion

Editable Report % Completion

Assigned To (editable dropdown)

Status (editable)

Include in Report toggle

User must be able to:

Modify % completion (report snapshot value)

Change assignee (report-only override)

Adjust status

Remove task from report

Add additional existing tasks manually

Important rule:
Editing values inside the report creates snapshot overrides.
Master task data must NOT be modified automatically.

🔹 4️⃣ NEXT STEPS (AUTO + EDITABLE)

Auto-populate from:

Incomplete tasks

Delayed tasks

Tasks starting in next reporting period

Display:

Phase

Task Name

Owner (editable)

Target Date (editable)

% Completion (editable)

User can:

Modify values

Remove items

Add existing tasks

Add manual action items

Changes apply only to report snapshot.

🔹 5️⃣ RISKS (AUTO + EDITABLE)

Auto-pull active risks from selected phases.

Display:

Risk Description (editable)

Priority (editable)

Mitigation Plan (editable)

Include toggle

User can:

Modify priority

Modify mitigation

Add new risk manually

Remove risk from report

Snapshot-only logic applies.

🔹 6️⃣ ISSUES (AUTO + EDITABLE)

Auto-pull open issues from selected phases.

Display:

Issue Description (editable)

Priority (editable)

Owner (editable)

Remarks (editable)

User can:

Modify fields

Add new issue

Remove from report

Snapshot-only logic applies.

🔹 7️⃣ LOGIC RULES

Auto-populated data must be fully editable.

Report acts as controlled snapshot.

Edits inside report must not alter master records unless user explicitly confirms sync.

Removing item only removes it from report, not from project.

All aggregated calculations must update dynamically when edits occur.

🔹 8️⃣ DO NOT CHANGE

Layout

Section order

Footer buttons

Design system styling

Maintain enterprise STG Suite tone and structure.