"use client";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import TaskCreationWrapper from "../_task";
import CardComponent from "../../components/card";
import Button from "../../components/button";
import Select from "../../components/select";
import LineChartWrapper from "@/components/line-chart";
import { CiFilter } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";

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

import {
  filterTasks,
  getColumnsByRole,
  getUserFromStorage,
  getAllAssignees,
} from "@/utils/helper";
import { getTaskTrendData, groupedTasks } from "@/utils/helper";

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
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const allTasks = useSelector((state) => state.tasks.tasks);
  const user = useMemo(() => getUserFromStorage(), []);

  const filteredTasks = useMemo(
    () =>
      filterTasks(
        allTasks,
        {
          status: filterStatus,
          priority: filterPriority,
          assignee: filterUser,
        },
        user
      ),
    [allTasks, filterStatus, filterPriority, filterUser, user]
  );

  const tasksGroup = useMemo(
    () => groupedTasks(filteredTasks),
    [filteredTasks]
  );
  const taskTrendData = useMemo(
    () => getTaskTrendData(filteredTasks),
    [filteredTasks]
  );
  const columns = useMemo(() => getColumnsByRole(user?.role), [user?.role]);
  const allAssignees = useMemo(() => getAllAssignees(allTasks), [allTasks]);

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
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            {user?.role === "Manager" && (
              <>
                <option value="Closed">Closed</option>
                <option value="Reopened">Reopened</option>
              </>
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

          {user?.role === "Manager" && (
            <Select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              label="By-Assignee"
            >
              <option value="">All Assignee</option>
              {allAssignees.map((a) => (
                <option key={a} value={a.toLowerCase()}>
                  {a.toLowerCase()}
                </option>
              ))}
            </Select>
          )}
        </Filters>
      </FilterSection>

      <Section>
        <Board>
          {columns.map((col) => (
            <Column key={col}>
              <ColumnTitle>
                {col === "Pending" ? `${col} Verification` : col}
              </ColumnTitle>
              {tasksGroup?.[col]?.length > 0 ? (
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
          ))}
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
