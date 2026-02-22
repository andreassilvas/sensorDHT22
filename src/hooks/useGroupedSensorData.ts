import { useMemo } from "react"
import type { SensorDHTData } from "./useSensorData";

export const useGroupedSensorData = (
    filteredData: SensorDHTData[]
) => {

    return useMemo(() =>{
        const hourlyTemperature: Record<string, number[]> = {};
        const hourlyHumidity: Record<string, number[]> = {};
        const dailyHumidity: Record<string, number[]> = {};
        const dailyTemperature: Record<string, number[]> = {};

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
        });

        return {
            hourlyTemperature,
            hourlyHumidity,
            dailyHumidity,
            dailyTemperature
        }

    },[filteredData])
};