# KPI Color System - Dubai Customs Performance Management

## Official KPI Status Colors

These are the standardized colors used throughout the Dubai Customs Performance Management System for KPI status indicators, gauges, and achievement displays.

### Color Definitions

| Status | Hex Code | Range | Label | Usage |
|--------|----------|-------|-------|-------|
| **Green** | `#357743` | 80-100% | On Track | KPIs meeting or approaching target |
| **Blue** | `#335CFF` | 100-120% | Exceeding | KPIs exceeding target significantly |
| **Yellow** | `#F2E600` | 40-80% | At Risk | KPIs below target but not critical |
| **Red** | `#D83731` | 0-40% | Critical | KPIs significantly below target |

## KPI Gauge Visual Zones

The KPI Gauge component displays four colored zones:

```
0%   →   40%   →   80%   →   100%   →   120%
[  Red  ] [ Yellow ] [ Green  ] [  Blue   ]
```

### Zone Breakdown:
- **Red Zone (0-40%)**: Critical performance requiring immediate attention
- **Yellow Zone (40-80%)**: Below target, needs improvement
- **Green Zone (80-100%)**: On track, meeting expectations
- **Blue Zone (100-120%)**: Exceeding expectations, exceptional performance

## Implementation Files

### Primary Files Using This System:
1. `/components/performance/KPIGauge.tsx` - Visual gauge component with colored zones
2. `/components/performance/KPIsPage.tsx` - KPI listing and management page
3. `/components/performance/CorporateDashboard.tsx` - Corporate dashboard view

### Color Functions

```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case "green": return "#357743";
    case "blue": return "#335CFF";
    case "yellow": return "#F2E600";
    case "red": return "#D83731";
    default: return "#6B7280";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "green": return "On Track";
    case "blue": return "Exceeding";
    case "yellow": return "At Risk";
    case "red": return "Critical";
    default: return "Unknown";
  }
};
```

## Visual Elements Using These Colors

### 1. KPI Cards
- **Actual Value Number**: Displayed in status color
- **Achievement Percentage**: Displayed in status color
- **Department Name**: Displayed in black (#111827)

### 2. KPI Gauge
- Colored zones as defined above
- Needle points to current achievement level
- Background gradient showing all four colors

### 3. Status Badges
- Border and text in status color
- Displays status label

### 4. Charts and Graphs
- Lines and bars can use status colors for different metrics
- Target lines in green (#357743)

## Design Notes

- **Consistency**: These colors should be used consistently across all performance-related views
- **Accessibility**: Ensure text contrast ratios meet WCAG standards when using these colors
- **Dubai Branding**: These colors complement the Dubai Customs blue (#5284B4) used in branding elements
- **Typography**: All KPI numbers and percentages use Dubai font family

## Color Psychology

- **Green**: Positive, on track, safe
- **Blue**: Excellent, exceeding, exceptional
- **Yellow**: Caution, warning, needs attention
- **Red**: Critical, urgent, immediate action required

---

**Last Updated**: January 2025
**Version**: 1.0
**Maintained by**: Dubai Customs Performance Management System
