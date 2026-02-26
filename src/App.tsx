import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import TemperatureHistory from "./pages/TemperatureHistory";
import { Info } from "./pages/Info";
import { Documentation } from "./pages/Documentation";

function App() {
  return (
    <div className="d-flex">
      <Navbar />
      <main className="flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historique" element={<TemperatureHistory />} />
          <Route path="/apropos" element={<Info />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
