"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Section } from "./styles";

const LineChartWrapper = ({ taskTrendData }) => {
  return (
    <Section>
      <h2>Task Trend Line</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={taskTrendData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1890FF"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Section>
  );
};

export default LineChartWrapper;
