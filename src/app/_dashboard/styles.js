import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem;
  background-color: #000;
  color: white;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    flex-direction: row;
    font-size: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const SubText = styled.p`
  font-size: 1rem;
  color: #aaa;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;

  @media (max-width: 600px) {
    flex-direction: row;
    gap: 0.75rem;
    margin-left: 0;
    margin-top: 0.5rem;
  }
`;

export const Board = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const Column = styled.div`
  flex: 1;
  min-width: 280px;
  background-color: #111;
  padding: 1rem;
  border-radius: 12px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ColumnTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;
