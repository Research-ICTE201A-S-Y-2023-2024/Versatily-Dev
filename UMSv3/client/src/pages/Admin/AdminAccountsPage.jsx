import AdminSidebarComponent from "./components/AdminSidebarComponent"
import AdminNavBarComponent from "./components/AdminNavBarComponent"
import AdminAccountsComponent from "./components/AdminAccountsComponent"

const AdminAccountsPage = () => {

    const pageTitle = 'Accounts'

    return (

        <>
            <div className="ums-main">
                <AdminSidebarComponent></AdminSidebarComponent>
                <div className="ums-content-section">
                    <AdminNavBarComponent pageTitle={pageTitle} userProfile=''></AdminNavBarComponent>
                    <AdminAccountsComponent></AdminAccountsComponent>
                </div>
            </div>
        </>

    )
}

export default AdminAccountsPage