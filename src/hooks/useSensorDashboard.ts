import { useFilteredData } from "./useFilteredData";
import { useGroupedSensorData } from "./useGroupedSensorData";
import { useSensorAnalytics } from "./useSensorAnalytics";
import { useSensorData } from "./useSensorData";
import { useEffect, useState } from "react";

export const useSensorDashboard = (period: "history" | "15d" | "30d") => {
  const { data, isLoading, isError } = useSensorData();

  const filterData = useFilteredData(data, period);
  const grouped = useGroupedSensorData(filterData);
  const analytics = useSensorAnalytics(grouped);

  const lastReading = data && data.length > 0 ? data[data.length - 1] : null;

  const [currentTime, setCurrentTime] = useState(() =>
    Math.floor(Date.now() / 1000),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 10000); // update every 10s

    return () => clearInterval(interval);
  }, []);

  const OFFLINE_THRESHOLD = 20 * 60;
  const isOffline = lastReading
    ? currentTime - lastReading.timestamp > OFFLINE_THRESHOLD
    : false;

  const HIGH_TEMP_THRESHOLD = 21;
  const LOW_HUMIDITY_THRESHOLD = 30;

  const isHighTemp = lastReading
    ? lastReading.temperature > HIGH_TEMP_THRESHOLD
    : false;

  const isLowHumidity = lastReading
    ? lastReading.humidity < LOW_HUMIDITY_THRESHOLD
    : false;

  return {
    isLoading,
    isError,
    lastReading,
    isOffline,
    isHighTemp,
    isLowHumidity,
    ...analytics,
  };
};
