import { KPIBox } from "../components/KPIBox";
import imageHumidity from "../assets/humidity.webp";
import { useSensorData } from "../hooks/useSensorData";

export const HumidityCard = () => {
  const { lastReading, isLoading } = useSensorData();

  if (isLoading || !lastReading) {
    return <div>Loading...</div>;
  }

  return (
    <KPIBox
      title="Humidity"
      src={imageHumidity}
      alt="image hot"
      value={`${lastReading.humidity.toFixed(1)} %`}
    />
  );
};
