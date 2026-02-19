import { useMemo } from "react";
import type { SensorDHTData } from "./useSensorData";

export const useFilteredData = (
  data: SensorDHTData[],
  period: "history" | "15d" | "30d"
) => {
  return useMemo(() => {
    if (!data.length) return [];

    const latestTimestamp = data[data.length - 1].timestamp;

    const DAY = 24 * 60 * 60;

    switch (period) {
      case "15d":
        return data.filter(
          (d) => d.timestamp >= latestTimestamp - 15 * DAY
        );
      case "30d":
        return data.filter(
          (d) => d.timestamp >= latestTimestamp - 30 * DAY
        );
      default:
        return data;
    }
  }, [data, period]);
};
