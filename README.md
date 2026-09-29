# workaholic. — Attendance & Leave Tracker

A minimalist, high-productivity office attendance and leave tracking web dashboard inspired by modern SaaS KPI interfaces. It features an interactive circular-date calendar, dual-half day visual splits, dynamic KPI calculation cards, native light/dark theme support, and live database sync via Turso LibSQL.

---

## 🌟 Key Features

* 📅 **Interactive Circular Calendar**: Visual circular date nodes with real-time state rendering and month navigation.
* 🎨 **Dual-Half Day Visual Splits**: Dynamic CSS linear gradients rendering 1st half ($0^\circ-180^\circ$) and 2nd half ($180^\circ-360^\circ$) leave allocations.
* 📊 **Accumulated KPI Metrics Grid**: Real-time accumulated leave day cards for 7 categories:
  * **PH**: Public Holiday (`#F97316`)
  * **OPH**: Optional Public Holiday (`#EAB308`)
  * **MD**: My Day Birthday/Anniversary (`#A855F7`)
  * **OD**: On Duty Client Site (`#EF4444`)
  * **PL**: Privilege Leave (`#1D4ED8`)
  * **SL**: Sick / Casual Leave (`#0EA5E9`)
  * **WFH**: Work From Home (`#10B981`)
* ⚡ **Mathematical Engine**: Computes exact accumulated leave days formatted with decimals:
  $$\text{Total}(C) = N_{\text{full}}(C) \times 1.0 + N_{\text{half}}(C) \times 0.5$$
* 🛢️ **Turso LibSQL Live Database**: Node.js/Express backend server integrated with `@libsql/client` for live database persistence on Turso Cloud SQLite.
* 🌙 **Full Dashboard Dark Mode**: Seamless dark/light theme switching applied across the entire layout.
* 🚀 **Render Ready**: Pre-configured `render.yaml` for 1-click cloud web service deployment.

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
│   │   ├── DashboardView.jsx# Main dashboard layout
│   │   ├── DateCircle.jsx   # Circular date node with split gradients
│   │   ├── KpiMetricsGrid.jsx# Accumulated leave cards (7 categories)
│   │   ├── LeaveModal.jsx   # Attendance configuration popup
│   │   ├── Sidebar.jsx      # Navigation & profile badge
│   │   └── TopBar.jsx       # Header bar
│   ├── constants/
│   │   └── leaveTypes.js    # 7 leave categories & hex palettes
│   ├── utils/
│   │   ├── calendarUtils.js # Date arithmetic & calendar matrix
│   │   ├── initialData.js   # Blank initial data structure
│   │   └── storage.js       # LocalStorage & Turso API sync helpers
│   ├── App.jsx              # Main React application component
│   ├── index.css            # Tailwind CSS & global styles
│   └── main.jsx             # Vite entry point
├── render.yaml              # Render web service deployment manifest
├── standalone_dashboard.html# Single-file HTML browser preview
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+ 
* npm v9+

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
   *(Note: If `TURSO_DATABASE_URL` is omitted, the server automatically connects to a local SQLite file `file:workaholic.db`)*

---

## 🏃 Running the Application

### Option A: Full-Stack Live Database Mode (Express + Turso)

Build the frontend assets and launch the Node.js API server:
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

## ☁️ Deploying to Render

1. Push your repository to GitHub.
2. Log in to [Render](https://render.com) and create a **New Web Service**.
3. Connect your GitHub repository `workaholic`.
4. Configure service settings:
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm start`
5. Add Environment Variables in Render Dashboard:
   * `TURSO_DATABASE_URL` = `libsql://your-database.turso.io`
   * `TURSO_AUTH_TOKEN` = `your-turso-token`
6. Click **Deploy Web Service**!

---

## 📜 License

Made with ❤️ by **Taksheel Rawat**. All rights reserved.
