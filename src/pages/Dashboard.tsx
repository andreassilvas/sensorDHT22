import { KPIBox } from "../components/KPIBox";
import { useState } from "react";
import imageTemperature from "../assets/images/temperature.webp";
import imageHumidity from "../assets/images/humidity.webp";
import { TempHumiChart } from "../components/TempHumiChart";
import { MaxAndVariationChart } from "../components/MaxAndVariationChat";
import { useSensorDashboard } from "../hooks/useSensorDashboard";
import SpinnerLoader from "../components/SpinnerLoader";

const Dashboard = () => {
  const [period, setPeriod] = useState<"history" | "7d" | "10d">("history");
  const {
    isLoading,
    isError,
    lastReading,
    isOffline,
    isHighTemp,
    isLowHumidity,
    combinedHourlyData,
    combinedDailyData,
    hourlyExtremesData,
    dailyExtremesData,
  } = useSensorDashboard(period);

  if (isLoading) return <SpinnerLoader fullPage />;
  if (isError) return <h1>Error loading data</h1>;

  return (
    <div className="container-fluid pt-3">
      <div className="mb-3">
        {isOffline ? (
          <span className="badge bg-danger p-2">Capteur hors ligne</span>
        ) : (
          <span className="badge bg-success">Capteur en ligne</span>
        )}
      </div>
      <div className="row align-items-stretch">
        <div className="col-12 col-xl-3 ps-5 d-flex justify-content-center align-items-center">
          <KPIBox
            title="Température"
            src={imageTemperature}
            alt="temperature icon"
            fill="#1E075C"
            value={`${lastReading?.temperature?.toFixed(1) ?? "--"}`}
            hightLowAlert={
              isHighTemp ? (
                <span className="badge rounded-pill text-bg-danger mt-2">
                  Température élevée
                </span>
              ) : (
                <span
                  className="fw-medium mt-2"
                  style={{ fontSize: "13px", color: "#21AB6F" }}
                >
                  Température idéale : {"<"} 21 {"\u00B0C"}
                </span>
              )
            }
          />
        </div>
        <div className="col-12 col-xl-9 pe-3">
          <TempHumiChart
            data={period === "history" ? combinedHourlyData : combinedDailyData}
          />
        </div>
      </div>
      <div className="row align-items-stretch">
        <div className="col-12 col-xl-3 ps-5 d-flex justify-content-center align-items-center">
          <KPIBox
            title="Humidité"
            src={imageHumidity}
            alt="humidity icon"
            fill="#1E075C"
            value={`${lastReading?.humidity?.toFixed(1) ?? "--"}`}
            hightLowAlert={
              isLowHumidity ? (
                <span className="badge bg-warning text-dark mt-2">
                  Humidité faible
                </span>
              ) : (
                <span
                  className="fw-semibold mt-2"
                  style={{ fontSize: "13px", color: "#21AB6F" }}
                >
                  Humidité idéale : 30–50 %
                </span>
              )
            }
          />
        </div>
        <div className="col-12 col-xl-9">
          <MaxAndVariationChart
            data={period === "history" ? hourlyExtremesData : dailyExtremesData}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-start ps-5">
          <button
            className={`btn me-2 ${period === "history" ? "btn btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setPeriod("history")}
          >
            Par heure
          </button>

          <button
            className={`btn me-2 ${period === "7d" ? "btn btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setPeriod("7d")}
          >
            7 Jours
          </button>

          <button
            className={`btn ${period === "10d" ? "btn btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setPeriod("10d")}
          >
            10 Jours
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
