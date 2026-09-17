Create the internal layout page for an Ongoing Project in STG Suite with compact enterprise header (no hero banner) and minimal scrolling.

Keep the same layout shell and add a new tab called Bi-Weekly Status.

Tabs (in this exact order):

Project Overview

Bi-Weekly Status

Milestones & Tasks

Cost Management

Risk Register

Stakeholders

Goals & Benefits

Resources

Lessons Learned

Project Closure

Collaboration

2) BI-WEEKLY STATUS TAB — STRUCTURE PROMPT (layout only)

Populate the Bi-Weekly Status tab as a governance reporting workspace inside the project.

The tab must support:

Creating a new bi-weekly report instance

Editing the template fields (exact field names)

Commenting & @mentions per section

Version history (Draft → Submitted → Approved → Locked)

Export to PowerPoint using the same report structure

Layout (min scrolling):

Top toolbar (sticky):

Report Period selector (e.g., “12-Feb-2026”)

Status badge (Draft / Submitted / Approved / Locked)

Buttons: [Create New Report] [Submit for Approval] [Approve] [Export PPT]

Left side (70%): report sections as collapsible panels (accordion)

Right side (30%): Comments panel (threaded), Watchers, Approvers, Last updated

3) BI-WEEKLY STATUS TAB — TEMPLATE FIELDS PROMPTS (panel-by-panel)

Below are separate prompts to populate each section panel using your exact table field names. 

12 Feb - Biweekly Report - Copy…

3.1 Executive Summary panel

Create the Executive Summary panel with two compact tables and two text areas.

Table A fields (exact):

Project Name

Start Date

End Date

Duration

Phases

Overall Progress

Support

Table B fields (exact):

Current Phase

Start

End

Duration

Completion %

Status

Revised Go-Live Date

Below tables add two text blocks (exact labels):

Core Activities Summary

Support Activities Summary

Add per-block comments icon + “Add comment” entry.

3.2 Project Timelines panel (Weekly Status Report | Phase 1 | Sub-Phases)

Create panel titled Weekly Status Report | Phase 1 | Sub-Phases with a table using exact fields:

Sub-Phase

Milestones

Start Date

End Date

Status

Include row expand to show milestone list neatly (no long wrapping).

3.3 Weekly Status Report panel (UAT / New Requests)

Create panel titled Weekly Status Report | Phase 1 | UAT / New Requests with table fields (exact):

Workstream

Activities

Owner

Status

Details

Include inline status pills and owner multi-select.
Allow commenting per row.

3.4 Next Steps panel

Create panel titled Weekly Report Status | Phase 1 | Next Steps with table fields (exact):

Workstream

Activities

Owner

Details

Add “Convert to task” optional action, but keep this separate from Milestones (it should create a linked reference not a task inside the milestones tab).

3.5 Project Risks Summary panel

Create panel titled Project Risks Summary with table fields (exact):

Description

Status

Priority

Owner

Identified Date

Plan Closure Date

Actual Closure Date

Risk Mitigation

Add filters for Status/Priority and allow threaded comments per risk row.

3.6 Project Issues Summary panel

Create panel titled Project Issues Summary with table fields (exact):

Description

Status

Priority

Owner

Identified Date

Plan Closure Date

Actual Closure Date

Remarks

Include “Escalate” action and comment threads.

4) Small CTA additions (to guide adoption)
Project Overview tab (top-right mini CTA)

Add a compact CTA card/button inside Project Overview:

“Bi-Weekly Status: Draft pending update”

Button: [Update Bi-Weekly Report] → opens Bi-Weekly Status tab with latest report selected.

Project internal header (optional)

In the internal project header command area, add an icon button:
“Bi-Weekly Report” shortcut.