import "./AttendanceList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AccountList = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [filterOption, setFilterOption] = useState("Student");
  const [studentAcc, setstudentAccounts] = useState([]);
  const [relativeAccounts, setrelativeAccounts] = useState([]);
  const [guestAccounts, setguestAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index); // Set active menu item index
  };
  const handleToggleSidebar = () => {
    // Toggle sidebar
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hide");
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const fetchAccounts = async () => {
    try {
      const fetchresponse = await axios.get("http://localhost:5000/accounts");
      setstudentAccounts(fetchresponse.data.studentModel);
      setrelativeAccounts(fetchresponse.data.relativeModel);
      setguestAccounts(fetchresponse.data.guestModel);
    } catch (error) {
      // ignore error
    }
  };

  useEffect(() => {
    fetchAccounts();
    const interval = setInterval(fetchAccounts, 1000);
    return () => clearInterval(interval); 
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilteredProducts(
      fetchresponse.filter(fetchresponse =>
        fetchresponse.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  };

const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredProducts(
      fetchresponse.filter((fetchresponse) =>
        fetchresponse.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      {/* CONTENT */}
      {/* SIDEBAR */}
      <section id="sidebar">
        <Link to="/att-list">
          <a href="#" className="brand">
            <i className="bx bxl-venmo"></i>
            <span className="text">Versatily</span>
          </a>
        </Link>
        <ul className="side-menu top">
          <li className="side-menu-title">Attendance Monitoring</li>
          <Link to="/dashboard">
            <li className={activeMenuItem === 1 ? "active" : ""}>
              <a href="#" onClick={() => handleMenuItemClick(0)}>
                <i className="bx bxs-dashboard"></i>
                <span className="text">Dashboard</span>
              </a>
            </li>
          </Link>
          <Link to="/att-list">
            <li className={activeMenuItem === 0 ? "active" : ""}>
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
          <form
            className="form-submit-query"
            action="#"
            onSubmit={handleSearchSubmit}
          >
            <div className="form-input">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
        </nav>
        {/* NAVBAR */}
        {/* MAIN */}
        <main>
          <div className="content-container">
            <div className="account-container">
              <h1>Attendance</h1>
              <div className="selection-filter">
                <label>Change Table: </label>
                <select
                  className="filter-account-table-type"
                  value={filterOption}
                  onChange={handleFilterChange}
                >
                  <option value="Student">Student</option>
                  <option value="Relative">Invite</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>
              {filterOption === "Student" && (
                <table className="account-list-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Student Number</th>
                      <th>Section</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentAcc.map((studentAccs, index) => (
                      <tr key={index}>
                        <td>{studentAccs.studentID}</td>
                        <td>{studentAccs.student_fullName}</td>
                        <td>{studentAccs.studentEmail}</td>
                        <td>{studentAccs.studentNo}</td>
                        <td>{studentAccs.studentSection}</td>
                        <td>{studentAccs.Type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {(filterOption === "Relative")  && (
                <table className="account-list-table">
                  <thead>
                    <tr>
                      <th>Relative ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Referred By</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relativeAccounts.map((relativeAccs, index) => (
                      <tr key={index}>
                        <td>{relativeAccs.relativeID}</td>
                        <td>{relativeAccs.relativefullName}</td>
                        <td>{relativeAccs.relativeEmail}</td>
                        <td>{relativeAccs.referredBy}</td>
                        <td>{relativeAccs.Type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {filterOption === "Guest" && (
                <table className="account-list-table">
                  <thead>
                    <tr>
                      <th>Guest ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guestAccounts.map((guestAccs, index) => (
                      <tr key={index}>
                        <td>{guestAccs.guestID}</td>
                        <td>{guestAccs.guest_fullName}</td>
                        <td>{guestAccs.guestEmail}</td>
                        <td>{guestAccs.Type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
        {/* MAIN */} 
      </section>
      {/* CONTENT */}
    </>
  );
};

export default AccountList;
