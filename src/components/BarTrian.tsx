import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { BarShapeProps } from "recharts";

interface TempHumiChartProps {
  data: {
    hour: string;
    temperature: number;
    humidity: number;
  }[];
}

/**
 * Triangle Bar Shape
 */
const TriangleBar = (props: BarShapeProps) => {
  const { fill, x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <path
      d={`
        M ${x}, ${y + height}
        L ${x + width / 2}, ${y}
        L ${x + width}, ${y + height}
        Z
      `}
      fill={fill}
      stroke="none"
    />
  );
};

export const TempHumiChart: React.FC<TempHumiChartProps> = ({ data }) => {
  const limitedData = data.slice(90);
  return (
    <div
      style={{
        width: "100%",
        height: "420px",
        marginBottom: "50px",
      }}
    >
      <h5 className="mb-3 text-center text-secondary">
        Évolution de la température et du taux d'humidité
      </h5>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={limitedData} barCategoryGap="20%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="hour"
            interval={Math.floor(data.length / 8)}
            tick={({ x, y, payload }) => {
              const value: string = payload.value ?? "";
              const [date, time] = value.includes(", ")
                ? value.split(", ")
                : [value, ""];

              return (
                <g transform={`translate(${x},${y})`}>
                  <text textAnchor="middle" fill="#666" fontSize={12}>
                    <tspan x="0" dy="15">
                      {date}
                    </tspan>
                    {time && (
                      <tspan x="0" dy="12">
                        {time}
                      </tspan>
                    )}
                  </text>
                </g>
              );
            }}
          />

          {/* Single Y axis (shared scale) */}
          <YAxis domain={[0, 60]} />

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            align="left"
            iconType="rect"
            wrapperStyle={{
              paddingTop: 20,
              paddingLeft: 55,
            }}
          />

          <Bar
            dataKey="temperature"
            fill="#EF7D70"
            name="Température °C"
            shape={(props) => <TriangleBar {...props} />}
            barSize={18}
          />

          <Bar
            dataKey="humidity"
            fill="#3bb2fd"
            name="Humidité %"
            shape={(props) => <TriangleBar {...props} />}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
