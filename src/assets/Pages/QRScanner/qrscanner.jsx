// import "./qrscanner.css";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Html5QrcodeScanner } from "html5-qrcode";

// const QRScanner = () => {
//   const [activeMenuItem, setActiveMenuItem] = useState(0);
//   const [currentScanResult, setCurrentScanResult] = useState(null);
//   const [scanResultHistory, setScanResultHistory] = useState([]);
//   const [savingInProgress, setSavingInProgress] = useState(false);

//   useEffect(() => {
//     if (currentScanResult) {
//       saveScanResult(currentScanResult);
//     }
//   }, [currentScanResult]);

//   const handleMenuItemClick = (index) => {
//     setActiveMenuItem(index);
//   };

//   const handleToggleSidebar = () => {
//     const sidebar = document.getElementById("sidebar");
//     sidebar.classList.toggle("hide");
//   };

//   const saveScanResult = async (result) => {
//     try {
//       setSavingInProgress(true);
//       const isDuplicate = scanResultHistory.some(
//         (scannedqrdata) => 
//           scannedqrdata.account_firstName === result.account_firstName &&
//           scannedqrdata.account_lastName === result.account_lastName &&
//           scannedqrdata.account_email === result.account_email &&
//           scannedqrdata.account_type === result.account_type
//       );
//       if (isDuplicate) {
//         toast.error("QR Code is Duplicated", { position: 'top-right', autoClose: 5000 });
//       }
//       await axios.post('http://localhost:5000/attendance/qr-scan', {
//         account_firstName: result.account_firstName,
//         account_lastName: result.account_lastName,
//         account_email: result.account_email,
//         account_type: result.account_type,
//       });
//       setCurrentScanResult(null);
//       setSavingInProgress(false);
//       setScanResultHistory(prevHistory => [...prevHistory, result]);
//       toast.success('Attendance Saved Successfully!', { position: 'top-right', autoClose: 5000 });
//     } catch (error) {
//       console.error("Error processing scan result:", error);
//       setSavingInProgress(false);
//       toast.error('Failed to save attendance!', { position: 'top-right', autoClose: 5000 });
//     }
//   };

//   const startScanner = () => {
//     const scanner = new Html5QrcodeScanner("reader", {
//       qrbox: 250,
//       fps: 1,
//     });

//     const handleScanSuccess = (result) => {
//       try {
//         const parseResult = JSON.parse(result);
//         setCurrentScanResult(parseResult);
//       } catch (error) {
//         console.error("Error parsing scan result:", error);
//       }
//     };

//     scanner.render(handleScanSuccess);

//     return () => {
//       scanner.clear();
//     };
//   };

//   useEffect(() => {
//     startScanner();
//     return () => {
//       const scanner = new Html5QrcodeScanner("reader");
//       scanner.clear();
//     };
//   }, []);

//   return (
//     <>
//       <section id="sidebar">
//         <Link to="/att-list">
//           <a href="#" className="brand">
//             <i className="bx bxl-venmo"></i>
//             <span className="text">Versatily</span>
//           </a>
//         </Link>
//         <ul className="side-menu top">
//           <li className="side-menu-title">Attendance Monitoring</li>
//           <Link to="/dashboard">
//             <li className={activeMenuItem === 1 ? "active" : ""}>
//               <a href="#" onClick={() => handleMenuItemClick(0)}>
//                 <i className="bx bxs-dashboard"></i>
//                 <span className="text">Dashboard</span>
//               </a>
//             </li>
//           </Link>
//           <Link to="/att-list">
//             <li className={activeMenuItem === 1 ? "active" : ""}>
//               <a href="#" onClick={() => handleMenuItemClick(0)}>
//                 <i className="bx bx-list-check"></i>
//                 <span className="text">Attendance List</span>
//               </a>
//             </li>
//           </Link>
//           <Link to="/qrscanner">
//             <li className={activeMenuItem === 0 ? "active" : ""}>
//               <a href="#" onClick={() => handleMenuItemClick(0)}>
//                 <i className="bx bx-qr-scan"></i>
//                 <span className="text">QR Scanner</span>
//               </a>
//             </li>
//           </Link>
//         </ul>
//       </section>
//       <section id="content">
//         <nav>
//           <i className="bx bx-menu" onClick={handleToggleSidebar}></i>
//         </nav>
//         <main>
//           <div className="content-container">
//             <div className="qrpage-container">
//               <div className="qrreader-container">
//                 <h1 className="qr-box-title">SCAN QR CODE</h1>
//                 <div className="qr-box" id="reader"></div>
//               </div>
//               <div className="qrreader-tab">
//                 <div className="qrreader-tabcontent">
//                   <h1>QR SCANNED</h1>
//                   <div className="qrreader-tabcontent-text">
//                     <h2>Pending ({currentScanResult ? 1 : 0})</h2>
//                     {savingInProgress ? (
//                       <p>Saving...</p>
//                     ) : currentScanResult ? (
//                       <div>
//                         <p>First Name: <span>{currentScanResult.account_firstName || "N/A"}</span></p>
//                         <p>Last Name: <span>{currentScanResult.account_lastName || "N/A"}</span></p>
//                         <p>Email: <span>{currentScanResult.account_email || "N/A"}</span></p>
//                         <p>Type: <span>{currentScanResult.account_type || "N/A"}</span></p>
//                       </div>
//                     ) : (
//                       <p>No scans yet.</p>
//                     )}
//                   </div>
//                   <div className="qrreader-tabcontent-btn">
//                     <button onClick={saveScanResult} disabled={!currentScanResult || savingInProgress}>
//                       {savingInProgress ? 'Saving...' : 'SAVE'}
//                     </button>
//                     <button>CANCEL</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </section>
//       <ToastContainer />
//     </>
//   );
// };

// export default QRScanner;