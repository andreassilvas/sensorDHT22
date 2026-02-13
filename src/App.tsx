import { useQuery } from "@tanstack/react-query";
import { KPIBox } from "./components/KPIBox";
import { useState } from "react";
import imageTemperature from "./assets/images/temperature.png";
import imagetHumidity from "./assets/images/humidity.png";
import fetchSensorData from "./service/api-client";
import { TemperatureChart } from "./components/TemperatureChart";
import { HumidityChart } from "./components/HumidityChart";

interface SensorDHTData {
  temperature: number;
  humidity: number;
  timestamp: number;
  date: string;
}

function App() {
  const [period, setPeriod] = useState<"24h" | "15d" | "30d">("24h");
  const { data, isLoading, isError } = useQuery<SensorDHTData[], Error>({
    queryKey: ["sensorData"],
    queryFn: fetchSensorData,
    refetchInterval: 5000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading data</h1>;
  if (!data || data.length === 0) return <h1>No data available</h1>;

  const lastReading = data[data.length - 1];
  const rightNow = lastReading.timestamp;
  const last24HoursData = data.filter(
    (d) => d.timestamp >= rightNow - 24 * 60 * 60,
  );

  const hourlyTemperature: Record<string, number[]> = {};
  const hourlyHumidity: Record<string, number[]> = {};

  last24HoursData.forEach((item) => {
    const date = new Date(item.timestamp * 1000);
    const hourStampK =
      date.getTime() - (date.getMinutes() * 60 + date.getSeconds()) * 1000;

    if (!hourlyTemperature[hourStampK]) {
      hourlyTemperature[hourStampK] = [];
    }

    if (!hourlyHumidity[hourStampK]) {
      hourlyHumidity[hourStampK] = [];
    }

    hourlyTemperature[hourStampK].push(item.temperature);
    hourlyHumidity[hourStampK].push(item.humidity);
  });

  const hourlyAverageTemperature = Object.entries(hourlyTemperature).map(
    ([label, values]) => {
      const sum = values.reduce((acc, val) => acc + val, 0);
      const avg = sum / values.length;

      return {
        hour: new Date(Number(label)).toLocaleString([], {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        value: Number(avg.toFixed(2)),
      };
    },
  );

  const hourlyAverageHumidity = Object.entries(hourlyHumidity).map(
    ([label, values]) => {
      const sum = values.reduce((acc, val) => acc + val, 0);
      const avg = sum / values.length;

      return {
        hour: new Date(Number(label)).toLocaleString([], {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        value: Number(avg.toFixed(2)),
      };
    },
  );
  // console.log("Latest data average:", hourlyAverageTemperature);
  return (
    <div className="container-fluid m-4">
      <h1 className="mb-4">Sensor Dashboard</h1>
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <KPIBox
            title="Temperature"
            src={imageTemperature}
            alt="image hot"
            value={`${lastReading.temperature.toFixed(1)} \u00B0C`}
          />
        </div>
        <div className="col-md-8 pe-3">
          <TemperatureChart data={hourlyAverageTemperature} />
        </div>
      </div>
      <div className="row md-4 mb-4">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <KPIBox
            title="Humidity"
            src={imagetHumidity}
            alt="image hot"
            value={`${lastReading.humidity.toFixed(1)} %`}
          />
        </div>
        <div className="col-md-8">
          <HumidityChart data={hourlyAverageHumidity} />
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-8 d-flex justify-content-start mt-5 ps-5">
          <button
            className={`btn me-2 ${period === "24h" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setPeriod("24h")}
          >
            24 Hours
          </button>

          <button
            className={`btn me-2 ${period === "15d" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setPeriod("15d")}
          >
            15 Days
          </button>

          <button
            className={`btn ${period === "30d" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setPeriod("30d")}
          >
            30 Days
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
