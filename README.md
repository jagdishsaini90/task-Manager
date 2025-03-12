# 🗂️ Task Management Dashboard

A clean, role-based task management application built with **Next.js**, **React**, **Redux Toolkit**, and **Styled Components**. The dashboard allows users to create, filter, and track tasks in real-time, with visual trends and customizable filters.

---

## 🚀 Features

- ✅ Role-based access: **Developer** and **Manager** views
- 📝 Create, view, delete, and update tasks
- 🔍 Filter by **Status**, **Priority**, and **Assignee**
- 📊 Task trends with interactive **Line Charts**
- 📂 Tasks grouped by status (Open, Pending, Closed, Reopened)
- 🕒 Time tracking support (extendable)
- 🎨 Fully responsive and modular design

---

---

## ⚙️ Tech Stack

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [Chart.js / Recharts](https://recharts.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 🔑 User Roles

- User has 2 roles – **Developer** and **Manager**

### 👨‍💻 Developer

- Can view and manage **their own tasks**
- Can view **Open** and **Pending** columns
- **Assignee field disabled** during task creation

### 👩‍💼 Manager

- Can view **all tasks**
- Access to **Open**, **Pending**, **Closed**, and **Reopened** columns
- Can assign tasks to **any user**

---

## 📊 Task Trend Chart

- Visual representation of task statuses over time
- Based on filtered task data
- Helps managers track project progress and workload

---

## 🧠 Helper Utilities

Utility functions in `utils/`:

- `getUserFromStorage()` – Parses logged-in user from localStorage
- `filterTasks()` – Apply filters based on status, priority, assignee
- `groupedTasks()` – Groups tasks by status for column-wise rendering
- `getTaskTrendData()` – Prepares data for the trend line chart
- `getColumnsByRole()` – Determines visible columns by user role
- `getAllAssignees()` – Extracts unique assignees for filter dropdown

---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jagdishsaini90/task-Manager.git
   cd task-Manager
   ```
2. **Run the Project**
   ```bash
   npm install
   npm run dev
   ```
