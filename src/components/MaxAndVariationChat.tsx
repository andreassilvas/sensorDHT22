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

interface MaxAndVariationChartProps {
  data: {
    hour: string;
    maxTemp: number;
    humidityVariation: number;
  }[];
}

export const MaxAndVariationChart = ({ data }: MaxAndVariationChartProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "280px",
        marginBottom: "50px",
        marginTop: "50px",
      }}
    >
      <h6 className="mb-2 ps-4 text-center text-secondary">
        Variation du taux d'humidité relatif à la température maximale
      </h6>

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
            iconType="rect"
            align="left"
            wrapperStyle={{ paddingTop: 20, paddingLeft: 55, fontSize: 15 }}
          />

          <Line
            type="monotone"
            dataKey="maxTemp"
            stroke="#E36463"
            strokeWidth={2}
            dot={false}
            name="Température maximale °C"
          />
          <Line
            type="monotone"
            dataKey="humidityVariation"
            stroke="#6A6ED2"
            strokeWidth={2}
            dot={false}
            name="Variation du taux d'humidité %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
