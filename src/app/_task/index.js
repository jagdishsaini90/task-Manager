"use client";
import { addTask, deleteTask, editTask } from "@/redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineCancel, MdDelete } from "react-icons/md";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Button from "../../components/button";
import Select from "../../components/select";
import { checkDateRange, convertTimeDiff } from "@/utils/helper";
import {
  ErrorText,
  Footer,
  Form,
  ModalContainer,
  Overlay,
  Row,
  Title,
} from "./styles";

const initialState = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Open",
  type: "Story",
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

    const errorMessage = checkDateRange(formData);
    if (errorMessage.length > 0) {
      setError(errorMessage);
      return;
    }
    setError("");
    if (selectedTask && selectedTask.id) {
      dispatch(
        editTask({
          ...formData,
          totalTimeSpend:
            formData.status === "Closed"
              ? convertTimeDiff(formData.currentTime)
              : null,
        })
      );
    } else {
      dispatch(addTask({ ...formData, id: uuidv4(), currentTime: Date.now() }));
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

              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Task Type"
              >
                <option value="Story">Story</option>
                <option value="Bug">Bug</option>
                <option value="Epic">Epic</option>
              </Select>

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
