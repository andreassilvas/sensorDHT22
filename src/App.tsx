import { KPIBox } from "./components/KPIBox";
import { useState } from "react";
import { Navbar } from "./Navbar/Navbar";
import imageTemperature from "./assets/images/temperature.webp";
import imageHumidity from "./assets/images/humidity.webp";
import { TempHumiChart } from "./components/TempHumiChart";
import { MaxAndVariationChart } from "./components/MaxAndVariationChat";
import { useSensorDashboard } from "./hooks/useSensorDashboard";

function App() {
  const [period, setPeriod] = useState<"history" | "15d" | "30d">("history");
  const {
    isLoading,
    isError,
    lastReading,
    combinedHourlyData,
    combinedDailyData,
    hourlyExtremesData,
    dailyExtremesData,
  } = useSensorDashboard(period);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading data</h1>;

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
                fill="#1E075C"
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
            <div className="col-md-4 d-flex align-items-center">
              <KPIBox
                title="Humidity"
                src={imageHumidity}
                alt="image hot"
                fill="#1E075C"
                value={`${lastReading.humidity.toFixed(1)} %`}
              />
            </div>
            <div className="col-md-8">
              <MaxAndVariationChart
                data={
                  period === "history" ? hourlyExtremesData : dailyExtremesData
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-8 d-flex justify-content-start ps-5">
              <button
                className={`btn me-2 ${period === "history" ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => setPeriod("history")}
              >
                History
              </button>

              <button
                className={`btn me-2 ${period === "15d" ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => setPeriod("15d")}
              >
                15 Days
              </button>

              <button
                className={`btn ${period === "30d" ? "btn-secondary" : "btn-outline-secondary"}`}
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
