import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: "40961e3c-f529-4264-b10a-7d6aa88e5d71",
      title: "Design Login Page",
      description:
        "Create a responsive login page with form validation and error handling.",
      priority: "High",
      status: "Pending",
      assignee: "devuser",
      startDate: "2025-03-13",
      endDate: "2025-03-16",
      type: "Bug",
      currentTime: 1710190244,
    },
    {
      id: "b3722ef0-d285-479e-9691-7dc867a24568",
      title: "Implement API Integration",
      description:
        "Connect frontend components with the backend APIs for authentication.",
      priority: "Medium",
      status: "Open",
      assignee: "devuser",
      startDate: "2025-03-14",
      endDate: "2025-03-18",
      type: "Bug",
    },
    {
      id: "07a8b26d-b64d-4937-9ea7-4a8c313340d1",
      title: "Fix Dashboard Bugs",
      description: "Resolve known issues in the dashboard charts and filters.",
      priority: "Low",
      status: "Open",
      assignee: "Charlie",
      startDate: "2025-03-13",
      endDate: "2025-03-15",
      type: "Bug",
    },
    {
      id: "e4006400-a0d4-4e6f-9dd4-435ea2dbabd2",
      title: "Write Unit Tests",
      description:
        "Add unit tests for task management components using Jest and React Testing Library.",
      priority: "Medium",
      status: "Closed",
      assignee: "Diana",
      startDate: "2025-03-15",
      endDate: "2025-03-20",
      type: "Bug",
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
