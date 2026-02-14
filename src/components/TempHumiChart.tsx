import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TempHumiChartProps {
  data: {
    hour: string;
    temperature: number;
    humidity: number;
  }[];
}

export const TempHumiChart = ({ data }: TempHumiChartProps) => {
  return (
    <div style={{ width: "100%", height: "280px", marginBottom: "50px" }}>
      <h5 className="mb-2 ps-4 text-center">Temperature et Humidite</h5>

      <ResponsiveContainer width="95%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            // interval={0}
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
          <Legend
            verticalAlign="bottom"
            align="left"
            wrapperStyle={{ paddingTop: 20, paddingLeft: 55 }}
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ff6e6e"
            strokeWidth={2}
            name="Temperature °C"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#5ec0fd"
            strokeWidth={2}
            name="Humidity %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
