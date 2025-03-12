"use client";
import { addTask, deleteTask, editTask } from "@/redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineCancel, MdDelete } from "react-icons/md";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Button from "../../components/button";
import Select from "../../components/select";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
`;

const ModalContainer = styled.div`
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  color: #fff;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 600px) {
    padding: 1rem;
    max-height: 70%;
    overflow-y: auto;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  text-align: center;
  margin-top: -0.5rem;
`;

const initialState = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Open",
  assignee: "",
  startDate: "",
  endDate: "",
};

export default function TaskCreationWrapper({
  showModal,
  setShowModal,
  selectedTask,
  setSelectedTask,
  assigneeDisabled,
  user,
}) {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTask) {
      setFormData(selectedTask);
    }
  }, [selectedTask]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      assignee: user?.role === "Developer" ? user?.username : prev.assignee,
    }));
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
    setFormData(initialState);
  };

  const handleDelete = () => {
    dispatch(deleteTask(formData.id));
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (startDate < today) {
      setError("Start Date cannot be earlier than today.");
      return;
    }

    if (endDate < startDate) {
      setError("End Date cannot be earlier than Start Date.");
      return;
    }

    setError("");
    if (selectedTask && selectedTask.id) {
      dispatch(editTask(formData));
    } else {
      dispatch(addTask({ ...formData, id: uuidv4() }));
    }

    handleClose();
  };

  return (
    <>
      {showModal && (
        <Overlay>
          <ModalContainer>
            <Title>
              {formData?.id ? "Edit Task" : "Add Task"}
              <MdOutlineCancel
                onClick={handleClose}
                style={{ cursor: "pointer" }}
              />
            </Title>
            <Form onSubmit={handleSubmit}>
              <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                label="Title"
                required
              />
              <Textarea
                name="description"
                placeholder="Description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                label="Description"
                required
              />
              <Row>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  label="Priority"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <option value="Open">Open</option>
                  {formData?.id && (
                    <>
                      <option value="Pending">Pending Verification</option>

                      {user.role === "Manager" && (
                        <>
                          <option value="Closed">Closed</option>
                          <option value="Reopened">Reopened</option>
                        </>
                      )}
                    </>
                  )}
                </Select>
              </Row>
              <Input
                name="assignee"
                placeholder="Assignee"
                value={formData.assignee}
                onChange={handleChange}
                required
                disabled={assigneeDisabled}
                label="Assignee"
              />
              <Row>
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  label="Start Date"
                />
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  label="End Date"
                />
              </Row>
              <Footer>
                <Button text="Submit Task" type="submit" />
                {formData?.id && (
                  <Button
                    text="Delete Task"
                    variant="delete"
                    onClick={handleDelete}
                    icon={<MdDelete fontSize={20} />}
                  />
                )}
              </Footer>
              {error && <ErrorText>{error}</ErrorText>}
            </Form>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
}
