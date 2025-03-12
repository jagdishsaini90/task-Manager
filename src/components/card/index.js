"use client";
import React from "react";
import { Card, PriorityTag, TaskMeta, TaskTitle } from "./styles";
import { MdEdit, MdBugReport } from "react-icons/md";
import { GiBookmarklet, GiChessQueen } from "react-icons/gi";

const taskTypeIcons = {
  Bug: (
    <MdBugReport
      fontSize={25}
      style={{ color: "#FF4D4F", marginLeft: "0.5rem" }}
    />
  ),
  Story: (
    <GiBookmarklet
      fontSize={25}
      style={{ color: "#1890FF", marginLeft: "0.5rem" }}
    />
  ),
  Epic: (
    <GiChessQueen
      fontSize={25}
      style={{ color: "#9254DE", marginLeft: "0.5rem" }}
    />
  ),
};

const CardComponent = ({ task, setShowModal, setSelectedTask, user }) => {
  const handleEditClick = () => {
    setShowModal(true);
    setSelectedTask(task);
  };

  return (
    <Card>
      <TaskTitle>
        {task.title}
        <MdEdit
          onClick={handleEditClick}
          fontSize={20}
          cursor="pointer"
          style={{ marginLeft: "0.5rem" }}
        />
      </TaskTitle>

      <TaskMeta>Assignee: {task.assignee}</TaskMeta>

      <TaskMeta
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          Priority:{" "}
          <PriorityTag level={task.priority.toLowerCase()}>
            {task.priority}
          </PriorityTag>
        </div>
        {taskTypeIcons[task.type] || null}
      </TaskMeta>

      <TaskMeta>Start Date: {task.startDate}</TaskMeta>
      <TaskMeta>End Date: {task.endDate}</TaskMeta>
      {task.status === "Closed" &&
        task?.totalTimeSpend &&
        user?.role === "Manager" && (
          <TaskMeta>Time Taken: {task.totalTimeSpend}</TaskMeta>
        )}
    </Card>
  );
};

export default CardComponent;
