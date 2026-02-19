import { useQuery } from "@tanstack/react-query";
import fetchSensorData from "../service/api-client";

export interface SensorDHTData {
  temperature: number;
  humidity: number;
  timestamp: number;
  date: string;
}

export const useSensorData = (refetchInterval = 15000) => {
   const query = useQuery<SensorDHTData[], Error>({
    queryKey: ["sensorData"],
    queryFn: fetchSensorData,
    refetchInterval,
  });
  return {
    ...query,
    data: query.data ?? [],
  }
};
