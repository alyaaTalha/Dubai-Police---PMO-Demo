Design a structured Project Portfolio page that allows users to filter and manage projects across:

Lifecycle Status (Draft, Application, Ongoing, Closed)

Division (Studies, Projects)

Project Type (5 classifications)

Projects may belong to multiple types

Maintain STG branding, neutral grey base, blue primary CTAs, green progress bars.

This page must feel structured, intuitive, and enterprise-ready.

🧭 INFORMATION HIERARCHY

The correct filtering order should be:

1️⃣ Lifecycle Status (Primary Control Layer)
2️⃣ Division (Secondary Control Layer)
3️⃣ Project Type (Tertiary Classification Layer)

This avoids chaos.

🟦 Figma Maker Prompt — Complete Project List Structure
🔷 SECTION 1 — HEADER

Breadcrumb:
Home → Portfolio Dashboard → Project List

Page Title:
Project Portfolio

Top Right CTA Area:
[ + Create Project ] (Primary)
[ Export Portfolio ] (Secondary)
[ Bulk Actions ▼ ]

🔷 SECTION 2 — LIFECYCLE STATUS TABS (PRIMARY LAYER)

Large horizontal tabs:

Draft | Application | Ongoing | Closed

Ongoing = default

Show count badge next to each

Active tab has strong underline + color

When user clicks a tab:
It filters entire page content.

🔷 SECTION 3 — DIVISION TOGGLE (SECONDARY FILTER)

Below lifecycle tabs.

Segmented control:

[ All Divisions ] [ Studies ] [ Projects ]

Logic:

Studies = Strategies + Impact Assessment
Projects = Digital Solutions + New Services + External Engagement

🔷 SECTION 4 — PROJECT TYPE FILTER CHIPS (MULTI-SELECT)

Horizontal chip bar:

[ Strategies ]
[ Impact Assessment ]
[ Digital Solutions ]
[ New Services ]
[ External Engagement ]

Each chip:

Icon

Subtle color accent

Multi-select enabled

Displays count

Can coexist with others

Add:
[ Clear Filters ]

🔷 SECTION 5 — SMART FILTER BAR (ADVANCED FILTERING)

Below classification layer.

Fields:

Search
Owner dropdown
Section dropdown
Risk level
Budget variance
Strategic pillar

Right side:
[ Reset All ]

🔷 SECTION 6 — PORTFOLIO SUMMARY STRIP (EXECUTIVE INSIGHT)

Above table.

Display dynamic summary:

Ongoing Projects: 5
Studies: 2
Projects: 3
High Risk: 1
Over Budget: 0

This updates dynamically with filters.

🔷 SECTION 7 — PROJECT LIST DISPLAY

Use modern enterprise smart-table design.

🔹 Table Columns

Project Name
Lifecycle Status (badge)
Division (Study / Project badge)
Project Type (multi-tag chips)
Owner
Completion % (mini progress bar)
Budget Health (color indicator)
Risk Level (RAG dot)
Timeline
Action

🔹 Badge Logic

Lifecycle Status:
Draft = Grey
Application = Blue
Ongoing = Green
Closed = Dark Grey

Division:
Study = Light Blue badge
Project = Dark Blue badge

Type:
Color-coded chips

🔹 Multi-Type Display

If project spans multiple types:

Show stacked chips:
[ Digital Solutions ] [ New Services ]

Hover tooltip:
"Spans multiple classifications"

🔷 SECTION 8 — ALTERNATIVE VIEW TOGGLE (OPTIONAL BUT POWERFUL)

Top-right above table:

[ Table View ] [ Classification Board View ]

🔹 Classification Board View

Grouped by Project Type:

Strategies
Impact Assessment
Digital Solutions
New Services
External Engagement

Projects appear under applicable types.

Still filtered by lifecycle and division.

🔷 SECTION 9 — ROW-LEVEL CTAs

Primary:
[ View ] (dominant)

Secondary:
[ Edit ]
[ Archive ]
[ More ▼ ]

Do NOT keep delete as primary action.

🔷 EMPTY STATES (CRITICAL FOR UX)

If Draft tab selected and empty:

"No Draft Projects Yet"
[ + Create Draft Project ]

If Application tab empty:

"No Projects Under Review"

If Ongoing empty:

"No Active Projects"

🔷 USER FLOW EXAMPLES

Scenario 1:
User lands on page → Ongoing tab → sees filtered list

Scenario 2:
User clicks "Studies" → sees only Strategies + Impact Assessment

Scenario 3:
User clicks:
Closed → Projects → Digital Solutions
Sees completed digital initiatives only