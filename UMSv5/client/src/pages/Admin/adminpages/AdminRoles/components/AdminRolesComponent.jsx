import './AdminRolesComponentStyle.css'

const AdminRolesComponent = () => {

    return (
        <>
                <div className="ums-arc-main">

                    <div className="ums-arc-roles-container">
                        <div className="ums-arc-roles-container-header-section">
                            <span>System Roles</span>
                            <button>+</button>
                        </div>

                        <div className="ums-arc-roles-container-lower-section">
                            <table className="ums-arc-roles-container-table-header-section">
                                <tr>
                                    <td>Role</td>
                                    <td>Users</td>
                                    <td>Action</td>
                                </tr>
                                <tr>
                                    <td>OOS</td>
                                    <td>9</td>
                                    <td><button><i className="fi fi-rr-edit"></i></button><button><i className="fi fi-rs-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>OOA</td>
                                    <td>1</td>
                                    <td><button><i className="fi fi-rr-edit"></i></button><button><i className="fi fi-rs-trash"></i></button></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="ums-arc-roles-container">
                        <div className="ums-arc-roles-container-header-section">
                            <span>User Roles</span>
                            <button>+</button>
                        </div>

                        <div className="ums-arc-roles-container-lower-section">
                            <table className="ums-arc-roles-container-table-header-section">
                                <tr>
                                    <td>Role</td>
                                    <td>Users</td>
                                    <td>Action</td>
                                </tr>
                                <tr>
                                    <td>Student</td>
                                    <td>108</td>
                                    <td><button><i className="fi fi-rr-edit"></i></button><button><i className="fi fi-rs-trash"></i></button></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>

        </>
    )
}

export default AdminRolesComponent