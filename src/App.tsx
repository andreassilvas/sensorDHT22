import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import TemperatureHistory from "./pages/TemperatureHistory";

function App() {
  return (
    <div className="d-flex">
      <Navbar />
      <main className="flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historique" element={<TemperatureHistory />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
