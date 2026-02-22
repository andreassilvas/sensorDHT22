import { KPIBox } from "../components/KPIBox";
import { useState } from "react";
import imageTemperature from "../assets/images/temperature.webp";
import imageHumidity from "../assets/images/humidity.webp";
import { TempHumiChart } from "../components/TempHumiChart";
import { MaxAndVariationChart } from "../components/MaxAndVariationChat";
import { useSensorDashboard } from "../hooks/useSensorDashboard";
import SpinnerLoader from "../components/SpinnerLoader";

const Dashboard = () => {
  const [period, setPeriod] = useState<"history" | "15d" | "30d">("history");
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

  //console.log(" hourlyExtremesData", hourlyExtremesData); //temp good

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
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-3 ps-5">
          <KPIBox
            title="Température"
            src={imageTemperature}
            alt="temperature icon"
            fill="#1E075C"
            value={`${lastReading?.temperature?.toFixed(1) ?? "--"} \u00B0C`}
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
        <div className="col-9 pe-3">
          <TempHumiChart
            data={period === "history" ? combinedHourlyData : combinedDailyData}
          />
        </div>
      </div>
      <div className="row mb-4 d-flex justify-content-center align-items-center">
        <div className="col-3 ps-5">
          <KPIBox
            title="Humidité"
            src={imageHumidity}
            alt="humidity icon"
            fill="#1E075C"
            value={`${lastReading?.humidity?.toFixed(1) ?? "--"} %`}
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
        <div className="col-9">
          <MaxAndVariationChart
            data={period === "history" ? hourlyExtremesData : dailyExtremesData}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-9 d-flex justify-content-start ps-5">
          <button
            className={`btn me-2 ${period === "history" ? "btn btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setPeriod("history")}
          >
            Par heure
          </button>

          <button
            className={`btn me-2 ${period === "15d" ? "btn btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setPeriod("15d")}
          >
            15 Jours
          </button>

          <button
            className={`btn ${period === "30d" ? "btn btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setPeriod("30d")}
          >
            30 Jours
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
