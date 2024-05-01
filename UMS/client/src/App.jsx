import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import RegisPage from "./pages/Regis/RegisPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/Register" element={<RegisPage/>}></Route>
        <Route path="/Dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;