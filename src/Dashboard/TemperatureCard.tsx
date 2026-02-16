import { KPIBox } from "../components/KPIBox";
import imageTemperature from "../assets/temperature.webp";
import { useSensorData } from "../hooks/useSensorData";

export const TemperatureCard = () => {
  const { lastReading, isLoading } = useSensorData();

  if (isLoading || !lastReading) {
    return <div>Loading...</div>;
  }

  return (
    <KPIBox
      title="Temperature"
      src={imageTemperature}
      alt="image hot"
      value={`${lastReading.temperature.toFixed(1)} \u00B0C`}
    />
  );
};
