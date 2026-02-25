import { useMemo } from "react";
import type { SensorDHTData } from "./useSensorData";

export const useFilteredData = (
  data: SensorDHTData[],
  period: "history" | "7d" | "10d"
) => {
  return useMemo(() => {
    if (!data.length) return [];

    const latestTimestamp = data[data.length - 1].timestamp;

    const DAY = 24 * 60 * 60;

    switch (period) {
      case "7d":
        return data.filter(
          (d) => d.timestamp >= latestTimestamp - 8 * DAY
        );
      case "10d":
        return data.filter(
          (d) => d.timestamp >= latestTimestamp - 11 * DAY
        );
      default:
        return data;
    }
  }, [data, period]);
};
