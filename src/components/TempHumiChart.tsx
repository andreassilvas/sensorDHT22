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
    <div
      style={{
        width: "100%",
        height: "280px",
        marginBottom: "50px",
      }}
    >
      <h5 className="mb-2 ps-4 text-center text-secondary">
        Évolution de la température et du taux d'humidité
      </h5>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            //interval={2}
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
            iconType="rect"
            wrapperStyle={{ paddingTop: 20, paddingLeft: 55 }}
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#E36463"
            strokeWidth={2}
            dot={false}
            name="Température °C"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#6A6ED2"
            strokeWidth={2}
            dot={false}
            name="Taux d'humidité %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
