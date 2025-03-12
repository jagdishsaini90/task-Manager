"use client";
import { useEffect, useMemo, useState } from "react";
import TaskCreationWrapper from "../_task";
import { CiFilter } from "react-icons/ci";
import {
  Board,
  Column,
  ColumnTitle,
  Container,
  Filters,
  Header,
  Section,
  SubText,
  Title,
} from "./styles";
import { useSelector } from "react-redux";
import CardComponent from "../../components/card";
import Button from "../../components/button";
import { IoMdAddCircleOutline } from "react-icons/io";
import Select from "../../components/select";
import styled from "styled-components";
import LineChartWrapper from "@/components/line-chart";
import { getTaskTrendData, groupedTasks } from "@/utils/helper";

const MANAGER_COLUMNS = ["Pending", "Closed", "Reopened"];
const DEVELOPER_COLUMNS = ["Open", "Pending"];

export const FilterSection = styled(Section)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  @media (max-width: 600px) {
    flex-direction: row;
    font-size: 0.7rem;
  }
`;

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const allTasks = useSelector((state) => state.tasks.tasks);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userTasks =
      user?.role === "Developer"
        ? allTasks.filter(
            (task) =>
              task.assignee.toLowerCase() === user.username.toLowerCase()
          )
        : allTasks;
    setTasks(userTasks);
    setFilteredTasks(userTasks);
  }, [allTasks]);

  useEffect(() => {
    let temp = [...tasks];
    if (filterStatus)
      temp = temp.filter((task) => task.status === filterStatus);
    if (filterPriority)
      temp = temp.filter((task) => task.priority === filterPriority);
    setFilteredTasks(temp);
  }, [filterStatus, filterPriority, tasks]);

  const taskTrendData = useMemo(
    () => getTaskTrendData(filteredTasks),
    [filteredTasks]
  );

  const tasksGroup = useMemo(
    () => groupedTasks(filteredTasks),
    [filteredTasks]
  );

  return (
    <Container>
      <Header>
        <div>
          <Title>Welcome, {user?.username}</Title>
          <SubText>Role: {user?.role}</SubText>
        </div>
        <Button
          icon={<IoMdAddCircleOutline fontSize={20} />}
          text="Create New Task"
          onClick={() => setShowModal(true)}
        />
      </Header>
      <FilterSection>
        <CiFilter fontSize={20} />
        <Filters>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="By-Status"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            {user.role === "Manager" ? (
              <>
                <option value="Closed">Closed</option>
                <option value="Reopened">Reopened</option>
              </>
            ) : (
              <option value="Open">Open</option>
            )}
          </Select>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            label="By-Priority"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </Filters>
      </FilterSection>

      <Section>
        <Board>
          {[
            ...(user?.role === "Developer"
              ? DEVELOPER_COLUMNS
              : MANAGER_COLUMNS),
          ].map((col) => {
            return (
              <Column key={col}>
                <ColumnTitle>
                  {col === "Pending" ? col + " Verification" : col}
                </ColumnTitle>
                {tasksGroup[col].length > 0 ? (
                  tasksGroup[col].map((task) => (
                    <CardComponent
                      key={task.id}
                      task={task}
                      setShowModal={setShowModal}
                      setSelectedTask={setSelectedTask}
                      user={user}
                    />
                  ))
                ) : (
                  <SubText>No {col} tasks</SubText>
                )}
              </Column>
            );
          })}
        </Board>
      </Section>
      <LineChartWrapper taskTrendData={taskTrendData} />
      <TaskCreationWrapper
        showModal={showModal}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setShowModal={setShowModal}
        assigneeDisabled={user?.role === "Developer"}
        user={user}
      />
    </Container>
  );
}
