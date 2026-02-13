import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HumidityChartProps {
  data: {
    hour: string;
    value: number;
  }[];
}

export const HumidityChart = ({ data }: HumidityChartProps) => {
  return (
    <div style={{ width: "100%", height: "280px" }}>
      <h5 className="mb-2 ps-4 pt-3">Humidity</h5>

      <ResponsiveContainer width="95%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            tick={({ x, y, payload }) => {
              const [date, time] = payload.value.split(", ");
              return (
                <g transform={`translate(${x},${y})`}>
                  <text textAnchor="middle" fill="#666" fontSize={12}>
                    <tspan x="0" dy="0" y="15">
                      {date}
                    </tspan>
                    <tspan x="0" dy="12">
                      {time}
                    </tspan>
                  </text>
                </g>
              );
            }}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1890ff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
