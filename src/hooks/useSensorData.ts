import { useQuery } from "@tanstack/react-query";
import fetchSensorData from "../service/api-client";

interface SensorDHTData {
  temperature: number;
  humidity: number;
  timestamp: number;
  date: string;
}

export const useSensorData = (period?:"history" | "15d" | "30d" ) => {
  const { data, isLoading, isError } = useQuery<SensorDHTData[], Error>({
    queryKey: ["sensorData"],
    queryFn: fetchSensorData,
    refetchInterval: 5000,
  });

  if (!data) return { data: [], isLoading, isError };

  
  const lastReading = data[data.length - 1];
  const rightNow = lastReading.timestamp;
  const DAY = 24 * 60 * 60; // seconds in a day

  let filteredData = data; // Raw data
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

  return {
    data, filteredData, lastReading, isLoading, isError
  };
};
