import { useSensorData } from "../hooks/useSensorData";
import { useFilteredData } from "../hooks/useFilteredData";
import { useGroupedSensorData } from "../hooks/useGroupedSensorData";
import { useSensorAnalytics } from "../hooks/useSensorAnalytics";
import { useExportFile } from "../hooks/useExportFile";
import DataTable from "react-data-table-component";

const TemperatureHistory = () => {
  const period = "history";
  const { data } = useSensorData();
  const filterData = useFilteredData(data, period);
  const grouped = useGroupedSensorData(filterData);
  const analytics = useSensorAnalytics(grouped);
  const { exportToExcel } = useExportFile();

  const sortedHourly = [...analytics.combinedHourlyData].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  const generateFullHourRange = (data: typeof sortedHourly) => {
    if (data.length === 0) return [];

    const result = [];

    const start = data[0].timestamp;
    const end = data[data.length - 1].timestamp;

    const ONE_HOUR = 60 * 60 * 1000;

    const dataMap = new Map(data.map((item) => [item.timestamp, item]));

    for (let ts = start; ts <= end; ts += ONE_HOUR) {
      if (dataMap.has(ts)) {
        result.push(dataMap.get(ts)!);
      } else {
        result.push({
          timestamp: ts,
          hour: new Date(ts).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          temperature: null,
          humidity: null,
        });
      }
    }

    return result;
  };

  const tableData = generateFullHourRange(sortedHourly);

  const formatValue = (value: number | null) => value ?? "hors ligne";
  const exporte = () => {
    const dataExport = tableData.map(({ hour, temperature, humidity }) => ({
      "Date et heure": hour,
      "Température (°C)": formatValue(temperature),
      "Humidité (%)": formatValue(humidity),
    }));

    exportToExcel(dataExport, "temperature-data.xlsx", "Temperature");
  };

  const customStyle = {
    headCells: {
      style: {
        background: "#ECF8ED",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
      },
    },
    pagination: {
      style: {
        fontSize: "16px",
      },
    },
  };
  return (
    <div className="container">
      <div className="card" style={{ width: "80rem" }}>
        <div className="card-body table-responsive">
          <DataTable
            columns={[
              { name: "Date et heure", selector: (row) => row.hour },
              {
                name: "Température",
                cell: (row) =>
                  row.temperature !== null ? (
                    <span style={{ color: "green" }}>
                      {row.temperature.toFixed(1)}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>-Capteur hors ligne-</span>
                  ),
              },
              {
                name: "Humidité",
                cell: (row) =>
                  row.humidity !== null ? (
                    <span style={{ color: "green" }}>
                      {row.humidity.toFixed(1)}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>-Capteur hors ligne-</span>
                  ),
              },
            ]}
            data={tableData}
            pagination
            customStyles={customStyle}
            paginationRowsPerPageOptions={[10, 13]}
            actions={
              <button
                className="btn btn-success btn-sm"
                onClick={() => exporte()}
              >
                <i className="bi bi-download me-2"></i>
                Exporter
              </button>
            }
            // paginationPerPage={10} // default page size
            // theme="dark"
          />
        </div>
      </div>
    </div>
  );
};

export default TemperatureHistory;
