import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [studentCount, setstudentCount] = useState(0);
  const [relativeCount, setrelativeCount] = useState(0);
  const [guestCount, setguestCount] = useState(0);
  const [TotalCount, settotalCount] = useState(0);

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index); // Set active menu item index
  };
  const handleToggleSidebar = () => {
    // Toggle sidebar
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hide");
  };

  const fetchAccounts = async () => {
    try {
      const fetchresponse = await axios.get("http://localhost:5000/accounts");
      const studentCount = fetchresponse.data.studentModel.length;
      const relativeCount = fetchresponse.data.relativeModel.length;
      const guestCount = fetchresponse.data.guestModel.length;

      setstudentCount(studentCount);
      setrelativeCount(relativeCount);
      setguestCount(guestCount);

      settotalCount(studentCount + relativeCount + guestCount);
    } catch (error) {
      // ignore error
    }
  };

  useEffect(() => {
    fetchAccounts();
    const interval = setInterval(fetchAccounts, 1000);
    return () => clearInterval(interval);
  }, []);

  const dashboardData = [
    {
      id: 1,
      label: "Total Attendees",
      count: TotalCount,
      icon: "bx bxs-user-rectangle",
    },
    { id: 2, label: "Students", count: studentCount },
    { id: 3, label: "Invites", count: relativeCount },
    { id: 4, label: "Guests", count: guestCount },
  ];

  return (
    <>
      {/* CONTENT */}
      {/* SIDEBAR */}
      <section id="sidebar">
        <Link to="/dashboard">
          <a href="#" className="brand">
            <i className="bx bxl-venmo"></i>
            <span className="text">Versatily</span>
          </a>
        </Link>
        <ul className="side-menu top">
          <li className="side-menu-title">Attendance Monitoring</li>
          <Link to="/dashboard">
            <li className={activeMenuItem === 0 ? "active" : ""}>
              <a href="#" onClick={() => handleMenuItemClick(0)}>
                <i className="bx bxs-dashboard"></i>
                <span className="text">Dashboard</span>
              </a>
            </li>
          </Link>
          <Link to="/att-list">
            <li className={activeMenuItem === 1 ? "active" : ""}>
              <a href="#" onClick={() => handleMenuItemClick(0)}>
                <i className="bx bx-list-check"></i>
                <span className="text">Attendance List</span>
              </a>
            </li>
          </Link>
        </ul>
      </section>
      {/* SIDEBAR */}
      {/* NAVBAR */}
      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={handleToggleSidebar}></i>
        </nav>
        {/* NAVBAR */}
        {/* MAIN */}
        <main>
          <div className="content-container">
            <div className="dashboard-title">
              <h1>Dashboard</h1>
              <h2>Attendees:</h2>
            </div>
            <div className="dashboard-container">
              {dashboardData.map((box) => (
                <div
                  key={box.id}
                  className={`dashboard-box dashboard-box-${box.id}`}
                >
                  <div className="icon-title">
                    <i className={`${box.icon}`} />
                    <h2>{box.label}</h2>
                  </div>
                  <p>{box.count}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </>
  );
};

export default Dashboard;
