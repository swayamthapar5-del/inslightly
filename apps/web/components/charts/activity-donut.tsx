"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 68 },
  { name: "In progress", value: 22 },
  { name: "New", value: 10 }
];

const COLORS = ["#0f6fff", "#9ff0d0", "#ffb267"];

export function ActivityDonut() {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
