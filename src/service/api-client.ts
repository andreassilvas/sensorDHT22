import { ref, get } from "firebase/database";
import { db } from "../firebase/firebase";

interface SensorDHTData {
  temperature: number;
  humidity: number;
  timestamp: number;
  date: string;
}

const fetchSensorData = async (): Promise<SensorDHTData[]> => {
  const snapshot = await get(ref(db, "/"));
  if (!snapshot.exists()) return [];

  const rawData = snapshot.val();
  const sensorObject = rawData.dht22;

  return Object.values(sensorObject)
    .map((item) => item as SensorDHTData)
    .sort((a, b) => a.timestamp - b.timestamp);
};

export default fetchSensorData;