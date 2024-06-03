import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index); // Set active menu item index
  };

  const handleToggleSidebar = () => {
    // Toggle sidebar
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hide");
  };

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
      <section id="content">
        {/* NAVBAR */}
        <nav>
          <i className="bx bx-menu" onClick={handleToggleSidebar}></i>
        </nav>
        {/* NAVBAR */}
        {/* MAIN */}
        <main>
          <div className="content-container">
            <div className="Empty-text">
              <p>Content is Empty</p>
            </div>
          </div>
        </main>
      </section>
      {/* MAIN */}
      {/* CONTENT */}
    </>
  );
};

export default Home;
