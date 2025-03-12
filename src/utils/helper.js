export const groupedTasks = (filteredTasks) => {
  return filteredTasks.reduce(
    (acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    },
    { Open: [], Closed: [], Pending: [], Reopened: [] }
  );
};

export const getTaskTrendData = (filteredTasks) => {
  return Object.entries(
    filteredTasks.reduce((acc, task) => {
      acc[task.startDate] = (acc[task.startDate] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({ date, count }));
};

export const checkDateRange = (formData) => {
  const today = new Date();
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);

  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (startDate < today) {
    return "Start Date cannot be earlier than today.";
  }

  if (endDate < startDate) {
    return "End Date cannot be earlier than Start Date.";
  }
  return "";
};

export const convertTimeDiff = (start, end = Date.now()) => {
  const diffMs = Math.abs(end - start);
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `${days} days and ${hours} hours`;
};

// utils/taskHelpers.js

export const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    return null;
  }
};

export const filterTasks = (tasks, filters, user) => {
  let result =
    user?.role === "Developer"
      ? tasks.filter(
          (task) =>
            task.assignee.toLowerCase() === user?.username?.toLowerCase()
        )
      : tasks;

  if (filters.status) {
    result = result.filter((task) => task.status === filters.status);
  }

  if (filters.priority) {
    result = result.filter((task) => task.priority === filters.priority);
  }

  if (filters.assignee) {
    result = result.filter(
      (task) => task.assignee.toLowerCase() === filters.assignee.toLowerCase()
    );
  }

  return result;
};

export const getColumnsByRole = (role) =>
  role === "Developer"
    ? ["Open", "Pending"]
    : ["Open", "Pending", "Closed", "Reopened"];

export const getAllAssignees = (tasks) =>
  tasks.reduce((acc, task) => {
    if (!acc.includes(task.assignee)) acc.push(task.assignee);
    return acc;
  }, []);
