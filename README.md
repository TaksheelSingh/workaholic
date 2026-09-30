# workaholic. — Modern Attendance & Leave Tracker

A minimalist, high-productivity office attendance and leave tracking web dashboard inspired by modern SaaS KPI interfaces. Built with **React 19**, **Tailwind CSS v4**, **Node.js/Express**, and **Turso LibSQL Cloud SQLite**.

Features an interactive circular-date calendar grid, zero-latency optimistic UI updates, dual-half day visual splits, dynamic KPI calculation cards, cross-device custom UI controls, and live multi-device database sync.

👉 **Live Demo**: [https://workaholic-e0j5.onrender.com](https://workaholic-e0j5.onrender.com)

---

## 🌟 Key Features

* ⚡ **Zero-Latency Optimistic UI**: Instant 0ms state updates for single-click attendance and leave logging, backed by asynchronous non-blocking Turso cloud synchronization.
* 📅 **Interactive Circular Calendar**: Visual circular date nodes with real-time status rendering, month/year navigation, and middle-aligned calendar headers.
* 🎨 **Dual-Half Day Visual Splits**: Dynamic CSS linear gradients rendering 1st half ($0^\circ-180^\circ$) and 2nd half ($180^\circ-360^\circ$) leave allocations.
* 📱 **Mobile & Desktop Responsive Grid**: Dynamic layout adaptation across Desktop ($\ge 1101\text{px}$ 3-column proportional grid), Tablet ($769\text{px}-1100\text{px}$ 2-column grid), and Mobile ($\le 768\text{px}$ single-column stack).
* 📊 **Accumulated KPI Metrics Grid**: Real-time accumulated leave day cards for 8 attendance and leave categories:
  * **OFFICE**: In Office Work (`#34D399` / Light Green)
  * **WFH**: Work From Home (`#047857` / Dark Green)
  * **PL**: Privilege Leave (`#1D4ED8` / Dark Blue)
  * **SL**: Sick / Casual Leave (`#0EA5E9` / Light Blue)
  * **PH**: Public Holiday (`#F97316` / Orange)
  * **OPH**: Optional Public Holiday (`#EAB308` / Yellow)
  * **MD**: My Day Birthday/Anniversary (`#A855F7` / Purple)
  * **CO**: Compensatory Off (`#6366F1` / Indigo)
* 🧮 **Mathematical Calculation Engine**: Computes exact accumulated leave metrics formatted to 1 decimal place:
  $$\text{Total}(C) = N_{\text{full}}(C) \times 1.0 + N_{\text{half}}(C) \times 0.5$$
* 🛢️ **Turso LibSQL Live Database Sync**: Node.js/Express API server integrated with `@libsql/client` for real-time cloud SQLite persistence.
* 🔴 **Circular Action Buttons**: Clean circular action buttons in modal popups for quick updating, resetting, and cancelling.
* 🎯 **Custom Cross-Device UI Controls**: Custom styled select dropdowns with aligned chevron icons for consistent display across iOS, Android, and Desktop browsers.
* 🌙 **Full Dashboard Dark Mode**: Instant 0ms dark/light theme switching with saved user preferences.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, Tailwind CSS v4, Lucide Icons, Canvas Confetti
* **Backend**: Node.js, Express, CORS, Dotenv
* **Database**: Turso Cloud SQLite / LibSQL Client (`@libsql/client`)
* **Build Tool**: Vite v6
* **Deployment**: Render Web Service

---

## 📂 Project Structure

```
.
├── server/
│   └── index.js             # Express API server & Turso LibSQL database integration
├── src/
│   ├── components/
│   │   ├── CalendarCard.jsx # Interactive monthly calendar grid
│   │   ├── DashboardView.jsx# Main dashboard grid layout
│   │   ├── DateCircle.jsx   # Circular date node with split gradients
│   │   ├── KpiMetricsGrid.jsx# Accumulated leave cards (8 categories)
│   │   ├── LeaveHistoryView.jsx # Tabular transaction history view with search & export
│   │   ├── LeaveModal.jsx   # Attendance & leave configuration popup
│   │   ├── Sidebar.jsx      # Navigation sidebar & profile badge
│   │   └── TopBar.jsx       # Header top bar with theme toggle
│   ├── constants/
│   │   └── leaveTypes.js    # 8 leave categories & hex color palettes
│   ├── utils/
│   │   ├── calendarUtils.js # Date arithmetic & calendar matrix builder
│   │   ├── initialData.js   # Default fallback data structure
│   │   └── storage.js       # LocalStorage & Turso API sync helpers
│   ├── App.jsx              # Main React application & state controller
│   ├── index.css            # Tailwind CSS v4 & global theme styles
│   └── main.jsx             # Vite entry point
├── PROJECT.md               # Detailed technical architecture specification
├── render.yaml              # Render web service deployment manifest
├── standalone_dashboard.html# Single-file HTML browser preview
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js**: v18+
* **npm**: v9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TaksheelSingh/workaholic.git
   cd workaholic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional for Turso Cloud):
   Create a `.env` file in the root directory:
   ```env
   TURSO_DATABASE_URL=libsql://your-database-name.turso.io
   TURSO_AUTH_TOKEN=your-turso-auth-token
   PORT=3000
   ```
   *(Note: If `TURSO_DATABASE_URL` is omitted, the server automatically connects to a local SQLite database `file:workaholic.db`)*

---

## 🏃 Running the Application

### Option A: Full-Stack Live Database Mode (Express + Turso)

Build the production frontend assets and start the Node.js API server:
```bash
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Vite Frontend Dev Server

Launch the Vite hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment

This project is deployed on **Render**:

* **Live App URL**: [https://workaholic-e0j5.onrender.com](https://workaholic-e0j5.onrender.com)
* **Build Command**: `npm install && npm run build`
* **Start Command**: `npm start`

---

## 📜 License

Created by **Taksheel Rawat**. All rights reserved.
