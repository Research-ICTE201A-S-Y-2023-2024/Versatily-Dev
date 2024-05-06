import './Table.css';
import { useEffect, useState } from 'react';
import profileImage from '../assets/img/profile.jpg';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Table = () => {
    const [workbench, setWorkbench] = useState([]);
    const [workbenchID, setWorkbenchID] = useState('');
    const [status, setStatus] = useState(0);

    const generateWorkbenchID = () => {
        // Generate a new transactionId with no hyphens
        const uniqueWorkbenchID = uuidv4().replace(/-/g, '');

        // Update state with generated ID
        setWorkbenchID(uniqueWorkbenchID);
    };

    const saveWorkbench = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('workbenchID', workbenchID);
        formData.append('status', status);

        try {
            await axios.post('http://localhost:5000/workbench', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success('Workbench Created Successfully', toastConfig);
            getAllWorkbench();

            setWorkbenchID();
            closeModal();
            
        } catch (error) {
            console.log(error);
        }
    };

    const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    const navigate = useNavigate();

    const handleOrderClick = (id) => {
        navigate(`/order?workbenchID=${id}`);
    }    
    
    const [categories, setCategories] = useState([]);
    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const [isGridView, setIsGridView] = useState(true);

    const toggleListView = () => {
        setIsGridView(false);
    };

    const toggleGridView = () => {
        setIsGridView(true);
    };

    const handleMenuItemClick = (index) => {
        setActiveMenuItem(index); // Set active menu item index
    };

    const handleToggleSidebar = () => {
        // Toggle sidebar
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('hide');
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getAllWorkbench();
        getAllCategory();
    }, [])

    const getAllWorkbench = async () => {
        try {
            const response = await axios.get('http://localhost:5000/workbench');
            setWorkbench(response.data);
        } catch (error) {
            console.error("Error fetching the workbenchs", error);
        }
    };

    const getAllCategory = async() => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching the categories", error);
        }
    }
    
    return(
        <>
            {/* SIDEBAR */}
            <section id="sidebar">
                <Link to="/">
                    <a href="#" className="brand">
                        <i className='bx bxl-venmo'></i>
                        <span className="text">Versatily</span>
                    </a>
                </Link>
                <ul className="side-menu top">
                <span className='side-text-category'>Main</span>
                <Link to="/workbench">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                    <a href="#" onClick={() => handleMenuItemClick(0)}>
                        <i className='bx bx-grid-alt'></i>
                        <span className="text">Workbench</span>
                    </a>
                    </li>
                </Link>
                <Link to="/order">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-cart'></i>
                            <span className="text">Order</span>
                        </a>
                    </li>
                </Link>
                <Link to="/dashboard">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-signal-4'></i>
                            <span className="text">Dashboard</span>
                        </a>
                    </li>
                </Link>
                <Link to="/overview">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-search'></i>
                            <span className="text">Overview</span>
                        </a>
                    </li>
                </Link>
                <Link to="/products">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-package'></i>
                            <span className="text">Product</span>
                        </a>
                    </li>
                </Link>
                <Link to="/categories">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-category'></i>
                            <span className="text">Category</span>
                        </a>
                    </li>
                </Link>
                
                <span className='side-text-category'>Transaction</span>
                <Link to="/void-transaction">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-notepad'></i>
                            <span className="text">Void Tranasaction</span>
                        </a>
                    </li>
                </Link>

                <Link to="/history-transaction">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-history'></i>
                            <span className="text">History</span>
                        </a>
                    </li>
                </Link>

                <Link to="/invoice-transaction">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-receipt'></i>
                            <span className="text">Invoice</span>
                        </a>
                    </li>
                </Link>
                </ul>
            </section>
            {/* SIDEBAR */}




            <section id="content">
                {/* NAVBAR */}
                <nav>
                <i className='bx bx-menu' onClick={handleToggleSidebar}></i>
                <form action="#">
                    <div className="form-input">
                        <input type="search" placeholder="Search..."/>
                        <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                    </div>
                </form>
                <input type="checkbox" id="switch-mode" hidden/>
                <label htmlFor="switch-mode" className="switch-mode"></label>
                <a href="#" className="notification">
                    <i className='bx bxs-bell' ></i>
                    <span className="num">8</span>
                </a>
                <a href="#" className="profile">
                    <img src={profileImage}/>
                </a>
                </nav>
                {/* NAVBAR */}

                {/* MAIN */}
                <main>
                    <div className="workbench-container">
                        <div className="add-table-container">
                            <button className='add-table' onClick={openModal}>Add Table</button> 
                        </div>

                        <div className="app-content-actions-wrapper">
                            <button className={`action-button list ${!isGridView ? 'active' : ''}`} onClick={toggleListView} title="List View">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            </button>
                            <button className={`action-button grid ${isGridView ? 'active' : ''}`} onClick={toggleGridView} title="Grid View">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            </button>
                        </div>
                        <div className={`workbench-container ${isGridView ? 'grid-view' : ''}`}>
                            {isGridView ? (
                                <div className="workbench-table grid-view">
                                    {workbench.length > 0 ? (
                                        workbench.map((workbenchItem, index) => (
                                            <div key={index} className="workbench-card" onClick={() => handleOrderClick(workbenchItem.id)}>
                                                <h1 className='table-number'>Table {workbenchItem.id}</h1>
                                                <p className='table-status'>{workbenchItem.status ? 'Occupied' : 'Vacant'}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="workbench-card">
                                            <span className='text-no-workbench' >No workbench found.</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="workbench-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {workbench.length > 0 ? (
                                                workbench.map((workbenchItem, index) => (
                                                    <tr key={index}>
                                                        <td className="td-id">{workbenchItem.workbenchID}</td>
                                                        <td>{workbenchItem.status ? "Occupied" : "Vacant"}</td>
                                                        <td className='action-icons'>
                                                            <i id="bx-edit" className='bx bx-edit'></i> 
                                                            <i id="bx-trash" className='bx bx-trash' ></i>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3">No workbench found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>


                    </div>
                </main>
                {/* MAIN */}
            </section>

            
            {/* CONTENT */}
            {isModalOpen && (
                <div className="modal">
                <div className="workbench-overlay"></div>
                    <div className="modal-workbench">
                        <h2 className="add-table-t">Add Table</h2>
                        <hr></hr>
                        <form className='workbench-form' onSubmit={saveWorkbench}>
                            <label htmlFor="workbench-unique">Workbench Unique ID</label>
                            <input type='text' id='unique-workbench-id' name='unique-workbench-id' value={workbenchID} disabled />
                            <button id="btn-guw" type='button' onClick={generateWorkbenchID}>Generate Unique Workbench ID</button>
                            <div className='status_txt'>
                                <span>Status: </span>
                                <label>{status === 0 ? "Vacant" : "Occupied"}</label>
                            </div>
                                                
                            <div className='workbench-btn-container'>
                                <button type='button' className='workbench-btn-cancel' onClick={closeModal}>Cancel</button>
                                <button type='submit' className='workbench-btn-submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Table