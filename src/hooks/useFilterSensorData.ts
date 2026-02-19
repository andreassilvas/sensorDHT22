import { useMemo } from "react";
import { useSensorData } from "./useSensorData";

export const useFilterSensorData = () => {
  const { data } = useSensorData();

  return useMemo(() => {
    if (!data?.length) return null;

      const hourlyTemperature: Record<string, number[]> = {};
      const hourlyHumidity: Record<string, number[]> = {};
      const dailyHumidity: Record<string, number[]> = {};
      const dailyTemperature: Record<string, number[]> = {};

      const filteredData = data; // Raw data

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

    //console.log("Daily grouped:", dailyTemperature);
    });

    return {
      hourlyTemperature,
      hourlyHumidity,
      dailyHumidity,
      dailyTemperature,
    };

  },[data])
};
