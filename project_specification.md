# Project Specification: Presentia Attendance & Leave Tracker

A minimalist, high-productivity office attendance and leave tracking web dashboard inspired by modern SaaS KPI interfaces. It features an interactive circular-date calendar, dual-half day visual splits, dynamic KPI calculation cards, and native light/dark theme support.

---

## 1. Project Overview

* **Application Name:** **Presentia** (Alternative: **Attendify**)
* **Objective:** Streamline individual and office leave management through visual calendar nodes and instant leave metrics.
* **Core Design Reference:** Clean SaaS layout, pill navigation, soft rounded cards, crisp typography, and high-contrast color indicators.
* **Storage & Persistence:** Client-side local storage (`localStorage`) with export/import JSON capability.

---

## 2. Layout & UI Structure

### 2.1 Left Sidebar
* **Top Header:**
  * Application Logo & Name (`Presentia.`)
  * Quick-switch Light / Dark mode toggle (Sun / Moon icon)
* **Navigation List (`MAIN`):**
  * **Dashboard** (Default active route with clean pill highlight)
  * Calendar View
  * Leave History
  * Settings
* **Bottom Profile Badge:**
  * User avatar pill with initials (`TR`)
  * Full Name (`Taksheel Rawat`)
  * Role subtext (`Local User`)

### 2.2 Main Dashboard Panel
* **Top Bar:**
  * Page Title: **Dashboard**
  * Subtitle: *Real-time leave balances, half-day allocations, and monthly attendance tracking.*
  * Month / Cycle selector dropdown (e.g., *September 2026*)
* **Central Interactive Calendar:**
  * Month navigation arrows (`<`, `>`) centered around the active month title.
  * 7-column weekday headers (`SUN`, `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`).
  * Day circles with responsive state rendering:
    * **Default / Working Day:** Neutral circle with calendar day number.
    * **Full Day Leave:** Solid circle filled with the category's accent color.
    * **1st Half Leave:** Left semicircle filled with leave color; right semicircle neutral or secondary leave color.
    * **2nd Half Leave:** Right semicircle filled with leave color; left semicircle neutral or secondary leave color.
    * **Dual Half Leaves:** Split semicircle showing two distinct colors (e.g., 1st Half Sick Leave + 2nd Half WFH).
  * Legend below calendar mapping leave labels to their color markers.
* **KPI Metrics Grid (Side / Adjacent Cards):**
  * Individual cards computing the accumulated total for every leave type.
  * Cards include:
    * Category color dot & name
    * Total accumulated days (formatted with decimals, e.g., `1.0`, `2.5`)
    * Sub-metrics showing breakdown of Full Days vs. Half Days
    * Clean micro-interaction hover effect (elevated shadow and smooth translate-Y).

---

## 3. Leave Types & Color Palette

| Category | Key | Accent Color | Light Theme Hex | Dark Theme Hex |
| :--- | :--- | :--- | :--- | :--- |
| **Public Holiday** | `PH` | Orange | `#F97316` | `#FB923C` |
| **Optional Public Holiday** | `OPH` | Yellow | `#EAB308` | `#FACC15` |
| **My Day** | `MD` | Purple | `#A855F7` | `#C084FC` |
| **On Duty (OD)** | `OD` | Red | `#EF4444` | `#F87171` |
| **Privilege Leave (PL)** | `PL` | Dark Blue | `#1D4ED8` | `#3B82F6` |
| **Sick / Casual Leave** | `SL` | Light Blue | `#0EA5E9` | `#38BDF8` |
| **Work From Home (WFH)** | `WFH` | Green | `#10B981` | `#34D399` |

---

## 4. Modal Flow & Allocation Rules

When a date circle is clicked, a popup modal appears with the following workflow:

1. **Row 1 - Leave Category:**
   * Select from the 7 defined types (Public Holiday, Optional Public Holiday, My Day, OD, PL, Sick/Casual, WFH).
2. **Row 2 - Duration Allocation:**
   * **Full Day:** Fills the full circle node with the selected color.
   * **1st Half:** Fills the left semicircle ($0^\circ \text{ to } 180^\circ$ vertical split).
   * **2nd Half:** Fills the right semicircle.
3. **Sequential Half-Day Resolution:**
   * If a user logs a half-day, the system prompts them to either:
     * Save the remaining half as regular working hours, OR
     * Assign a different leave category to the other half.
4. **Overwrite & Clearing:**
   * An existing date entry shows an **Overwrite** button to edit allocations or a **Reset Day** button to revert back to a standard working day.

---

## 5. Mathematical Computation Engine

For any selected month, total leave units per category $C$ are calculated as:

$$\text{Total}(C) = N_{\text{full}}(C) \times 1.0 + N_{\text{half}}(C) \times 0.5$$

Where:
* $N_{\text{full}}(C)$ is the count of full-day allocations of type $C$.
* $N_{\text{half}}(C)$ is the total occurrences of type $C$ appearing in either 1st-half or 2nd-half slots.

---

## 6. Implementation Architecture

* **Framework Options:** Single-file standalone HTML5 + Tailwind CSS + Vanilla JS, or a single-file React component.
* **Circle Split Styling:** Implemented via CSS linear gradients:
  * Full Day: `background-color: var(--color-leave);`
  * 1st Half: `background: linear-gradient(90deg, var(--color-leave) 50%, var(--bg-neutral) 50%);`
  * 2nd Half: `background: linear-gradient(90deg, var(--bg-neutral) 50%, var(--color-leave) 50%);`
  * Mixed Halves: `background: linear-gradient(90deg, var(--color-half-1) 50%, var(--color-half-2) 50%);`