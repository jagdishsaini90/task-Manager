import React from "react";
import { Card, PriorityTag, TaskMeta, TaskTitle } from "./styles";
import { MdEdit } from "react-icons/md";

const CardComponent = ({ task, setShowModal, setSelectedTask }) => {
  return (
    <Card>
      <TaskTitle>
        {task.title}{" "}
        <MdEdit
          onClick={() => {
            setShowModal(true);
            setSelectedTask(task);
          }}
          fontSize={20}
          cursor="pointer"
        />
      </TaskTitle>
      <TaskMeta>Assignee: {task.assignee}</TaskMeta>
      <TaskMeta>
        Priority:{" "}
        <PriorityTag level={task.priority.toLowerCase()}>
          {task.priority}
        </PriorityTag>
      </TaskMeta>
      <TaskMeta>Start Date: {task.startDate}</TaskMeta>
      <TaskMeta>End Date: {task.endDate}</TaskMeta>
    </Card>
  );
};

export default CardComponent;
