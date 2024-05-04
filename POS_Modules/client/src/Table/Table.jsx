import './Table.css';
import { useState } from 'react';
import profileImage from '../assets/img/profile.jpg';
import {Link} from 'react-router-dom';
import '../assets/css/modal.css';
const Table = () => {
    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const handleMenuItemClick = (index) => {
        setActiveMenuItem(index); // Set active menu item index
    };

    const handleToggleSidebar = () => {
        // Toggle sidebar
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('hide');
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
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
                        
                        <div className="workbench-table">
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                <tr>
                                    <td className="td-id">148352</td>
                                    <td>khylemyrvin@gmail.com</td>
                                    <td>Vacant</td>
                                    <td className='action-icons'>
                                        <i id="bx-edit" className='bx bx-edit' ></i> 
                                        <i id="bx-trash" className='bx bx-trash' ></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-id">181645</td>
                                    <td>user@gmail.com</td>
                                    <td>Vacant</td>
                                    <td className='action-icons'>
                                        <i id="bx-edit" className='bx bx-edit' ></i> 
                                        <i id="bx-trash" className='bx bx-trash' ></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-id">817466</td>
                                    <td>user@gmail.com</td>
                                    <td>Vacant</td>
                                    <td className='action-icons'>
                                        <i id="bx-edit" className='bx bx-edit' ></i> 
                                        <i id="bx-trash" className='bx bx-trash' ></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-id">817656</td>
                                    <td>user@gmail.com</td>
                                    <td>Vacant</td>
                                    <td className='action-icons'>
                                        <i id="bx-edit" className='bx bx-edit' ></i> 
                                        <i id="bx-trash" className='bx bx-trash' ></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-id">179165</td>
                                    <td>user@gmail.com</td>
                                    <td>Vacant</td>
                                    <td className='action-icons'>
                                        <i id="bx-edit" className='bx bx-edit' ></i> 
                                        <i id="bx-trash" className='bx bx-trash' ></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-id">287253</td>
                                    <td>user@gmail.com</td>
                                    <td>Vacant</td>
                                    <td className='action-icons'>
                                        <i id="bx-edit" className='bx bx-edit' ></i> 
                                        <i id="bx-trash" className='bx bx-trash' ></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-id">724655</td>
                                    <td>user@gmail.com</td>
                                    <td>Vacant</td>
                                    <td className='action-icons'>
                                        <i id="bx-edit" className='bx bx-edit' ></i> 
                                        <i id="bx-trash" className='bx bx-trash' ></i>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </main>
                {/* MAIN */}
            </section>

            
            {/* CONTENT */}
            {isModalOpen && (
                <div className="modal">
                    <div className="overlay"></div>
                        <div className="modal-content">
                            <h2 className="add-table-t">Add Table</h2>
                            <hr></hr>
                            <form className='form'>
                                <label htmlFor="email">Email: </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div>
                                    <span>Status: </span>
                                    <label>Vacant</label>
                                </div>
                                
                                <div className='btn-container'>
                                    <button type='button' className='btn-cancel' onClick={closeModal}>Cancel</button>
                                    <button type='submit' className='btn-submit'>Submit</button>
                                </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Table