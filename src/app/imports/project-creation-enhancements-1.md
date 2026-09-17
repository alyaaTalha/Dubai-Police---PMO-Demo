Extend the existing “Create New Project” design without changing layout style.

Add lifecycle intelligence based on EPMO project lifecycle.

🔹 HEADER UPDATE

Under Status: Draft, add:

Lifecycle Stage: Ideation

Add a horizontal lifecycle tracker:

Ideation → Pilot → Handover → Implementation → Monitoring

Highlight Ideation.

🔹 INSIDE GOVERNANCE & RISK SECTION

Add new sub-block titled:

“Ideation Workflow Gate”

Fields:

Directional Approval Required? (Toggle Yes/No)

Product Type (Strategy / Digital / Impact Assessment / New Service / External Engagement)

Pilot Required? (Yes / No)

Conditional logic:

If Product Type = Digital:
Show:
- Business Requirement Definition (Checklist)
- Functional Requirement Definition (Checklist)
- Legal Feasibility Assessment (Checklist)

Add Gate Status badge:

Pending Review

Approved

Rejected

🔹 SUBMISSION LOGIC UPDATE

Full Submission button must check:

All required governance sections completed

Directional Approval granted

If Pilot Required = Yes:
After approval, project moves to:
Status: Pilot Phase

If Pilot Required = No:
Project moves directly to:
Handover Stage

Maintain exact existing UI style and card structure.