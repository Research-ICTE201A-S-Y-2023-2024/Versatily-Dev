import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/Pages/Home/Home.jsx";
import DashboardPage from "./assets/Pages/Dashboard/Dashboard.jsx";
import AttendanceListPage from "./assets/Pages/AttendanceList/AttendanceList.jsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/att-list" element={<AttendanceListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
