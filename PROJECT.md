# Technical Architecture & System Specification: workaholic.

## 1. Executive Summary

**workaholic.** is a high-performance, real-time office attendance and leave management web application. It combines an intuitive SaaS dashboard interface with zero-latency state synchronization, dual-half day visual indicators, live Turso cloud database persistence, and adaptive cross-device responsive design.

---

## 2. System Architecture & Tech Stack

```
 ┌─────────────────────────────────────────────────────────┐
 │                   React 19 Frontend                      │
 │   ┌──────────────────┐    ┌─────────────────────────┐   │
 │   │  State Engine    │    │  Optimistic Local Storage│   │
 │   └────────┬─────────┘    └────────────┬────────────┘   │
 └────────────┼───────────────────────────┼────────────────┘
              │ Non-blocking Async HTTP   │ Synchronous 0ms
              ▼                           ▼
 ┌──────────────────────────┐    ┌─────────────────────────┐
 │ Node.js / Express Server │    │ Browser LocalStorage    │
 └────────────┬─────────────┘    └─────────────────────────┘
              │ LibSQL Client
              ▼
 ┌──────────────────────────┐
 │ Turso Cloud Database     │
 └──────────────────────────┘
```

### 🛠️ Core Technologies

* **Frontend Framework**: React 19 + Vite 6
* **Styling & Design System**: Tailwind CSS v4 + Custom Utility Classes
* **Icons & Animation**: Lucide React Icons, Canvas Confetti
* **Backend Runtime**: Node.js v18+ with Express
* **Database Driver**: `@libsql/client` (Turso Cloud SQLite / Local File Fallback)
* **Cloud Hosting**: Render Web Service (`render.yaml`)

---

## 3. Data & State Synchronization Architecture

### ⚡ Optimistic UI Update Pattern (0ms Response Latency)

To eliminate network latency when logging attendance or submitting modal changes, **workaholic.** employs an optimistic UI pattern:

1. **Synchronous Local Mutation**:
   Upon user action (date click or modal save/reset), React local state (`leaves`) and `localStorage` are updated **synchronously (0ms latency)**. The UI updates instantly.

2. **Non-Blocking Background Persistence**:
   The application dispatches an asynchronous HTTP request to the Express API (`saveTursoLeave` / `deleteTursoLeave`) in the background without `await`ing in the UI thread.

3. **Smart Conflict Resolution & Background Polling**:
   Every 5 seconds, the app polls the server (`syncServerData`). To prevent visual re-render flickering, incoming server payload is compared against local state via deep JSON check and updated only when external mutations occur.

---

## 4. UI / UX Responsive Layout Specifications

The dashboard adapts seamlessly across device form factors:

### A. 👈 Left Navigation Sidebar (`aside.sidebar`)
* **Desktop ($\ge 769\text{px}$)**: Fixed width of `240px` (`padding: 24px 18px`, `flex-shrink: 0`).
* **Mobile ($\le 768\text{px}$)**: Replaced by a sticky top header bar with quick menu access.

### B. 📊 Workspace Dashboard Grid (`.dashboard-3col-grid`)
* **Desktop ($\ge 1101\text{px}$)**: Proportional 3-column grid (`2fr : 1.6fr : 1.4fr` with `16px` gap):
  * **Column 1**: Interactive Calendar Card (40% width).
  * **Column 2**: Accumulated KPI Cards Grid (32% width).
  * **Column 3**: Active Cycle Summary & Recent Ledger (28% width).
* **Tablet ($769\text{px}-1100\text{px}$)**: 2-column layout:
  * **Top Row**: Calendar Card (spans full width).
  * **Bottom Row**: KPI Grid (50%) & Summary Ledger (50%) side-by-side.
* **Mobile ($\le 768\text{px}$)**: Single-column vertical stack with full phone screen width and `14px 10px` inner padding.

---

## 5. Attendance & Leave Categories Schema

| Category Code | Name | Primary Hex | Description |
| :--- | :--- | :--- | :--- |
| **OFFICE** | In Office Work | `#34D399` | On-site office attendance day |
| **WFH** | Work From Home | `#047857` | Remote work allocation day |
| **PL** | Privilege Leave | `#1D4ED8` | Earned annual paid time off |
| **SL** | Sick / Casual Leave | `#0EA5E9` | Unplanned health or personal leave |
| **PH** | Public Holiday | `#F97316` | Mandatory public holiday |
| **OPH** | Optional Public Holiday | `#EAB308` | Elective religious or regional holiday |
| **MD** | My Day | `#A855F7` | Birthday / Anniversary special leave |
| **CO** | Compensatory Off | `#6366F1` | Earned overtime credit day |

### 🧮 Mathematical Calculation Formula

The total leave duration for category $C$ in any given billing cycle is computed as:

$$\text{Total}(C) = N_{\text{full}}(C) + 0.5 \times N_{\text{half}}(C)$$

Where:
* $N_{\text{full}}(C)$ is the count of full-day allocations for category $C$.
* $N_{\text{half}}(C)$ is the count of half-day allocations for category $C$.

---

## 6. Interactive Date Circle & Visual Gradient Engine

### 👆 Click Interaction Logic
* **Single Click (Blank Date)**: Triggers instant log for **In Office Work** (`OFFICE` / `#34D399`).
* **Second Click (Logged Date)**: Opens the **Leave Modal Dialog** to modify duration (Full Day, 1st Half, 2nd Half), change category, or reset the entry.

### 🎨 Dual-Half Day Gradient Rendering
Half-day leaves are rendered on circular date nodes using CSS conic gradients:
* **Full Day**: Solid background fill of target category color.
* **1st Half Only**: $0^\circ \rightarrow 180^\circ$ filled with category color, $180^\circ \rightarrow 360^\circ$ transparent/neutral.
* **2nd Half Only**: $0^\circ \rightarrow 180^\circ$ transparent/neutral, $180^\circ \rightarrow 360^\circ$ filled with category color.
* **Split Dual Half**: $0^\circ \rightarrow 180^\circ$ color A, $180^\circ \rightarrow 360^\circ$ color B.

---

## 7. Backend API Specification

The Node.js Express server exposes RESTful JSON endpoints:

* `GET /api/leaves`
  Returns all logged leave records stored in Turso database.
* `POST /api/leaves`
  Body: `{ dateStr: "YYYY-MM-DD", entryData: Object }`
  Upserts a date entry into the database.
* `DELETE /api/leaves/:dateStr`
  Removes a date record from the database.

---

## 8. Theme & Cross-Device UI Standards

* **Instant Dark/Light Theme Switcher**: Manipulates `document.documentElement.classList` synchronously to prevent layout flashing.
* **Custom Dropdown Select Controls**: Styled with `appearance-none` and absolute chevron SVG icons (`pr-3.5`) to ensure identical appearance across Safari iOS, Android Chrome, and Desktop Web.
* **Circular Action Buttons**: Clean `w-10 h-10 rounded-full` red trash and indigo tick buttons in modal footers.
