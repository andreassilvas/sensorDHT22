import { useQuery } from "@tanstack/react-query";
import { KPIBox } from "./components/KPIBox";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import imageTemperature from "./assets/images/temperature.webp";
import imageHumidity from "./assets/images/humidity.webp";
import fetchSensorData from "./service/api-client";
import { TempHumiChart } from "./components/TempHumiChart";
import { HumidityChart } from "./components/HumidityChart";

interface SensorDHTData {
  temperature: number;
  humidity: number;
  timestamp: number;
  date: string;
}

function App() {
  const [period, setPeriod] = useState<"history" | "15d" | "30d">("history");
  const { data, isLoading, isError } = useQuery<SensorDHTData[], Error>({
    queryKey: ["sensorData"],
    queryFn: fetchSensorData,
    refetchInterval: 5000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading data</h1>;
  if (!data || data.length === 0) return <h1>No data available</h1>;

  let filteredData = data; // Raw data
  const lastReading = data[data.length - 1];
  const rightNow = lastReading.timestamp;

  const DAY = 24 * 60 * 60; // seconds in a day
  switch (period) {
    case "history":
      filteredData = data;
      break;
    case "15d":
      filteredData = data.filter((d) => d.timestamp >= rightNow - 15 * DAY);
      break;
    case "30d":
      filteredData = data.filter((d) => d.timestamp >= rightNow - 30 * DAY);
      break;

    default:
      filteredData = data;
  }

  const hourlyTemperature: Record<string, number[]> = {};
  const hourlyHumidity: Record<string, number[]> = {};

  const dailyHumidity: Record<string, number[]> = {};
  const dailyTemperature: Record<string, number[]> = {};

  filteredData.forEach((item) => {
    const date = new Date(item.timestamp * 1000);
    const hourStampK = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
    ).getTime();
    const dayStampK = `${date.getFullYear()}-${date.getMonth() + 1} - ${date.getDate()}`;

    if (!hourlyTemperature[hourStampK]) {
      hourlyTemperature[hourStampK] = [];
    }

    if (!dailyTemperature[dayStampK]) {
      dailyTemperature[dayStampK] = [];
    }

    if (!hourlyHumidity[hourStampK]) {
      hourlyHumidity[hourStampK] = [];
    }

    if (!dailyHumidity[dayStampK]) {
      dailyHumidity[dayStampK] = [];
    }

    hourlyTemperature[hourStampK].push(item.temperature);
    dailyTemperature[dayStampK].push(item.temperature);

    hourlyHumidity[hourStampK].push(item.humidity);
    dailyHumidity[dayStampK].push(item.humidity);

    // console.log("Daily grouped:", dailyTemperature);
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

  const combinedHourlyData = hourlyAverageTemperature.map(
    (tempItem, index) => ({
      hour: tempItem.hour,
      temperature: tempItem.value,
      humidity: hourlyAverageHumidity[index]?.value ?? null,
    }),
  );

  const dailyAverageTemperature = Object.entries(dailyTemperature).map(
    ([day, values]) => {
      const sum = values.reduce((acc, val) => acc + val, 0);
      const avg = sum / values.length;

      return {
        hour: day,
        value: Number(avg.toFixed(2)),
      };
    },
  );

  // console.log("Combined hourly data:", combinedHourlyData);

  const dailyAverageHumidity = Object.entries(dailyHumidity).map(
    ([day, values]) => {
      const sum = values.reduce((acc, val) => acc + val, 0);
      const avg = sum / values.length;

      return {
        hour: day,
        value: Number(avg.toFixed(2)),
      };
    },
  );

  const combinedDailyData = dailyAverageTemperature.map((tempItem, index) => ({
    hour: tempItem.hour,
    temperature: tempItem.value,
    humidity: dailyAverageHumidity[index]?.value ?? null,
  }));
  // console.log("Latest data average:", hourlyAverageTemperature);
  return (
    <div className="d-flex">
      <Navbar />

      <main className="flex-grow-1 p-4">
        <div className="container-fluid m-4">
          <div className="row">
            <div className="col-md-4 d-flex align-items-center">
              <KPIBox
                title="Temperature"
                src={imageTemperature}
                alt="image hot"
                value={`${lastReading.temperature.toFixed(1)} \u00B0C`}
              />
            </div>
            <div className="col-md-8 pe-3">
              <TempHumiChart
                data={
                  period === "history" ? combinedHourlyData : combinedDailyData
                }
              />
            </div>
          </div>
          <div className="row md-4 mb-4">
            <div className="col-md-4 d-flex align-items-center mt-5">
              <KPIBox
                title="Humidity"
                src={imageHumidity}
                alt="image hot"
                value={`${lastReading.humidity.toFixed(1)} %`}
              />
            </div>
            <div className="col-md-8">
              <HumidityChart
                // data={
                //   period === "history"
                //     ? hourlyAverageHumidity
                //     : dailyAverageHumidity
                // }
                data={hourlyAverageHumidity}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-8 d-flex justify-content-start mt-5 ps-5">
              <button
                className={`btn me-2 ${period === "history" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setPeriod("history")}
              >
                History
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
      </main>
    </div>
  );
}

export default App;
