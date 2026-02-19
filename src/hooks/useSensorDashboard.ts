import { useFilteredData } from "./useFilteredData";
import { useGroupedSensorData } from "./useGroupedSensorData";
import { useSensorAnalytics } from "./useSensorAnalytics";
import { useSensorData } from "./useSensorData";

export const useSensorDashboard = (
  period: "history" | "15d" | "30d"
) => {

    const {data, isLoading, isError} = useSensorData();

    const filterDta = useFilteredData(data, period);
    const grouped = useGroupedSensorData(filterDta);
    const analytics = useSensorAnalytics(grouped);

    const lastReading = data[data.length - 1];

    return {
        isLoading,
        isError,
        lastReading,
        ...analytics
    };
};