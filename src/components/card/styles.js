import styled from "styled-components";

export const Card = styled.div`
  background-color: #1e1e1e;
  border-radius: 16px;
  padding: 1rem;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  width: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: 600px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const TaskTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  word-break: break-word;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    flex-wrap: wrap;
  }
`;

export const TaskMeta = styled.p`
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  color: #ccc;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
`;

export const PriorityTag = styled.span`
  background-color: ${({ level }) =>
    level === "high" ? "#ff4d4f" : level === "medium" ? "#faad14" : "#52c41a"};
  color: #fff;
  border-radius: 6px;
  padding: 0.25rem 0.6rem;
  font-size: 0.85rem;
  margin-left: 0.4rem;

  @media (max-width: 600px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
`;
