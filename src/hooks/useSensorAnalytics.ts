import { useMemo } from "react";

interface GroupedData {
  hourlyTemperature: Record<string, number[]>;
  hourlyHumidity: Record<string, number[]>;
  dailyHumidity: Record<string, number[]>;
  dailyTemperature: Record<string, number[]>;
}

export const useSensorAnalytics = ({
  hourlyTemperature,
  hourlyHumidity,
  dailyHumidity,
  dailyTemperature,
}: GroupedData) => {
  return useMemo(() => {

     const computeHourlyValues = (vals: number[]) => {
      if (vals.length === 1) return vals[0];

      const sum = vals.reduce((acc, val) => acc + val, 0);
      return sum / vals.length;
    };
    //------------------Hourly Averages---------------------------------------------
    const hourlyAverageTemperature = Object.entries(hourlyTemperature).map(
      ([label, values]) => {
        
        const value = computeHourlyValues(values);

        return {
          timestamp: Number(label),
          hour: new Date(Number(label)).toLocaleString([], {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          value: Number(value.toFixed(2)),
        };
      },
    );

    const hourlyAverageHumidity = Object.entries(hourlyHumidity).map(
      ([label, values]) => {
        
         const value = computeHourlyValues(values);

        return {
          timestamp: Number(label),
          hour: new Date(Number(label)).toLocaleString([], {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          value: Number(value.toFixed(2)),
        };
      },
    );

    const combinedHourlyData = hourlyAverageTemperature.map(
      (tempItem, index) => ({
      timestamp: tempItem.timestamp,
      hour: tempItem.hour,
      temperature: tempItem.value,
        humidity: hourlyAverageHumidity[index]?.value ?? null,
      }),
    );
    // console.log("NEW: ",combinedHourlyData)
    //------------------Daily Averages---------------------------------------------
    const dailyAverageTemperature = Object.entries(dailyTemperature).map(
      ([day, values]) => {

        const value = computeHourlyValues(values);

        return {
          hour: day,
          value: Number(value.toFixed(2)),
        };
      },
    );

    const dailyAverageHumidity = Object.entries(dailyHumidity).map(
      ([day, values]) => {

        const value = computeHourlyValues(values);

        return {
          hour: day,
          value: Number(value.toFixed(2)),
        };
      },
    );

    const combinedDailyData = dailyAverageTemperature.map(
      (tempItem, index) => ({
        hour: tempItem.hour,
        temperature: tempItem.value,
        humidity: dailyAverageHumidity[index]?.value ?? null,
      }),
    );
    //------------------Hourly Extremes---------------------------------------------
    const hourlyMaxTemperature = Object.entries(hourlyTemperature).map(
      ([label, temps]) => ({
        hour: new Date(Number(label)).toLocaleString([], {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        maxTemp: Number(Math.max(...temps).toFixed(2)),
      }),
    );
    // console.log("Hourly", hourlyMaxTemperature);
    const hourlyHumidityVariation = hourlyAverageHumidity.map(
      (item, index, arr) => {
        if (index === 0) {
          return {
            hour: item.hour,
            variation: 0,
          };
        }
        const prev = arr[index - 1].value;
        const diff = ((item.value - prev) / prev) * 100;

        return {
          hour: item.hour,
          variation: Number(diff.toFixed(2)),
        };
      },
    );

    const hourlyExtremesData = hourlyMaxTemperature.map((tempItem, index) => ({
      hour: tempItem.hour,
      maxTemp: tempItem.maxTemp,
      humidityVariation: hourlyHumidityVariation[index]?.variation ?? 0,
    }));

    //------------------Dayly Extremes---------------------------------------------
    const dailyHumidityVariation = dailyAverageHumidity.map(
      (item, index, arr) => {
        if (index === 0) {
          return {
            hour: item.hour,
            variation: 0,
          };
        }

        const prev = arr[index - 1].value;
        const diff = ((item.value - prev) / prev) * 100;

        return {
          hour: item.hour,
          variation: Number(diff.toFixed(2)),
        };
      },
    );
    const dailyMaxTemperature = Object.entries(dailyTemperature).map(
      ([day, temps]) => ({
        hour: day,
        maxTemp: Number(Math.max(...temps).toFixed(2)),
      }),
    );

    const dailyExtremesData = dailyMaxTemperature.map((tempItem, index) => ({
      hour: tempItem.hour,
      maxTemp: tempItem.maxTemp,
      humidityVariation: dailyHumidityVariation[index]?.variation ?? 0,
    }));

    return {
      combinedHourlyData,
      combinedDailyData,
      hourlyExtremesData,
      dailyExtremesData,
    };
  }, [hourlyTemperature, hourlyHumidity, dailyTemperature, dailyHumidity]);
};
