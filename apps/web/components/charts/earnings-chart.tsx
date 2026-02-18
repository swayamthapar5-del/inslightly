"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 32 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 52 },
  { name: "Sat", value: 48 }
];

export function EarningsChart() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#0f6fff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
